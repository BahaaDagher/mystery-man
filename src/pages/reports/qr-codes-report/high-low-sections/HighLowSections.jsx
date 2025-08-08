import React from 'react'
import { useTranslation } from 'react-i18next';
import SectionRating from './SectionRating'

const HighLowSections = ({apiData}) => {
  const { t } = useTranslation();
  
  // Transform API data to chart format
  const sectionData = [];
  
  // Convert 5-point scale to percentage (multiply by 20 to get percentage)
  const convertToPercentage = (rate) => {
    return (rate * 20).toFixed(1); // Convert to percentage and keep 1 decimal place
  };
  
  console.log("apiDataapiData",apiData)
  // Add top section if it exists
  if (apiData?.top) {
    debugger;
    sectionData.push({
      name: apiData.top.section,
      rating: parseFloat(apiData.top.average_rate),
      count: 0 // You can add count if available in API
    });
  }
  
  // Add bottom section if it exists
  if (apiData?.bottom) {
    sectionData.push({
      name: apiData.bottom.section,
      rating: parseFloat(apiData.bottom.average_rate),
      count: 0 // You can add count if available in API
    });
  }
  
  return (
    <div className="bg-[#fff] rounded-[20px] p-6 w-full max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[22px] font-bold text-black2 leading-[28px]">
          {t('text.high_low_sections')}
        </span>
      </div>
      <hr className="my-4 border-gray-200" />
      <div className="flex flex-row gap-8 items-center justify-between  ">
        <SectionRating title={t('text.section')} data={sectionData} />
      </div>
    </div>
  )
}

export default HighLowSections