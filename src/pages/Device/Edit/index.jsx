import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { getDeviceById, updateDevice } from '../../../services/Device';

const Edit = () => {
    const [device, setDevice] = useState({
        identifier: '',
        description: '',
        manufacturer: '',
        url: '',
        status: false,
        commands: [{ name: '', description: '', parameters: '', returnType: '' }],
        createdAt: Date.now(),
        updatedAt: Date.now(),
    });

    const { id } = useParams();
    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('token');

    const fetchDeviceById = async (id) => {
        try {
            const deviceData = await getDeviceById(id);
            setDevice(deviceData);
        } catch (error) {
            console.error('Failed to fetch device details:', error);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/');
        } else {
            fetchDeviceById(id);
        }
    }, [id]);

    const handleCommandChange = (index, field, value) => {
        const newCommands = [...device.commands];
        newCommands[index][field] = value;
        setDevice(prevDevice => ({
            ...prevDevice,
            commands: newCommands
        }));
    };

    const addCommand = () => {
        setDevice(prevDevice => ({
            ...prevDevice,
            commands: [...prevDevice.commands, { name: '', description: '', parameters: '', returnType: '' }]
        }));
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setDevice(prevDevice => ({
            ...prevDevice,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateDevice(id, device);
            alert('Dispositivo atualizado com sucesso!');
            navigate('/device/home');
        } catch (error) {
            console.error('Failed to update device:', error);
        }
    };

    return (
        <div className="m-5">
            <h1>Editar</h1>
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
                            value={device.identifier}
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="control-label">Descrição</label>
                        <textarea id="description"
                            name="description"
                            className="form-control mb-3"
                            placeholder="Lorem ipsum device statement"
                            value={device.description}
                            onChange={handleChange}
                            required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="manufacturer" className="control-label">Fabricante</label>
                        <input type="text"
                            id="manufacturer"
                            name="manufacturer"
                            className="form-control mb-3"
                            placeholder='ABC Technologies'
                            value={device.manufacturer}
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="url" className="control-label">Url</label>
                        <input type="text"
                            id="url"
                            name="url"
                            className="form-control mb-3"
                            placeholder='/v1/api/exemplo'
                            value={device.url}
                            onChange={handleChange}
                            required />
                    </div>

                    <h4 className='mt-3'>Adicionar Comandos</h4>
                    <div id="commands-container">
                        {device.commands.map((command, index) => (
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
                        <input type="submit" value="Salvar" className="btn btn-dark" style={{ marginTop: '10px' }} />
                    </div>
                </form>
            </div >
        </div>
    );
};

export default Edit;
