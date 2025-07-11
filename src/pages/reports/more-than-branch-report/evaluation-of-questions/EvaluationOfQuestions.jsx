import React from 'react'
import Star from '../../../../assets/icons/Star.svg'
import BranchReviewCard from './BranchReviewCard';
import ReviewTypeCard from './ReviewTypeCard';

const EvaluationOfQuestions = () => {
  const ApiBranchesData = [
    {
      branchName: "Branch 1",
      reviews: { total: 1649, negative: 1120, neutral: 514, positive: 211 }
    },
    {
      branchName: "Branch 2",
      reviews: { total: 256, negative: 2, neutral: 120, positive: 124 }
    },
    {
      branchName: "Branch 3",
      reviews: { total: 845, negative: 0, neutral: 340, positive: 504 }
    }
  ];
  const ApiReviewTypeData = [
    {
      name: 'Negative',
      count: 900,
      numberOfStars: 2,
    },
    {
      name: 'Neutral',
      count: 431,
      numberOfStars: 3,
    },
    {
      name: 'Positive',
      count: 874,
      numberOfStars: 7,
    },
  ];

  return (
    <div className='bg-white rounded-[12px] p-6 '>
        <div className='flex justify-between items-center'>
            <div className=' font-bold text-[22px] leading-[28px] '> Evaluation of questions for each branch</div>
            <div className='text-black font-bold text-[14px] flex items-center gap-2'>
                <span className='font-inter font-medium text-[24px] leading-[28px]  '>2,540</span>
                <img src={Star} alt="Star" />
            </div>
        </div>
        <hr className='border-gray_l'/>
        <div className='flex justify-center items-center  w-full border border-grayDC rounded-[8px] '>
        {ApiBranchesData.map((branch, idx) => (
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