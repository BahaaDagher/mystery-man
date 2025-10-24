import React from 'react'
import { useTranslation } from 'react-i18next';
import BarComponent from '../../../../components/BarComponent';
import { useSelector } from 'react-redux';
import { getColorPercentages } from '../../../../utils/colorPercentageUtils';
import { Colors } from '../../../../Theme';

const AverageSectionRatings = ({apiData}) => {
  const { t } = useTranslation();
  
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
        backgroundColor: transformedData.map(item => getColorBasedOnPercentage(item.value)),
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
        ticks: { color: "#A5A5A5", font: { size: 14 } },
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
    <BarComponent
      title={t('text.average_step_ratings')}
      chartData={chartData}
      chartOptions={options}
      height={200}
    />
  )
}

export default AverageSectionRatings