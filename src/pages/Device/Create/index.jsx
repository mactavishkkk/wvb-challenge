import React, { useEffect, useState } from 'react';
import BooleanInput from '../../../components/BooleanInput';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { createDevice } from '../../../services/Device';

const Create = () => {
    const [status, setStatus] = useState(false);
    const [commands, setCommands] = useState([{ name: '', description: '', parameters: '', returnType: '' }]);

    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('token');

    const handleStatusChange = (newValue) => {
        setStatus(newValue);
    };

    const handleCommandChange = (index, field, value) => {
        const newCommands = [...commands];
        newCommands[index][field] = value;
        setCommands(newCommands);
    };

    const addCommand = () => {
        setCommands([...commands, { name: '', description: '', parameters: '', returnType: '' }]);
    };

    const handleSubmit = async (event) => {
        const createdAt = new Date().toISOString();
        event.preventDefault();

        const formData = new FormData(event.target);
        const deviceData = {
            identifier: formData.get('identifier'),
            description: formData.get('description'),
            manufacturer: formData.get('manufacturer'),
            url: formData.get('url'),
            status: status,
            commands: commands,
            createdAt: createdAt,
            updatedAt: createdAt,
        };

        try {
            await createDevice(deviceData);
            alert('Dispositivo criado com sucesso!');
            navigate('/device/home');
        } catch (error) {
            console.error('Failed to create device:', error);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, []);

    return (
        <div className="m-5">
            <h1>Criar</h1>
            <p>
                <a className="btn btn-secondary" href="/device/home">Voltar</a>
            </p>

            <h4>Dispositivo</h4>
            <hr />

            <div className="col-8">
                <form onSubmit={handleSubmit}>
                    <div className="text-danger"></div>
                    <div className="form-group">
                        <label htmlFor="identifier" className="control-label">Identificador</label>
                        <input type="text"
                            id="identifier"
                            name="identifier"
                            className="form-control mb-3"
                            placeholder='LO8D7A'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="control-label">Descrição</label>
                        <textarea id="description"
                            name="description"
                            className="form-control mb-3"
                            placeholder="Lorem ipsum device statement"
                            required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="manufacturer" className="control-label">Fabricante</label>
                        <input type="text"
                            id="manufacturer"
                            name="manufacturer"
                            className="form-control mb-3"
                            placeholder='ABC Technologies'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="url" className="control-label">Url</label>
                        <input type="text"
                            id="url"
                            name="url"
                            className="form-control mb-3"
                            placeholder='/v1/api/exemplo'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <BooleanInput
                            label="Desativado"
                            value={status}
                            onChange={handleStatusChange}
                        />
                    </div>

                    <h4 className='mt-3'>Adicionar Comandos</h4>
                    <div id="commands-container">
                        {commands.map((command, index) => (
                            <div key={index} className="row">
                                <div className="col-md-6 form-group">
                                    <label htmlFor={`commands[${index}][name]`}>Nome</label>
                                    <input
                                        type="text"
                                        id={`commands[${index}][name]`}
                                        name={`commands[${index}][name]`}
                                        className="form-control"
                                        placeholder="Sensor, monitor, controlador"
                                        value={command.name}
                                        onChange={(e) => handleCommandChange(index, 'name', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="col-md-6 form-group">
                                    <label htmlFor={`commands[${index}][description]`}>Descrição</label>
                                    <textarea
                                        id={`commands[${index}][description]`}
                                        name={`commands[${index}][description]`}
                                        className="form-control mb-3"
                                        placeholder="Sensor de x para fazer b"
                                        value={command.description}
                                        onChange={(e) => handleCommandChange(index, 'description', e.target.value)}
                                        required
                                    ></textarea>
                                </div>

                                <div className="col-md-6 form-group">
                                    <label htmlFor={`commands[${index}][parameters]`}>Parâmetros</label>
                                    <input
                                        type="text"
                                        id={`commands[${index}][parameters]`}
                                        name={`commands[${index}][parameters]`}
                                        className="form-control"
                                        placeholder="limiteAtual,limiteAnterior"
                                        value={command.parameters}
                                        onChange={(e) => handleCommandChange(index, 'parameters', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="col-md-6 form-group">
                                    <label htmlFor={`commands[${index}][returnType]`}>Tipo de Retorno</label>
                                    <input
                                        type="text"
                                        id={`commands[${index}][returnType]`}
                                        name={`commands[${index}][returnType]`}
                                        className="form-control mb-3"
                                        placeholder="String, Int, Boolean"
                                        value={command.returnType}
                                        onChange={(e) => handleCommandChange(index, 'returnType', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="button" className="btn btn-secondary" onClick={addCommand}>Adicionar Comando</button>


                    <div className="form-group">
                        <input type="submit" value="Criar" className="btn btn-dark" style={{ marginTop: '10px' }} />
                    </div>
                </form>
            </div >
        </div>
    );
};

export default Create;