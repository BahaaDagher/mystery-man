import React from 'react'
import SectionProgressBars from '../../../../components/SectionProgressBars'

const AverageSumOfSections = ({apiData}) => {
  // Transform API data to match SectionProgressBars expected format
  const transformApiData = (apiData) => {
    if (!apiData || !apiData.chart) {
      return [];
    }
    
    return apiData.chart.map(item => ({
      name: item.label,
      value: item.value
    }));
  };

  const transformedData = transformApiData(apiData);

  return (
    <div className="bg-white  rounded-[12px] p-6 h-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[22px] font-bold text-black6 leading-[21.55px] tracking-[-0.16px]">
            Average sum of sections for all tasks for the same branch
        </span>
      </div>
      <hr className="my-4 border-gray-200 bg-main mb-8" />
      <div className='h-[calc(100%-70px)]  overflow-y-auto  p-2'>
        <SectionProgressBars sections={transformedData} />
      </div>
    </div>
  )
}

export default AverageSumOfSections