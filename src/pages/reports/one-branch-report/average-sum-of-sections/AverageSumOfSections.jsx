import React from 'react'
import { useTranslation } from 'react-i18next';
import SectionProgressBars from '../../../../components/SectionProgressBars'

const AverageSumOfSections = ({apiData}) => {
  const { t } = useTranslation();
  
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
      <span className="text-2xl font-bold text-black2 leading-[28px]">
            {t("text.Average_sum_of_sections_for_all_tasks_for_the_same_branch")}
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