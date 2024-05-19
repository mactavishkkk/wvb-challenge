import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { logout, getAllUsers, deleteUser, changeStatusUser } from '../../../services/User';
import { useNavigate } from 'react-router-dom';
import { users } from './data';

const Home = () => {
    // const [users, setUsers] = useState([]);

    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('token');

    const handleLogout = () => {
        logout();
        alert('Até mais!');
        navigate('/');
    };

    const handleDelete = (userId) => {
        if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
            deleteUser(userId)
                .then(() => {
                    window.location.reload();
                })
                .catch(error => console.error('Erro ao excluir usuário:', error));
        }
    };

    const handleChangeStatus = (userId) => {
        if (window.confirm('Tem certeza que deseja mudar o status este usuário?')) {
            changeStatusUser(userId)
                .then(() => {
                    window.location.reload();
                })
                .catch(error => console.error('Erro ao mudar o status do usuário:', error));
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // useEffect(() => {
    //     if (!token) {
    //         navigate('/');
    //     } else {
    //         getAllUsers().then(response => response)
    //             .then(data => setUsers(data))
    //             .catch(error => console.error('Erro ao obter usuários:', error));
    //     }
    // }, [token]);

    return (
        <div className="m-5">
            <h1>Home - Usuários</h1>
            <p>
                <a className="btn btn-secondary" href={`/user/create`}>Criar novo usuário</a>
                <a className="btn btn-primary m-2" href={`/device/home`}>Dispositivos</a>
                <a className="btn btn-warning m-2" href={`/user/charts`}>Gráficos</a>
            </p>
            <table className="table table-striped table-hover">
                <thead>
                    <tr className="bg-gradient">
                        <th>
                            Código
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Status
                        </th>
                        <th>
                            Admin
                        </th>
                        <th>
                            Criado em
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.sort((a, b) => a.id - b.id).map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.status ? 'Ativo' : 'Desativo'}</td>
                            <td>{user.isAdmin ? 'Administrador' : 'Comum'}</td>
                            <td>{formatDate(user.createdAt)}</td>
                            <td>
                                <a href={`/user/edit/${user.id}`} className="btn btn-primary me-1">Editar</a>
                                <a href={`/user/details/${user.id}`} className="btn btn-info me-1">Sobre</a>
                                <button onClick={() => handleDelete(user.id)} className="btn btn-danger me-1">Deletar</button>
                                {user.status ? (
                                    <button onClick={() => handleChangeStatus(user.id)} className="btn btn-danger me-1">Desativar</button>
                                ) : (
                                    <button onClick={() => handleChangeStatus(user.id)} className="btn btn-success me-1">Ativar</button>
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