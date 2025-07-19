import React from 'react'
import BarChartComponent from '../../../../components/BarChartComponent'

const RateOfDevelopmentInEachSectionLine = ({apiData}) => {
  const lang = localStorage.getItem('language');
  const isArabic = lang === 'ar';

  // Transform API data to chart format
  const transformApiData = (apiData) => {
    if (!apiData || !apiData.chart) {
      return {
        labels: [],
        datasets: [
          {
            label: 'Previous Month',
            data: [],
            backgroundColor: '#5654D4', // blue
            borderRadius: 5,
            barPercentage: 0.6,
            categoryPercentage: 0.7,
          },
          {
            label: 'Current Month',
            data: [],
            backgroundColor: '#FF9F0A', // orange
            borderRadius: 5,
            barPercentage: 0.6,
            categoryPercentage: 0.7,
          },
        ]
      };
    }
    
    return {
      labels: apiData.chart.map(item => item.label),
      datasets: [
        {
          label: 'first',
          data: apiData.chart.map(item => item.first),
          backgroundColor: '#5654D4', // blue
          borderRadius: 5,
          barPercentage: 0.6,
          categoryPercentage: 0.7,
        },
        {
          label: 'second',
          data: apiData.chart.map(item => item.second),
          backgroundColor: '#FF9F0A', // orange
          borderRadius: 5,
          barPercentage: 0.6,
          categoryPercentage: 0.7,
        },
      ]
    };
  };

  const chartData = transformApiData(apiData);

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