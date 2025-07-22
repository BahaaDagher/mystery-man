import React from 'react'
import { Bar } from 'react-chartjs-2'

const DepartmentBarChart = ({ section, label ,height}) => {
  const data = {
    labels: section.branches.map(d => d.name),
    datasets: [
      {
        label: section.name,
        data: section.branches.map(d => d.value),
        backgroundColor: '#5654D4',
        hoverBackgroundColor: '#5654D4',
        borderRadius: 5,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
        // tension: 0.3,
      },
    ],
  }
  const lang = localStorage.getItem("language");
  const isArabic = lang === "ar";

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#585151', font: { size: 12 } },
      },
      y: {
        position: isArabic ? 'right' : 'left',
        beginAtZero: true,
        grid: { color: '#F0F0F0' },
        ticks: { color: "#A5A5A5", font: { size: 14 } },
      },
    },
  };
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="mb-2 text-lg font-semibold text-black2">{label}</div>
      <Bar data={data} options={options} height={height} />
    </div>
  )
}

export default DepartmentBarChart 