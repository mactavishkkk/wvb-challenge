import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/User';
import * as d3 from 'd3';
import { getAllDevices } from '../../services/Device';

const DrawerDeviceCharts = () => {
    const [devices, setDevices] = useState([]);
    const [chartDrawn, setChartDrawn] = useState(false);

    useEffect(() => {
        getAllDevices()
            .then(data => {
                setDevices(data);
            })
            .catch(error => console.error('Erro ao obter dispositivos:', error));
    }, []);

    useEffect(() => {
        if (!chartDrawn && devices.length > 0) {
            drawChart(devices);
            setChartDrawn(true);
        }
    }, [devices, chartDrawn]);

    const countActiveDevices = (devices) => {
        return devices.filter(device => device.status).length;
    };

    const countInactiveDevices = (devices) => {
        return devices.filter(device => !device.status).length;
    };

    const drawChart = (data) => {
        const activeDevices = countActiveDevices(data);
        const inactiveDevices = countInactiveDevices(data);

        const svg = d3.select('#chart-container')
            .append('svg')
            .attr('width', 400)
            .attr('height', 200);

        const width = +svg.attr('width');
        const height = +svg.attr('height');
        const radius = Math.min(width, height) / 2;

        const color = d3.scaleOrdinal()
            .domain(['Ativos', 'Inativos'])
            .range(['#66c2a5', '#E14C2E']);

        const pie = d3.pie()
            .value(d => d.value);

        const dataPie = pie([
            { label: 'Ativos', value: activeDevices },
            { label: 'Inativos', value: inactiveDevices }
        ]);

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

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

export default DrawerDeviceCharts;
