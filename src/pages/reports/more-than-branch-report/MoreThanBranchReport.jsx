import React from 'react'
import Top3Branches from './top-3-branches/Top3Branches'
import EvaluationOfQuestions from './evaluation-of-questions/EvaluationOfQuestions'
import OverallEvaluationOfEachBranch from './overall-evaluation-of-each-branch/OverallEvaluationOfEachBranch'
import AverageDepartmentRatings from './average-section-ratings/AverageSectionRatings'
import AverageBranchRatings from './average-branch-ratings/AverageBranchRatings'
import TheRateOfDevelopmentInEachBranch from './the-rate-of-development-in-each-branch/TheRateOfDevelopmentInEachBranch'
import CompareSectionsForBranches from './compare-sections-for-branches/CompareSectionsForBranches'

const MoreThanBranchReport = ({moreThanBranchData, onStepsIdsChangeFromMoreThanBranch, allSteps}) => {
  const handleStepsIdsChangeFromMoreThanBranch = (newStepsIds) => {
    if (onStepsIdsChangeFromMoreThanBranch) {
      onStepsIdsChangeFromMoreThanBranch(newStepsIds)
    }
  }
  return (
    <div className='flex flex-col gap-3'>
      <div className='w-full flex flex-col lg:flex-row justify-between gap-3 pdf-section'>
        <div className='w-full lg:w-[35%] bg-white rounded-[12px] ' > <Top3Branches apiData={moreThanBranchData.topBranchesByStepRating}/></div>
        <div className='w-full lg:w-[65%] bg-white rounded-[12px] '> <EvaluationOfQuestions apiData={moreThanBranchData.questionStatsPerBranch}/></div>
      </div>
      <div className='w-full bg-white rounded-[12px] pdf-section'> <OverallEvaluationOfEachBranch apiData={moreThanBranchData.topBranchesByStepRating}/></div>
      <div className='w-full flex flex-col lg:flex-row justify-between gap-3 pdf-section'>
        <div className='w-full lg:w-[50%] bg-white rounded-[12px] '> <AverageDepartmentRatings apiData={moreThanBranchData.averageRatingPerStep}/></div>
        <div className='w-full lg:w-[50%] bg-white rounded-[12px] '> <AverageBranchRatings apiData={moreThanBranchData.monthlyBranchRatingsFromSteps}/></div>
      </div>
      <div className='w-full bg-white rounded-[12px] pdf-section'> <TheRateOfDevelopmentInEachBranch apiData={moreThanBranchData.stepImprovementPerBranch} /></div>
      <div className='w-full bg-white rounded-[12px] pdf-section'> <CompareSectionsForBranches apiData={moreThanBranchData.stepStatsGroupedByStep} onStepsIdsChangeFromMoreThanBranch={handleStepsIdsChangeFromMoreThanBranch} allSteps={allSteps}/></div>
    </div>
  )
}

export default MoreThanBranchReport