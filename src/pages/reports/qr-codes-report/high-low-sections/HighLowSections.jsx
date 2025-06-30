import React from 'react'
import SectionRating from './SectionRating'

const HighLowSections = () => {
  const sectionData = [
    { name: 'Clean', rating: 4, count: 31 },
    { name: 'Food Quality', rating: 1, count: 20},
  ];
  
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