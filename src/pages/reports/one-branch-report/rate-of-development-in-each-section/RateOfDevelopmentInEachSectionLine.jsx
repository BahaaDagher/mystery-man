import React from 'react'
import { useTranslation } from 'react-i18next';
import BarChartComponent from '../../../../components/BarChartComponent'
import { Colors } from '../../../../Theme';

const RateOfDevelopmentInEachSectionLine = ({apiData}) => {
  const { t } = useTranslation();
  const lang = localStorage.getItem('language');
  const isArabic = lang === 'ar';

  // Function to determine color based on percentage value
  const getColorBasedOnPercentage = (percentage) => {
    if (percentage >= 70) {
      return Colors.green; // green
    } else if (percentage >= 40) {
      return Colors.gold2; // gold2
    } else {
      return Colors.red; // red
    }
  };

  // Transform API data to chart format with dynamic colors
  const transformApiData = (apiData) => {
    if (!apiData || !apiData.chart) {
      return {
        labels: [],
        datasets: [
          {
            label: t("text.Previous_Month"),
            data: [],
            backgroundColor: '#5654D4', // blue
            borderRadius: 5,
            barPercentage: 0.6,
            categoryPercentage: 0.7,
          },
          {
            label: t("text.Current_Month"),
            data: [],
            backgroundColor: '#FF9F0A', // orange
            borderRadius: 5,
            barPercentage: 0.6,
            categoryPercentage: 0.7,
          },
        ]
      };
    }
    
    // Create separate datasets for each bar with individual colors based on values
    const firstData = apiData.chart.map(item => item.first);
    const secondData = apiData.chart.map(item => item.second);
    
    return {
      labels: apiData.chart.map(item => item.label),
      datasets: [
        {
          label: t("text.first"),
          data: firstData,
          backgroundColor: firstData.map(value => getColorBasedOnPercentage(value)),
          borderRadius: 5,
          barPercentage: 0.6,
          categoryPercentage: 0.7,
        },
        {
          label: t("text.second"),
          data: secondData,
          backgroundColor: secondData.map(value => getColorBasedOnPercentage(value)),
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
        ticks: { color: '#A5A5A5', font: { size: 14 } },
      },
    },
  };
  return (
    <div className="bg-white rounded-3xl ">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl font-bold text-black2 leading-[28px]">
          {t("text.Rate_of_development_in_each_section")}
        </span>
      </div>
      <hr className="my-4 border-gray-200 bg-main mb-8" />
      <BarChartComponent chartData={chartData} options={options} height={100} />
    </div>
  )
}

export default RateOfDevelopmentInEachSectionLine