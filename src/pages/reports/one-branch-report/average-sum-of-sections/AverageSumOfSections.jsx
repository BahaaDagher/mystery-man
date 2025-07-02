import React from 'react'
import SectionProgressBars from '../../../../components/SectionProgressBars'

// Example API data (replace with real API data as needed)
const ApiData = [
  { name: 'Section Name', value: 93 },
  { name: 'Section Name', value: 80 },
  { name: 'Section Name', value: 78 },
  { name: 'Section Name', value: 62 },
  { name: 'Section Name', value: 55 },
  { name: 'Section Name', value: 44 },
  { name: 'Section Name', value: 70 },
]

const AverageSumOfSections = () => {
  return (
    <div className="bg-white  rounded-[12px] p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[22px] font-bold text-black6 leading-[21.55px] tracking-[-0.16px]">
            Average sum of sections for all tasks for the same branch
        </span>
      </div>
      <hr className="my-4 border-gray-200 bg-main mb-8" />
      <div>
        <SectionProgressBars sections={ApiData} />
      </div>
    </div>
  )
}

export default AverageSumOfSections