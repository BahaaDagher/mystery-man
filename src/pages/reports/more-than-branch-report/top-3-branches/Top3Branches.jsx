import React from 'react'
import { useTranslation } from 'react-i18next';

const Top3Branches = ({apiData}) => {
  const { t } = useTranslation();
  
  // Take only the first 3 items from apiData, or all if less than 3
  const top3Branches = apiData?.slice(0, 3) || []

  return (
    <div className='bg-white rounded-[12px] p-6 '>
        <div className=' font-bold text-[22px] leading-[28px] '> {t('text.top_3_branches_rating')}</div>
        <hr className='border-gray_l'/>
        <div className="flex flex-col gap-4 mt-8">
          {top3Branches.map((branch, idx) => (
            <div key={idx} className="w-full">
              <div className="flex justify-between items-center mb-2">
                <div className="text-black font-bold text-[14px]">{branch.branch_name}</div>
                <div className="text-black font-bold text-[14px]">{branch.percentage}%</div>
              </div>
              <div
                className="bg-[#3734CA] rounded-md h-8 "
                style={{
                  width: `${branch.percentage}%`, // Use percentage from API data
                  minWidth: "1px",
                  transition: "width 0.3s"
                }}
              ></div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Top3Branches