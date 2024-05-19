import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/User';
import * as d3 from 'd3';

const DrawerCharts = () => {
    const [users, setUsers] = useState([]);
    const [chartDrawn, setChartDrawn] = useState(false);

    useEffect(() => {
        getAllUsers()
            .then(data => {
                setUsers(data);
            })
            .catch(error => console.error('Erro ao obter usuários:', error));
    }, []);

    useEffect(() => {
        if (!chartDrawn && users.length > 0) {
            drawChart(users);
            setChartDrawn(true);
        }
    }, [users, chartDrawn]);

    const countActiveUsers = (users) => {
        return users.filter(user => user.status).length;
    };

    const countInactiveUsers = (users) => {
        return users.filter(user => !user.status).length;
    };

    const drawChart = (data) => {
        const activeUsers = countActiveUsers(data);
        const inactiveUsers = countInactiveUsers(data);

        const svg = d3.select('#chart-container')
            .append('svg')
            .attr('width', 400)
            .attr('height', 200);

        const width = +svg.attr('width');
        const height = +svg.attr('height');
        const radius = Math.min(width, height) / 2;

        const color = d3.scaleOrdinal()
            .domain(['Ativos', 'Inativos'])
            .range(['#66c2a5', '#fc8d62']);

        const pie = d3.pie()
            .value(d => d.value);

        const dataPie = pie([
            { label: 'Ativos', value: activeUsers },
            { label: 'Inativos', value: inactiveUsers }
        ]);

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius - 10);

        const arcLabel = d3.arc()
            .innerRadius(radius - 40)
            .outerRadius(radius - 40);

        const g = svg.append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        g.selectAll('path')
            .data(dataPie)
            .enter().append('path')
            .attr('fill', d => color(d.data.label))
            .attr('d', arc)
            .append('title')
            .text(d => `${d.data.label}: ${d.data.value}`);

        g.selectAll('text')
            .data(dataPie)
            .enter().append('text')
            .attr('transform', d => `translate(${arcLabel.centroid(d)})`)
            .attr('dy', '0.35em')
            .text(d => `${d.data.label}: ${d.data.value}`)
            .attr('fill', 'white')
            .attr('text-anchor', 'middle');
    };

    return (
        <div id="chart-container"></div>
    );
};

export default DrawerCharts;
