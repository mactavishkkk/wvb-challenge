import React, { useState, useEffect } from 'react';
import BooleanInput from '../../../components/BooleanInput';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUser } from '../../../services/User';
import Cookies from 'universal-cookie';

const Edit = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        status: false,
        isAdmin: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    });
    const { id } = useParams();
    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('token');

    const fetchUserById = async (id) => {
        try {
            const userData = await getUserById(id);
            setUser(userData);
        } catch (error) {
            console.error('Failed to fetch user details:', error);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/');
        } else {
            fetchUserById(id);
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateUser(id, user);
            alert('Usuário atualizado com sucesso!');
            navigate('/user/home');
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    return (
        <div className="m-5">
            <h1>Editar</h1>
            <p>
                <a className="btn btn-secondary" href="/user/home">Voltar</a>
            </p>

            <h4>Usuário</h4>
            <hr />

            <div className="col-8">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName" className="control-label">Nome</label>
                        <input type="text"
                            id="firstName"
                            name="firstName"
                            className="form-control mb-3"
                            value={user.firstName}
                            onChange={handleChange}
                            placeholder='Nome' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName" className="control-label">Sobrenome</label>
                        <input type="text"
                            id="lastName"
                            name="lastName"
                            className="form-control mb-3"
                            value={user.lastName}
                            onChange={handleChange}
                            placeholder='Sobrenome' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="control-label">Email</label>
                        <input type="email"
                            id="email" name="email"
                            className="form-control mb-3"
                            value={user.email}
                            onChange={handleChange}
                            placeholder='exemplo@gmail.com' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="control-label">Senha</label>
                        <input type="password"
                            id="password" name="password"
                            className="form-control mb-3"
                            value={user.password}
                            onChange={handleChange}
                            placeholder='******' />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Salvar" className="btn btn-dark" style={{ marginTop: '10px' }} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;
