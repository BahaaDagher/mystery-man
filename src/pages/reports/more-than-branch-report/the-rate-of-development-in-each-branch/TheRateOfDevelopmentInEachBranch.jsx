import React from 'react'
import BarComponent from '../../../../components/BarComponent';
const apiData = [
    { name: 'January', value: 70 },
    { name: 'February', value: 55 },
    { name: 'March', value: 35 },
    { name: 'April', value: 20 },
    { name: 'May', value: 150 },
    { name: 'June', value: 45 },
    { name: 'July', value: 50 }, 
    { name: 'August', value: 70 },
    { name: 'September', value: 60 },
    { name: 'October', value: 70 },
];

  
  const chartData = {
    labels: apiData.map(item => item.name),
    datasets: [
      {
        label: 'Rating',
        data: apiData.map(item => item.value),
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
const TheRateOfDevelopmentInEachBranch = () => {
  return (
    <BarComponent
        title={"The rate of development in each branch for all branches"}
        chartData={chartData}
        chartOptions={options}
        height={100}
    />
  )
}

export default TheRateOfDevelopmentInEachBranch