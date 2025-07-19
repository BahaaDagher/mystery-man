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

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler
);

const Sections = ({apiData}) => {
  const lang = localStorage.getItem("language");
  const isArabic = lang === "ar";

  // Transform API data to chart format
  const transformApiData = (apiData) => {
    if (!apiData || !apiData.chart) {
      return {
        labels: [],
        data: []
      };
    }
    
    return {
      labels: apiData.chart.map(item => item.label),
      data: apiData.chart.map(item => item.value)
    };
  };

  const transformedData = transformApiData(apiData);
  const labels = transformedData.labels;
  const dataValues = transformedData.data;

  const data = {
    labels,
    datasets: [
      {
        label: "Sections",
        data: dataValues,
        fill: true,
        borderColor: "#FF718B",
        backgroundColor: "transparent",
        pointBackgroundColor: "#fff",
        pointBorderColor: "#FF718B",
        pointRadius: 7,
        pointHoverRadius: 7,
        tension: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.parsed.y;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "#e5e7eb" },
        position: isArabic ? "right" : "left",
        ticks: {
          //   stepSize: isRate ? 1 : 10,
          max: undefined,
        },
        max: undefined,
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bg-white rounded-3xl ">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl font-bold text-black2 leading-[28px]">
          Sections
        </span>
      </div>
      <hr className="my-4 border-gray-200 bg-main mb-8" />
      <Line data={data} options={options} height={100} />
    </div>
  );
};

export default Sections;
