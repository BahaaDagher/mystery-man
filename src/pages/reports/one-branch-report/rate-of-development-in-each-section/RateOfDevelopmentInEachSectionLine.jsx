import React from 'react'
import BarChartComponent from '../../../../components/BarChartComponent'

const apiData = [
  { name: 'section1', preValue: 50, currValue: 30 },
  { name: 'section2', preValue: 50, currValue: 90 },
  { name: 'section3', preValue: 30, currValue: 80 },
  { name: 'section4', preValue: 60, currValue: 40 },
  { name: 'section5', preValue: 40, currValue: 60 },
  { name: 'section6', preValue: 70, currValue: 50 },
];

const chartData = {
  labels: apiData.map(item => item.name),
  datasets: [
    {
      label: 'Previous Month',
      data: apiData.map(item => item.preValue),
      backgroundColor: '#5654D4', // blue
      borderRadius: 5,
      barPercentage: 0.6,
      categoryPercentage: 0.7,
    },
    {
      label: 'Current Month',
      data: apiData.map(item => item.currValue),
      backgroundColor: '#FF9F0A', // orange
      borderRadius: 5,
      barPercentage: 0.6,
      categoryPercentage: 0.7,
    },
  ],
};

const lang = localStorage.getItem('language');
const isArabic = lang === 'ar';

const options = {
  responsive: true,
  plugins: {
    legend: { display: true },
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
      ticks: { color: '#A5A5A5', font: { size: 14 } },
    },
  },
};

const RateOfDevelopmentInEachSectionLine = () => {
  return (
    <div className="bg-white rounded-3xl ">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl font-bold text-black2 leading-[28px]">
          Rate of development in each section
        </span>
      </div>
      <hr className="my-4 border-gray-200 bg-main mb-8" />
      <BarChartComponent chartData={chartData} options={options} height={100} />
    </div>
  )
}

export default RateOfDevelopmentInEachSectionLine