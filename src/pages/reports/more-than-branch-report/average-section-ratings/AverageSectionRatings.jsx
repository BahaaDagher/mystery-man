import React from 'react'
import { useTranslation } from 'react-i18next';
import BarComponent from '../../../../components/BarComponent';

const AverageSectionRatings = ({apiData}) => {
  const { t } = useTranslation();
  
  // Transform apiData to match the expected format for the chart
  const transformedData = apiData?.map(step => ({
    name: step.step_name,
    value: step.average_rating
  })) || []

  const chartData = {
    labels: transformedData.map(item => item.name),
    datasets: [
      {
        label: 'Rating',
        data: transformedData.map(item => item.value),
        backgroundColor: '#122E74',
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
    <BarComponent
      title={t('text.average_step_ratings')}
      chartData={chartData}
      chartOptions={options}
      height={200}
    />
  )
}

export default AverageSectionRatings