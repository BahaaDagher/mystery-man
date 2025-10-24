import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
  ChartDataLabels
);

const LineChartComponent = ({ title, chartData, chartOptions ,height}) => {
  return (
    <div className="bg-white rounded-3xl p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl font-bold text-black2 leading-[28px]">
          {title}
        </span>
      </div>
      <hr className="my-4 border-gray-200 bg-main mb-8" />
      <Line data={chartData} options={chartOptions} height={height} />
    </div>
  );
};

export default LineChartComponent;