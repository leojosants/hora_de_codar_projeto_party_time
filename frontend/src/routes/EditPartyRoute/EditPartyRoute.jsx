import partyFetch from '../../axios/config.js'

import {
    useState, useEffect
} from 'react';

import {
    useNavigate, useParams
} from 'react-router-dom';

import UseToast from '../../customHooks/toastCustomHook.jsx';

import '../Form.css';

const EditPartyRoute = () => {
    const {
        id
    } = useParams();

    const [
        party, setParty
    ] = useState(null);

    const [
        services, setServices
    ] = useState([]);

    const navigate = useNavigate();

    useEffect(
        () => {
            const loadServices = async () => {
                const res = await partyFetch('/services');
                const data = res.data;
                setServices(data);
                loadParty();
            };

            const loadParty = async () => {
                const res = await partyFetch.get(`/parties/${id}`);
                const data = res.data;
                setParty(data);
            };

            loadServices();
        }, []
    );

    const handleServices = (event) => {
        const eventTarget = event.target;
        const checked = eventTarget.checked;
        const value = eventTarget.value;

        const filteredService = services.filter(
            (service) => {
                return service._id === value;
            }
        );

        let partyServices = party.services;

        if (checked) {
            partyServices = [
                ...partyServices, filteredService[0]
            ];
        }
        else {
            partyServices = partyServices.filter(
                (service) => service._id !== value
            );
        }

        setParty(
            {
                ...party,
                services: partyServices
            }
        );
    };

    const updateParty = async (event) => {
        event.preventDefault();

        try {
            const res = await partyFetch.put(
                `/parties/${party._id}`, party
            );

            if (res.status === 200) {
                navigate(`/party/${party._id}`);
            }
        }
        catch (error) {
            UseToast(error.response.data.msg, 'error');
        }
    };

    if (!party) {
        return (
            <p>Carregando...</p>
        );
    }

    return (
        <div className='class-form-page'>
            <h2>
                Editando {partyFetch.title}
            </h2>

            <p>
                Ajuste as informações da sua festa.
            </p>

            <form onSubmit={(event) => updateParty(event)}>
                <label>
                    <span>
                        Nome da festa
                    </span>

                    <input
                        type='text'
                        placeholder='Seja criativo'
                        onChange={(event) => setParty({ ...party, title: event.target.value })}
                        value={party.title}
                        required
                    />
                </label>

                <label>
                    <span>
                        Anfitrião
                    </span>

                    <input
                        type='text'
                        placeholder='Quem está ofertando a festa?'
                        onChange={(event) => setParty({ ...party, authe: event.target.value })}
                        value={party.author}
                        required
                    />
                </label>

                <label>
                    <span>
                        Descrição
                    </span>

                    <textarea
                        placeholder='Conte mais sobre a festa...'
                        onChange={(event) => setParty({ ...party, description: event.target.value })}
                        value={party.description}
                        required
                    ></textarea>
                </label>

                <label>
                    <span>
                        Orçamento
                    </span>

                    <input
                        type='number'
                        placeholder='Quanto você pretende investir?'
                        onChange={(event) => setParty({ ...party, budget: event.target.value })}
                        value={party.budget}
                        required
                    />
                </label>

                <label>
                    <span>
                        Imagem
                    </span>

                    <input
                        type='text'
                        placeholder='Insira a URL d uma imagem'
                        onChange={(event) => setParty({ ...party, image: event.target.value })}
                        value={party.image}
                        required
                    />
                </label>

                <div>
                    <h2>
                        Escolha os serviços
                    </h2>

                    <div className='class-services-container'>
                        {
                            services.length === 0 && (
                                <p>
                                    Caregando...
                                </p>
                            )
                        }

                        {
                            services.length > 0 && (
                                services.map(
                                    (service) => (
                                        <div
                                            className='class-service'
                                            key={service._id}
                                        >
                                            <img
                                                src={service.image}
                                                alt={service.name}
                                            />

                                            <p className='class-service-name'>
                                                {service.name}
                                            </p>

                                            <p className='class-service-price'>
                                                R${service.price}
                                            </p>

                                            <div className='checkbox-container'>
                                                <input
                                                    type='checkbox'
                                                    value={service._id}
                                                    onChange={(event) => handleServices(event)}
                                                    checked={
                                                        party.services.find(
                                                            (partyService) => partyService._id === service._id) || ''
                                                    }
                                                />

                                                <p>
                                                    Marque para solicitar
                                                </p>
                                            </div>
                                        </div>
                                    )
                                )
                            )
                        }
                    </div>
                </div>

                <input
                    className='class-button'
                    type='submit'
                    value='Atualizar Festa'
                />
            </form>
        </div>
    );
};

export default EditPartyRoute;