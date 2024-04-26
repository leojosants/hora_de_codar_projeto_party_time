import partyFetch from '../../axios/config';

import {
    useState, useEffect
} from 'react';

import {
    Link
} from 'react-router-dom';

import './HomeRoute.css';

const HomeRoute = () => {
    const [
        parties, setParties
    ] = useState(null);

    useEffect(
        () => {
            const loadParties = async () => {
                const res = await partyFetch.get('/parties');
                setParties(res.data);
            };
            loadParties();
        },
        []
    );

    if (!parties) {
        return (
            <p>
                Carregando...
            </p>
        );
    }

    return (
        <div className='class-home'>
            <h1>
                Suas festas
            </h1>

            <div className='class-parties-container'>
                {
                    parties.length === 0 && (
                        <p>Não há festas cadastradas.</p>
                    )
                }

                {
                    parties.map(
                        (party) => (
                            <div
                                className='class-party'
                                key={party._id}
                            >
                                <img
                                    src={party.image}
                                    alt={party.title}
                                />

                                <h3>
                                    {party.title}
                                </h3>

                                <Link
                                    className='class-button-secondary'
                                    to={`/party/${party._id}`}
                                >
                                    Detalhes
                                </Link>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
};

export default HomeRoute;