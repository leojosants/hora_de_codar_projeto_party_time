import partyFetch from '../../axios/config.js'

import {
    useState, useEffect
} from 'react';

import {
    useNavigate
} from 'react-router-dom';

import UseToast from '../../customHooks/toastCustomHook.jsx';

import '../Form.css';

const CreatePartyRoute = () => {
    const [
        services, setServices
    ] = useState([]);

    const [
        title, setTitle
    ] = useState('');

    const [
        author, setAuthor
    ] = useState('');

    const [
        description, setDescription
    ] = useState('');

    const [
        budget, setBudget
    ] = useState(0);

    const [
        image, setImage
    ] = useState('');

    const [
        partyServices, setPartyServices
    ] = useState([]);

    const navigate = useNavigate();

    useEffect(
        () => {
            const loadServices = async () => {
                const res = await partyFetch('/services');
                const data = res.data;
                setServices(data);
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

        if (checked) {
            setPartyServices(
                (services) => [
                    ...services, filteredService[0]
                ]
            );
        }
        else {
            setPartyServices(
                (services) => services.filter(
                    (service) => service._id !== value
                )
            );
        }
    };

    const createParty = async (event) => {
        event.preventDefault();

        try {
            const party = {
                title, author, description, budget, image,
                services: partyServices
            };

            const res = await partyFetch.post(
                '/parties', party
            );

            if (res.status === 201) {
                navigate('/');
            }

            UseToast(res.data.msg);
        }
        catch (error) {
            UseToast(error.response.data.msg, 'error');
        }
    };

    return (
        <div className='class-form-page'>
            <h2>
                Crie sua própria festa.
            </h2>

            <p>
                Defina o seu orçamento e escolha os serviços
            </p>

            <form onSubmit={(event) => createParty(event)}>
                <label>
                    <span>
                        Nome da festa
                    </span>

                    <input
                        type='text'
                        placeholder='Seja criativo'
                        onChange={(event) => setTitle(event.target.value)}
                        value={title}
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
                        onChange={(event) => setAuthor(event.target.value)}
                        value={author}
                        required
                    />
                </label>

                <label>
                    <span>
                        Descrição
                    </span>

                    <textarea
                        placeholder='Conte mais sobre a festa...'
                        onChange={(event) => setDescription(event.target.value)}
                        value={description}
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
                        onChange={(event) => setBudget(event.target.value)}
                        value={budget}
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
                        onChange={(event) => setImage(event.target.value)}
                        value={image}
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
                                                    onChange={(event) => handleServices(event)}
                                                    value={service._id}
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
                    value='Criar Festa'
                />
            </form>
        </div>
    );
};

export default CreatePartyRoute;