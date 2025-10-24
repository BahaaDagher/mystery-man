import React from 'react'
import { useTranslation } from 'react-i18next';
import BarComponent from '../../../../components/BarComponent';
import { useSelector } from 'react-redux';
import { getColorPercentages } from '../../../../utils/colorPercentageUtils';
import { Colors } from '../../../../Theme';

const TheRateOfDevelopmentInEachBranch = ({apiData}) => {
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
    <div className="bg-[#fff] rounded-[20px] p-6 w-full ">
      <div className=" mb-2 text-2xl font-bold text-black2 leading-[28px]">
        {t('text.development_rate_branch')}
      </div>
      <hr className="my-4 border-gray-200" />
      <div className="space-y-6">
        {apiData?.map((branch, branchIndex) => {
          // Transform branch steps data for the chart
          const oldAvgData = branch.steps.map(step => step.old_avg);
          const newAvgData = branch.steps.map(step => step.new_avg);
          
          const chartData = {
            labels: branch.steps.map(step => step.step_name),
            datasets: [
              {
                label: t('text.old_average'),
                data: oldAvgData,
                backgroundColor: oldAvgData.map(value => getColorBasedOnPercentage(value)),
                borderRadius: 5,
                barPercentage: 0.6,
                categoryPercentage: 0.7,
              },
              {
                label: t('text.new_average'),
                data: newAvgData,
                backgroundColor: newAvgData.map(value => getColorBasedOnPercentage(value)),
                borderRadius: 5,
                barPercentage: 0.6,
                categoryPercentage: 0.7,
              }
            ],
          };

          return (
            <div key={branch.branch_id} className="bg-white rounded-[12px]">
              <BarComponent
                title={branch.branch_name} 
                chartData={chartData}
                chartOptions={options}
                height={100}
              />
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default TheRateOfDevelopmentInEachBranch