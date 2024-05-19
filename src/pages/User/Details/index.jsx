import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById } from '../../../services/User';
import Cookies from 'universal-cookie';

const Details = () => {
    const [userDetails, setUserDetails] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    
    const cookies = new Cookies();
    const token = cookies.get('token');

    // useEffect(() => {
    //     if (!token) {
    //         navigate('/');
    //     } else {
    //         const fetchUserDetails = async () => {
    //             try {
    //                 const userData = await getUserById(id);
    //                 setUserDetails(userData);
    //             } catch (error) {
    //                 console.error('Error fetching user details:', error);
    //             }
    //         };

    //         fetchUserDetails();
    //     }
    // }, [id]);

    const handleEditClick = () => {
        navigate(`/user/edit/${id}`);
    };

    return (
        <div className="m-5">
            <h1>Detalhes</h1>
            <p>
                <a className="btn btn-secondary" href="/user/home">Voltar</a>
            </p>
            {userDetails ? (
                <div>
                    <h4>Vendedor</h4>
                    <hr />
                    <dl className="dl-horizontal">
                        <dt>Nome</dt>
                        <dd>{userDetails.firstName} {userDetails.lastName}</dd>
                        <dt>Email</dt>
                        <dd>{userDetails.email}</dd>
                        <dt>Status</dt>
                        <dd>{userDetails.status ? 'Ativo' : 'Inativo'}</dd>
                        <dt>Admin</dt>
                        <dd>{userDetails.isAdmin ? 'Sim' : 'Não'}</dd>
                        <dt>Criado em</dt>
                        <dd>{new Date(userDetails.createdAt).toLocaleDateString()}</dd>
                    </dl>
                    <form>
                        <button className="btn btn-dark" onClick={handleEditClick}>Editar registro</button>
                    </form>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
};

export default Details;
