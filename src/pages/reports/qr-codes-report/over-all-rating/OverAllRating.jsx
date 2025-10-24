import React from 'react'
import { useTranslation } from 'react-i18next';
import BarChartComponent from '../../../../components/BarChartComponent'
import { useSelector } from 'react-redux';
import { getColorPercentages } from '../../../../utils/colorPercentageUtils';
import { Colors } from '../../../../Theme';

const OverAllRating = ({apiData}) => {
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
  
  // Transform API data to chart format
  const chartData = {
    labels: apiData?.map(item => item.qr_code) || [],
    datasets: [
      {
        label: 'Rating',
        data: apiData?.map(item => item.percentage) || [],
        // Changed to use dynamic colors based on percentage
        backgroundColor: apiData?.map(item => getColorBasedOnPercentage(item.percentage)) || [],
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
        {t('text.overall_rating_qr_codes')}
      </div>
      <hr className="my-4 border-gray-200" />
      <BarChartComponent chartData={chartData} options={options} height={100} />
    </div>
  )
}

export default OverAllRating