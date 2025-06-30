import React from 'react'
import DoughnutComponent from '../../../../components/DoughnutComponent'

const apiData = [
  { data: [75, 25], labels: ["cleaning", "other"] },
  { data: [50, 50], labels: ["cleaning", "other"] },
  { data: [60, 40], labels: ["smiling", "other"] },
  { data: [70, 30], labels: ["entertainment", "other"] },
  { data: [35, 65], labels: ["polite", "other"] },
  { data: [95, 5], labels: ["handling", "other"] },
  // ...more
]

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

const AverageRating = () => {
  return (
    <div className='rounded-[20px] w-full max-w-[1200px] mx-auto'>
      <div className='text-[22px] font-bold text-black2 leading-[28px] mb-6'>
        Average total evaluation for each section
      </div>
      <div className='flex flex-row gap-10 items-center  flex-wrap'>
        {apiData.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <DoughnutComponent
              chartData={{
                labels: item.labels,
                datasets: [
                  {
                    data: item.data,
                    backgroundColor,
                    borderWidth: 1,
                    spacing: 3,
                    borderRadius: 5,
                  }
                ]
              }}
              doughnutSize={doughnutSize}
              content={{
                value: `${item.data[0]}%`,
                contentDimensions: 60,
                contentFontSize: 18,
              }}
              options={options}
            />
            <span className="mt-2 text-black2 text-[16px] font-medium capitalize">
              {item.labels[0]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AverageRating