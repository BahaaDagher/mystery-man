import React from 'react'
import GeneralRate from './general-rate/GeneralRate'
import ReviewsQualification from './reviews-qualification/ReviewsQualification'
import Sections from './sections/Sections'
import ImprovementPercentage from './improvement-percentage/ImprovementPercentage'
import AverageSumOfSections from './average-sum-of-sections/AverageSumOfSections'

const OneBranchReport = () => {
  return (
    <div className='flex flex-col gap-3'>
      <div className='w-full flex justify-between gap-3'>
        <div className='w-[35%] bg-white rounded-[12px] '> <GeneralRate/></div>
        <div className='w-[65%] bg-white rounded-[12px] '> <ReviewsQualification/></div>
      </div>
      <div className='w-full bg-white rounded-[12px] p-6 '><Sections/></div>
      <div className='w-full flex justify-between gap-3'>
        <div className='w-[50%] bg-white rounded-[12px] '> <AverageSumOfSections/></div>
        <div className='w-[50%] bg-white rounded-[12px] '> <ImprovementPercentage/></div>
      </div>
    </div>
  )
}

export default OneBranchReport