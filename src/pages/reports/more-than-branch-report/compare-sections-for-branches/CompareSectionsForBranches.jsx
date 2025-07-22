import React, { useEffect, useState } from 'react'
import DepartmentBarChart from './DepartmentBarChart'
import cancelIcon from '../../../../assets/icons/cancel-icon.svg'
import CustomSelect from '../../../../components/CustomSelect'
import Loading from '../../../../components/Loading'
import {
    Chart as ChartJS,
    BarElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Filler,
  } from 'chart.js'
  
  ChartJS.register(BarElement, PointElement, CategoryScale, LinearScale, Tooltip, Filler)


const CompareSectionsForBranches = ({apiData, allSteps, onStepsIdsChangeFromMoreThanBranch}) => {
  const [stepsIds, setStepsIds] = useState([])

  // Select the first step by default if available
  const [selectedSteps, setSelectedSteps] = useState(
    allSteps?.length > 0 ? [allSteps[0].id] : []
  )

  // For CustomSelect, map to {value, label} (value is number)
  const selectOptions = allSteps.map(step => ({ value: step.id, label: step.name }))

  // Filter apiData for selected steps based on ID matching
  const selectedData = apiData?.filter(step => selectedSteps.includes(step.step_id)) || []

  // Handle step selection - add to stepsIds when selected
  const handleStepSelection = (selectedValues) => {
    setSelectedSteps(selectedValues)
    
    // Add new step IDs to stepsIds (cumulative)
    const newStepIds = selectedValues.filter(id => !stepsIds.includes(id))
    if (newStepIds.length > 0) {
      const updatedStepsIds = [...stepsIds, ...newStepIds]
      setStepsIds(updatedStepsIds)
      // Pass stepsIds to parent component
      if (onStepsIdsChangeFromMoreThanBranch) {
        onStepsIdsChangeFromMoreThanBranch(updatedStepsIds)
      }
    }
  }

  // set the first step as default
  useEffect(()=>{
    if (allSteps?.length > 0) {
      setSelectedSteps([allSteps[0].id])
    }
  },[allSteps])

  return (
    <>
      <div className="bg-white rounded-3xl p-6 ">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-black2 leading-[28px]">
            Compare sections for branches
          </span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <CustomSelect
            options={selectOptions}
            value={selectedSteps}
            onChange={handleStepSelection}
            multiple
            placeholder="choose step"
            className="min-w-[200px]"
          />
          {/* Render selected steps as chips with cancel icon */}
          <div className="flex flex-wrap gap-2">
            {selectedSteps.map(val => {
              const label = allSteps?.find(step => step.id === val)?.name || val
              return (
                <span key={val} className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm font-medium">
                  {label}
                  <span
                    className="ml-2 text-gray-400 hover:text-red-500"
                    onClick={() => setSelectedSteps(selectedSteps.filter(s => s !== val))}
                    aria-label="Remove step"
                    type="button"
                  >
                    <img src={cancelIcon} alt="cancel" />
                  </span>
                </span>
              )
            })}
          </div>
        </div>
        <hr className="my-4 border-gray-200 bg-main mb-8" />
        {/* Render a bar chart for each selected step */}
        <div className="grid gap-8">
          {selectedData.map(step => (
            <DepartmentBarChart
              key={step.step_id}
              section={step}
              label={step.step_name}
              height={100}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default CompareSectionsForBranches