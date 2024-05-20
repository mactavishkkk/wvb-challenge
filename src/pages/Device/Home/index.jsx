import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { logout } from '../../../services/User';
import { useNavigate } from 'react-router-dom';
import { changeStatusDevice, deleteDevice, getAllDevices } from '../../../services/Device';

const Home = () => {
    const [devices, setDevices] = useState([]);

    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('token');

    const handleLogout = () => {
        logout();
        alert('Até mais!');
        navigate('/');
    };

    const handleDelete = (deviceId) => {
        if (window.confirm('Tem certeza que deseja excluir este dispositivo?')) {
            deleteDevice(deviceId)
                .then(() => {
                    window.location.reload();
                })
                .catch(error => console.error('Erro ao excluir dispositivo:', error));
        }
    };

    const handleChangeStatus = (deviceId) => {
        if (window.confirm('Tem certeza que deseja mudar o status este dispositivo?')) {
            changeStatusDevice(deviceId)
                .then(() => {
                    window.location.reload();
                })
                .catch(error => console.error('Erro ao mudar o status do dispositivo:', error));
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        if (!token) {
            navigate('/');
        } else {
            getAllDevices().then(response => response)
                .then(data => setDevices(data))
                .catch(error => console.error('Erro ao obter dispositivos:', error));
        }
    }, [token]);

    return (
        <div className="m-5">
            <h1>Home - Dispositivos</h1>
            <p>
                <a className="btn btn-secondary m-2" href={`/user/home`}>Usuários</a>
                <a className="btn btn-primary" href={`/device/create`}>Criar novo dispositivo</a>
                <a className="btn btn-warning m-2" href={`/device/charts`}>Painel</a>
            </p>
            <table className="table table-striped table-hover">
                <thead>
                    <tr className="bg-gradient">
                        <th>
                            Código
                        </th>
                        <th>
                            Identificador
                        </th>
                        <th>
                            Descrição
                        </th>
                        <th>
                            Status
                        </th>
                        <th>
                            Fabricante
                        </th>
                        <th>
                            Última atualização
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {devices.sort((a, b) => a.id - b.id).map((device) => (
                        <tr key={device.id}>
                            <td>{device.id}</td>
                            <td>{device.identifier}</td>
                            <td>{device.description}</td>
                            <td>{device.status ? 'Ativo' : 'Desativo'}</td>
                            <td>{device.manufacturer}</td>
                            <td>{formatDate(device.createdAt)}</td>
                            <td>
                                <a href={`/device/edit/${device.id}`} className="btn btn-primary me-1">Editar</a>
                                <a href={`/device/details/${device.id}`} className="btn btn-info me-1">Sobre</a>
                                <button onClick={() => handleDelete(device.id)} className="btn btn-danger me-1">Deletar</button>
                                {device.status ? (
                                    <button onClick={() => handleChangeStatus(device.id)} className="btn btn-danger me-1">Desativar</button>
                                ) : (
                                    <button onClick={() => handleChangeStatus(device.id)} className="btn btn-success me-1">Ativar</button>
                                )}
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </div>
    );
};

export default Home;