import React, { useEffect, useState } from 'react';
import BooleanInput from '../../../components/BooleanInput';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { createUser, registerUser } from '../../../services/User';

const Create = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [status, setStatus] = useState(false);

    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('token');

    const handleStatusChange = (newValue) => {
        setStatus(newValue);
    };

    const handleAdminChange = (newValue) => {
        setIsAdmin(newValue);
    };

    const handleSubmit = async (event) => {
        const createdAt = new Date().toISOString();
        event.preventDefault();

        const formData = new FormData(event.target);
        const userData = {
            firstName: formData.get('Name'),
            lastName: formData.get('lastName'),
            email: formData.get('Email'),
            password: formData.get('password'),
            status: status,
            isAdmin: isAdmin,
            createdAt: createdAt,
            updatedAt: createdAt,
        };

        try {
            await createUser(userData);
            alert('Usuário criado com sucesso!');
            navigate('/home');
        } catch (error) {
            console.error('Failed to create user:', error);
        }
    };

    // useEffect(() => {
    //     if (!token) {
    //         navigate('/');
    //     }
    // }, []);

    return (
        <div className="m-5">
            <h1>Criar</h1>
            <p>
                <a className="btn btn-secondary" href="/user/home">Voltar</a>
            </p>

            <h4>Usuário</h4>
            <hr />

            <div className="col-8">
                <form onSubmit={handleSubmit}>
                    <div className="text-danger"></div>
                    <div className="form-group">
                        <label htmlFor="Name" className="control-label">Nome</label>
                        <input type="text" id="Name" name="Name" className="form-control mb-3" placeholder='Nome' required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName" className="control-label">Sobrenome</label>
                        <input type="text" id="lastName" name="lastName" className="form-control mb-3" placeholder='Sobrenome' required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Email" className="control-label">Email</label>
                        <input type="email" id="Email" name="Email" className="form-control mb-3" placeholder='exemplo@gmail.com' required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="control-label">Senha</label>
                        <input type="password" id="password" name="password" className="form-control mb-3" placeholder='A senha deve possuir no mínimo 6 caracteres' required/>
                    </div>
                    <div className="form-group">
                        <BooleanInput
                            label="Desativado"
                            value={status}
                            onChange={handleStatusChange}
                        />
                    </div>
                    <div className="form-group">
                        <BooleanInput
                            label="Administrador"
                            value={isAdmin}
                            onChange={handleAdminChange}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Criar" className="btn btn-dark" style={{ marginTop: '10px' }} />
                    </div>
                </form>
            </div >
        </div>
    );
};

export default Create;