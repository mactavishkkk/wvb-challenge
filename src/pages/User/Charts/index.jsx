import React, { useEffect } from 'react';
import DrawerChart from '../../../components/DrawerChart/DrawerUserCharts';

const Charts = () => {
    return (
        <div className="m-5">
            <h1>Gráficos - Usuários</h1>
            <p>
                <a className="btn btn-secondary" href={`/user/home`}>Usuários</a>
                <a className="btn btn-primary m-2" href={`/device/home`}>Dispositivos</a>
            </p>
            <div>
                <h2>Relação de status de usuários</h2>
                <DrawerChart />
            </div>
        </div>
    );
};

export default Charts;
