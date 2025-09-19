import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import GeneralRate from './general-rate/GeneralRate'
import ReviewsQualification from './reviews-qualification/ReviewsQualification'
import Sections from './sections/Sections'
import ImprovementPercentage from './improvement-percentage/ImprovementPercentage'
import AverageSumOfSections from './average-sum-of-sections/AverageSumOfSections'
import RateOfDevelopmentInEachSectionLine from './rate-of-development-in-each-section/RateOfDevelopmentInEachSectionLine'
import DepartmentDevelopmentRate from './department-development-rate/DepartmentDevelopmentRate'

const OneBranchReport = ({oneBranchData, onStepsIdsChangeFromOneBranch, allSteps}) => {
  const { t } = useTranslation();

  const handleStepsIdsChangeFromOneBranch = (newStepsIds) => {
    if (onStepsIdsChangeFromOneBranch) {
      onStepsIdsChangeFromOneBranch(newStepsIds)
    }
  }

  return (
    oneBranchData?.generalRate?.branch_overall_rating !== 0 ? (
      <div className='flex flex-col gap-3'>
        <div className='w-full flex flex-col lg:flex-row justify-between gap-3 pdf-section'>
          <div className='w-full lg:w-[35%] bg-white rounded-[12px] '> <GeneralRate apiData={oneBranchData.generalRate}/></div>
          <div className='w-full lg:w-[65%] bg-white rounded-[12px] '> <ReviewsQualification apiData={oneBranchData.reviewStats}/></div>
        </div>
        <div className='w-full bg-white rounded-[12px] p-6 pdf-section'><Sections apiData={oneBranchData.stepStats}/></div>
        <div className='w-full flex flex-col lg:flex-row justify-between gap-3 h-auto lg:h-[650px] pdf-section'>
          <div className='w-full lg:w-[50%] bg-white rounded-[12px] '> <AverageSumOfSections apiData={oneBranchData.stepAverageStats}/></div>
          <div className='w-full lg:w-[50%] bg-white rounded-[12px] '> <ImprovementPercentage apiData={oneBranchData.branchImprovementTrend}/></div>
        </div>
        <div className='w-full bg-white rounded-[12px] p-6 pdf-section '><RateOfDevelopmentInEachSectionLine apiData={oneBranchData.stepDevelopmentTrend}/></div>
        <div className='w-full bg-white rounded-[12px] p-6 pdf-section'><DepartmentDevelopmentRate apiData={oneBranchData.stepProgressOverTime} onStepsIdsChangeFromOneBranch={handleStepsIdsChangeFromOneBranch} allSteps={allSteps}/></div>
      </div>
    ) : (
      <div className='w-full  h-[300px]   flex justify-center items-center text-[50px] text-second'>
        {t("text.No_Report_Available")}
      </div>
    )
  )
}

export default OneBranchReport