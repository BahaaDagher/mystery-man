import React from 'react'
import SectionRating from './SectionRating'

const HighLowSections = ({apiData}) => {
  // Transform API data to chart format
  const sectionData = [];
  
  // Add top section if it exists
  if (apiData?.top) {
    sectionData.push({
      name: apiData.top.label,
      rating: parseFloat(apiData.top.value),
      count: 0 // You can add count if available in API
    });
  }
  
  // Add bottom section if it exists
  if (apiData?.bottom) {
    sectionData.push({
      name: apiData.bottom.label,
      rating: parseFloat(apiData.bottom.value),
      count: 0 // You can add count if available in API
    });
  }
  
  return (
    <div className="bg-[#fff] rounded-[20px] p-6 w-full max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[22px] font-bold text-black2 leading-[28px]">
          High & Low Sections
        </span>
      </div>
      <hr className="my-4 border-gray-200" />
      <div className="flex flex-row gap-8 items-center justify-between  ">
        <SectionRating title="Section" data={sectionData} />
      </div>
    </div>
  )
}

export default HighLowSections