import React from 'react'
import BarChartComponent from '../../../../components/BarChartComponent'

const OverAllRating = ({apiData}) => {
  // Transform API data to chart format
  const chartData = {
    labels: apiData?.map(item => item.qr_code) || [],
    datasets: [
      {
        label: 'Rating',
        data: apiData?.map(item => item.percentage) || [],
        backgroundColor: '#5654D4',
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
    <div className="bg-[#fff] rounded-[20px] p-6 w-full ">
      <div className=" mb-2 text-2xl font-bold text-black2 leading-[28px]">
        Overall rating for each QR code 
      </div>
      <hr className="my-4 border-gray-200" />
      <BarChartComponent chartData={chartData} options={options} height={100} />
    </div>
  )
}

export default OverAllRating