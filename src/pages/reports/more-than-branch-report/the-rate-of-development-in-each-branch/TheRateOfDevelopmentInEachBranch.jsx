import React from 'react'
import { useTranslation } from 'react-i18next';
import BarComponent from '../../../../components/BarComponent';

const TheRateOfDevelopmentInEachBranch = ({apiData}) => {
  const { t } = useTranslation();
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
        {t('text.development_rate_branch')}
      </div>
      <hr className="my-4 border-gray-200" />
      <div className="space-y-6">
        {apiData?.map((branch, branchIndex) => {
          // Transform branch steps data for the chart
          const chartData = {
            labels: branch.steps.map(step => step.step_name),
            datasets: [
              {
                label: t('text.old_average'),
                data: branch.steps.map(step => step.old_avg),
                backgroundColor: '#5654D4',
                borderRadius: 5,
                barPercentage: 0.6,
                categoryPercentage: 0.7,
              },
              {
                label: t('text.new_average'),
                data: branch.steps.map(step => step.new_avg),
                backgroundColor: '#FF718B',
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