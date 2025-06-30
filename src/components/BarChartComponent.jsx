import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChartComponent = ({ chartData, options, height = 100, width = '100%' }) => {
  return (
    <div  className="flex items-center justify-center w-full ">
      <Bar data={chartData} options={options} height={height} />
    </div>
  );
};

export default BarChartComponent; 