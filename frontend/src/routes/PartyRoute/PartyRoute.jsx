import partyFetch from '../../axios/config';

import {
    useEffect, useState
} from 'react';

import {
    useParams, Link, useNavigate
} from 'react-router-dom';

import UseToast from '../../customHooks/toastCustomHook';

import './PartyRoute.css';

const PartyRoute = () => {
    const {
        id
    } = useParams();

    const [
        party, setParty
    ] = useState(null);

    const navigate = useNavigate();

    useEffect(
        () => {
            const loadParty = async () => {
                const res = await partyFetch.get(`/parties/${id}`);
                const data = res.data;
                setParty(data);
            };
            loadParty();
        }
    );

    const handleDelete = async () => {
        const res = await partyFetch.delete(`/parties/${id}`);

        if (res.status === 200) {
            navigate('/');
            UseToast(res.data.msg);
        }
    };

    if (!party) {
        return (
            <p>Carregando...</p>
        );
    }

    return (
        <div className='class-party'>
            <h1>
                {party.title}
            </h1>

            <div className='class-actions-container'>
                <Link
                    className='class-button'
                    to={`/party/edit/${party._id}`}
                >
                    Editar
                </Link>

                <button
                    className='class-button-secondary'
                    onClick={handleDelete}
                >
                    Excluir
                </button>
            </div>

            <p>
                Orçamento: R${party.budget}
            </p>

            <h3>
                Serviços contratados
            </h3>

            <div className='class-services-container'>
                {
                    party.services.map(
                        (service) => (
                            <div
                                className='class-service'
                                key={service._id}
                            >
                                <img
                                    src={service.image}
                                    alt={service.name}
                                />

                                <p>
                                    {service.name}
                                </p>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
};

export default PartyRoute;