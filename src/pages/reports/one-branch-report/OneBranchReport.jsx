import React, { useState } from 'react'
import GeneralRate from './general-rate/GeneralRate'
import ReviewsQualification from './reviews-qualification/ReviewsQualification'
import Sections from './sections/Sections'
import ImprovementPercentage from './improvement-percentage/ImprovementPercentage'
import AverageSumOfSections from './average-sum-of-sections/AverageSumOfSections'
import RateOfDevelopmentInEachSectionLine from './rate-of-development-in-each-section/RateOfDevelopmentInEachSectionLine'
import DepartmentDevelopmentRate from './department-development-rate/DepartmentDevelopmentRate'

const OneBranchReport = ({oneBranchData, onStepsIdsChange}) => {

  const handleStepsIdsChange = (newStepsIds) => {
    if (onStepsIdsChange) {
      onStepsIdsChange(newStepsIds)
    }
  }

  return (
    <div className='flex flex-col gap-3'>
      <div className='w-full flex justify-between gap-3'>
        <div className='w-[35%] bg-white rounded-[12px] '> <GeneralRate apiData={oneBranchData.generalRate}/></div>
        <div className='w-[65%] bg-white rounded-[12px] '> <ReviewsQualification apiData={oneBranchData.reviewStats}/></div>
      </div>
      <div className='w-full bg-white rounded-[12px] p-6 '><Sections apiData={oneBranchData.stepStats}/></div>
      <div className='w-full flex justify-between gap-3'>
        <div className='w-[50%] bg-white rounded-[12px] '> <AverageSumOfSections apiData={oneBranchData.stepAverageStats}/></div>
        <div className='w-[50%] bg-white rounded-[12px] '> <ImprovementPercentage apiData={oneBranchData.branchImprovementTrend}/></div>
      </div>
      <div className='w-full bg-white rounded-[12px] p-6 '><RateOfDevelopmentInEachSectionLine apiData={oneBranchData.stepDevelopmentTrend}/></div>
      <div className='w-full bg-white rounded-[12px] p-6 '><DepartmentDevelopmentRate apiData={oneBranchData.stepProgressOverTime} onStepsIdsChange={handleStepsIdsChange}/></div>
    </div>
  )
}

export default OneBranchReport