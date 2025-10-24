import React from 'react'
import { useTranslation } from 'react-i18next';
import BarChartComponent from '../../../../components/BarChartComponent'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Colors } from '../../../../Theme';
import { useSelector } from 'react-redux';
import { getColorPercentages } from '../../../../utils/colorPercentageUtils';

const RateOfDevelopmentInEachSectionLine = ({apiData}) => {
  const { t } = useTranslation();
  const lang = localStorage.getItem('language');
  const isArabic = lang === 'ar';
  
  // Get profile data from Redux state
  const profileData = useSelector(state => state.profileData.getProfileData);
  
  // Get dynamic color percentages
  const { greenPercentage, goldPercentage } = getColorPercentages(profileData);

  // Function to determine color based on percentage value using dynamic thresholds
  const getColorBasedOnPercentage = (percentage) => {
    if (percentage >= greenPercentage) {
      return Colors.green; // green
    } else if (percentage >= goldPercentage) {
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
          label: t("text.Previous_Month"),
          data: firstData,
          backgroundColor: firstData.map(value => getColorBasedOnPercentage(value)),
          borderRadius: 5,
          barPercentage: 0.6,
          categoryPercentage: 0.7,
        },
        {
          label: t("text.Current_Month"),
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
      // Enhanced datalabels plugin configuration without background
      datalabels: {
        anchor: 'end',
        align: 'top',
        formatter: (value) => value,
        font: {
          weight: 'bold',
          size: 12,
        },
        color: '#000',
        offset: 5,
        padding: {
          top: 6,
          bottom: 6,
          left: 10,
          right: 10
        },
        textAlign: 'center'
      },
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
    // Add padding at the top to accommodate data labels
    layout: {
      padding: {
        top: 30
      }
    }
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