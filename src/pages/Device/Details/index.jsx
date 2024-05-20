import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { getDeviceById } from '../../../services/Device';

const Details = () => {
    const [deviceDetails, setDeviceDetails] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const cookies = new Cookies();
    const token = cookies.get('token');

    useEffect(() => {
        if (!token) {
            navigate('/');
        } else {
            const fetchDeviceDetails = async () => {
                try {
                    const deviceData = await getDeviceById(id);
                    setDeviceDetails(deviceData);
                } catch (error) {
                    console.error('Error fetching device details:', error);
                }
            };

            fetchDeviceDetails();
        }
    }, [id]);

    const handleEditClick = () => {
        navigate(`/device/edit/${id}`);
    };

    return (
        <div className="m-5">
            <h1>Detalhes</h1>
            <p>
                <a className="btn btn-secondary mx-1" href="/device/home">Voltar</a>
                <button className="btn btn-dark" onClick={handleEditClick}>Editar registro</button>
            </p>
            {deviceDetails ? (
                <div className="row">
                    <div className="col-md-6">
                        <h4>Dispositivo</h4>
                        <hr />
                        <dl className="dl-horizontal">
                            <dt>Identificador</dt>
                            <dd>{deviceDetails.identifier}</dd>
                            <dt>Descrição</dt>
                            <dd>{deviceDetails.description}</dd>
                            <dt>Fabricante</dt>
                            <dd>{deviceDetails.manufacturer}</dd>
                            <dt>Url</dt>
                            <dd>{deviceDetails.url}</dd>
                            <dt>Status</dt>
                            <dd>{deviceDetails.status ? 'Ativo' : 'Inativo'}</dd>
                            <dt>Criado em</dt>
                            <dd>{new Date(deviceDetails.createdAt).toLocaleDateString()}</dd>
                        </dl>
                    </div>

                    <div className="col-md-6">
                        <h4>Comandos</h4>
                        <hr />
                        {deviceDetails.commands && deviceDetails.commands.length > 0 ? (
                            <div>
                                {deviceDetails.commands.map((command, index) => (
                                    <div key={index} className="command-details mb-3">
                                        <h5>Comando {command.name}</h5>
                                        <dl className="dl-horizontal">
                                            <dt>Descrição</dt>
                                            <dd>{command.description}</dd>
                                            <dt>Parâmetros</dt>
                                            <dd>{command.parameters ?? 'nenhum'}</dd>
                                            <dt>Tipo de Retorno</dt>
                                            <dd>{command.returnType}</dd>
                                        </dl>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Nenhum comando disponível.</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
};

export default Details;
