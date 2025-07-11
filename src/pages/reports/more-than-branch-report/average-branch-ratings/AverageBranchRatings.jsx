import React from 'react'
import LineChartComponent from '../../../../components/LineChartComponent';
const ApiData = [
    ["Jan", 0],
    ["Feb", 40],
    ["Mar", 50],
    ["Apr", 30],
    ["May", 80],
    ["Jun", 100],
    ["Jul", 85],
    ["Aug", 90],
    ["Sep", 60],
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
      borderColor: "#5654D4", 
      backgroundColor: "transparent",
      pointBackgroundColor: "#fff",
      pointBorderColor: "#5654D4",
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

const AverageBranchRatings = () => {
  return (
    <LineChartComponent
      title={"Average ratings of all branches over a specific period of time"}
      chartData={chartData}
      chartOptions={chartOptions} 
      height={200}
    />
  )
}

export default AverageBranchRatings