import React from 'react'
import LineChartComponent from '../../../../components/LineChartComponent'

const OverallEvaluationOfEachBranch = ({apiData}) => {
  // Transform apiData to match the expected format for the chart
  const transformedData = apiData?.map(branch => [
    branch.branch_name, 
    branch.average_rating
  ]) || []

  const labels = transformedData.map(item => item[0]);
  const dataValues = transformedData.map(item => item[1]);

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