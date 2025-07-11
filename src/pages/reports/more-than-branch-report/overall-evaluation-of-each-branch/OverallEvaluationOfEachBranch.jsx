import React from 'react'
import LineChartComponent from '../../../../components/LineChartComponent'

const ApiData = [
    ["Branch 1", 42],
    ["Branch 2", 35],
    ["Branch 3", 28],
    ["Branch 4", 19],
    ["Branch 5", 31],
    ["Branch 6", 27],
    ["Branch 7", 45],
    ["Branch 8", 38],
    ["Branch 9", 22],
    ["Branch 10", 50],
    ["Branch 11", 29],
];


const labels = ApiData.map(item => item[0]);
const dataValues = ApiData.map(item => item[1]);

const chartData = {
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

const lang = localStorage.getItem("language");
const isArabic = lang === "ar";

const chartOptions = {
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
        max: undefined,
      },
      max: undefined,
    },
    x: {
      grid: { display: false },
    },
  },
};

const OverallEvaluationOfEachBranch = () => {
  return (
    <LineChartComponent
      title={"Overall evaluation of each branch"}
      chartData={chartData}
      chartOptions={chartOptions} 
      height={100}
    />
  )
}

export default OverallEvaluationOfEachBranch