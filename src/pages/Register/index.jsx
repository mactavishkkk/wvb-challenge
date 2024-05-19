import React, { useState } from 'react';
import BooleanInput from '../../components/BooleanInput';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/User';

const Register = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [status, setStatus] = useState(false);

    const navigate = useNavigate();

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
            await register(userData);
            alert('Usuário criado com sucesso!');
            navigate('/');
        } catch (error) {
            console.error('Failed to create user:', error);
        }
    };

    return (
        <div className="m-5">
            <h1>Criar</h1>
            <p>
                <a className="btn btn-secondary" href="/">Voltar</a>
            </p>

            <h4>Usuário</h4>
            <hr />

            <div className="col-8">
                <form onSubmit={handleSubmit}>
                    <div className="text-danger"></div>
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

export default Register;