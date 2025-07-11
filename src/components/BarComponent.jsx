import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const BarComponent = ({ title, chartData, chartOptions ,height }) => {
  return (
    <div className="bg-white rounded-3xl p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl font-bold text-black2 leading-[28px]">
          {title}
        </span>
      </div>
      <hr className="my-4 border-gray-200 bg-main mb-8" />
      <Bar data={chartData} options={chartOptions} height={height} />
    </div>
  );
};

export default BarComponent; 