import React from 'react'
import { useTranslation } from 'react-i18next';
import Star from '../../../../assets/icons/Star.svg'
import BranchReviewCard from './BranchReviewCard';
import ReviewTypeCard from './ReviewTypeCard';


const EvaluationOfQuestions = ({apiData}) => {
  const { t } = useTranslation();

  // Transform apiData to match the expected format for BranchReviewCard
  const transformedBranchesData = apiData?.branches?.map(branch => ({
    branchName: branch.branch_name,
    reviews: { 
      total_questions: branch.total_questions, 
      negative: branch.negative, 
      neutral: branch.neutral, 
      positive: branch.positive ,
      positive_percentage: branch.positive_percentage,
      neutral_percentage: branch.neutral_percentage,
      negative_percentage: branch.negative_percentage
    }
  })) || []


  const ApiReviewTypeData = [
    {
      name: 'negative',
      count: apiData?.summary?.mission_negative,
    },
    {
      name: 'neutral',
      count: apiData?.summary?.mission_neutral,
    },
    {
      name: 'positive',
      count: apiData?.summary?.mission_positive,
    },
  ];

  return (
    <div className='bg-white rounded-[12px] p-6 w-full'>
        <div className='flex justify-between items-center'>
            <div className=' font-bold text-[22px] leading-[28px] '> {t('text.evaluation_questions_branch')}</div>
            <div className='text-black font-bold text-[14px] flex items-center gap-2'>
                {/* <span className='font-inter font-medium text-[24px] leading-[28px]  '>2,540</span>
                <img src={Star} alt="Star" /> */}
            </div>
        </div>
        <hr className='border-gray_l'/>
        <div className='flex  w-full  rounded-[8px] overflow-x-auto w-full'>
        {transformedBranchesData.map((branch, idx) => (
        <BranchReviewCard
            key={idx}
            branchName={branch.branchName}
            reviews={branch.reviews}
            index ={idx} 
        />
        ))}
        </div>
        <div className='flex justify-between items-start w-full gap-4 mt-8'>
          {ApiReviewTypeData.map((item, idx) => (
            <ReviewTypeCard key={idx} {...item} />
          ))}
        </div>
    </div>
  )
}

export default EvaluationOfQuestions