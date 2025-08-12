import React from 'react'
import { useTranslation } from 'react-i18next';
import DoughnutComponent from '../../../../components/DoughnutComponent'

const backgroundColor = [
  "#446AFA",
  "#FF7853"
]

const doughnutSize = 100

const options = {
  cutout: '70%',
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: false,
      position: 'nearest',
    },
  },
  maintainAspectRatio: false,
}

const AverageRating = ({apiData}) => {
  const { t } = useTranslation();

  return (
    <div className='rounded-[20px] w-full max-w-[1200px] mx-auto'>
      <div className='text-[22px] font-bold text-black2 leading-[28px] mb-6'>
        {t('text.average_total_evaluation')}
      </div>
      <div className='flex flex-row gap-10 items-center  flex-wrap'>
        {apiData?.map((item, idx) => {
          // Calculate the "other" percentage (100 - value)
          const otherValue = 100 - (item.percentage || 0);
          
          return (
            <div key={idx} className="flex flex-col items-center">
              <DoughnutComponent
                chartData={{
                  labels: [item.section, "other"],
                  datasets: [
                    {
                      data: [item.percentage || 0, otherValue],
                      backgroundColor,
                      borderWidth: 1,
                      spacing: 0,
                      borderRadius: 5,
                    }
                  ]
                }}
                doughnutSize={doughnutSize}
                content={{
                  value: `${item.percentage || 0}%`,
                  contentDimensions: 60,
                  contentFontSize: 18,
                }}
                options={options}
              />
              <span className="mt-2 text-black2 text-[16px] font-medium capitalize">
                {item.section}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default AverageRating