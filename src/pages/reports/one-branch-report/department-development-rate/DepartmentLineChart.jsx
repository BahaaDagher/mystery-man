import React from 'react'
import { Line } from 'react-chartjs-2'

const DepartmentLineChart = ({ section, label }) => {
  const data = {
    labels: section.data.map(d => d.month),
    datasets: [
      {
        label: section.name,
        data: section.data.map(d => d.value),
        fill: false,
        borderColor: '#1D49A7',
        backgroundColor: '#fff',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#1D49A7',
        pointRadius: 6,
        pointHoverRadius: 8,
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
      y: {
        beginAtZero: true,
        grid: { color: '#F0F0F0' },
        position: isArabic ? 'right' : 'left',
        ticks: { color: '#A5A5A5', font: { size: 14 } },
      },
      x: {
        grid: { display: false },
        ticks: { color: '#585151', font: { size: 12 } },
      },
    },
  }
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="mb-2 text-lg font-semibold text-black2">{label}</div>
      <Line data={data} options={options} height={120} />
    </div>
  )
}

export default DepartmentLineChart 