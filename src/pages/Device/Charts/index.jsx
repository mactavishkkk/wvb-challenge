import React, { useEffect } from 'react';
import DrawerChart from '../../../components/DrawerChart/DrawerDeviceCharts';

const Charts = () => {
    return (
        <div className="m-5">
            <h1>Gráficos - Dispositivos</h1>
            <p>
                <a className="btn btn-secondary" href={`/user/home`}>Usuários</a>
                <a className="btn btn-primary m-2" href={`/device/home`}>Dispositivos</a>
            </p>
            <div>
                <h2>Relação de Dispositivos Ativos</h2>
                <DrawerChart />
            </div>
        </div>
    );
};

export default Charts;
