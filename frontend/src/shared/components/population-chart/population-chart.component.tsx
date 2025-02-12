import * as React from 'react';
import { Population } from '~shared/types/country.types';
import { box, text } from './population-chart.styles';
import { colors } from '~shared/styles';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type PopulationChartProps = {
    data: Population[];
};

const PopulationChart: React.FunctionComponent<PopulationChartProps> = ({
    data
}) => {
    const years = data.map((item) => item.year);
    const values = data.map((item) => item.value);

    const chartData = {
        labels: years,
        datasets: [
            {
                label: "Population Over Time",
                data: values,
                borderColor: colors.light_blue,
                backgroundColor: colors.white,
                pointRadius: 3,
                fill: true,
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top" as const,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Year",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Population",
                },
            },
        },
    };

    return (
        <div className={box}>
            {!!data && data.length > 0 ? 
            (<Line data={chartData} options={options} />) : 
            <span className={text}>No population data available</span>}
        </div>
        
    );
};

export default PopulationChart;