import React, { useEffect, useState } from 'react'
import CustomSelect from '../../../../components/CustomSelect'
import DepartmentLineChart from './DepartmentLineChart'
import cancelIcon from '../../../../assets/icons/cancel-icon.svg'
import Loading from '../../../../components/Loading'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
} from 'chart.js'
import { getSteps } from '../../../../store/slices/stepSlice'
import { useDispatch, useSelector } from 'react-redux'

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Filler)



const DepartmentDevelopmentRate = ( {apiData, onStepsIdsChange} ) => {
  const dispatch = useDispatch()
  const [allSteps , setAllSteps] = useState([])
  const [stepsIds , setStepsIds] = useState([])
  

  // Select the first step by default if available
  const [selectedSteps, setSelectedSteps] = useState(
    allSteps?.length > 0 ? [allSteps[0].id] : []
  )

  // For CustomSelect, map to {value, label} (value is number)
  const selectOptions = allSteps.map(step => ({ value: step.id, label: step.name }))

  // Filter apiData2 for selected steps based on ID matching
  const selectedData = apiData?.charts?.filter(step => selectedSteps.includes(step.id)) || []

  const getStepsData = useSelector(state => state.stepData.getStepsData) ;
  const getStepsDataLoading = useSelector(state => state.stepData.getStepsLoading) ;

  // Handle step selection - add to stepsIds when selected
  const handleStepSelection = (selectedValues) => {
    setSelectedSteps(selectedValues)
    
    // Add new step IDs to stepsIds (cumulative)
    const newStepIds = selectedValues.filter(id => !stepsIds.includes(id))
    if (newStepIds.length > 0) {
      const updatedStepsIds = [...stepsIds, ...newStepIds]
      setStepsIds(updatedStepsIds)
      // Pass stepsIds to parent component
      if (onStepsIdsChange) {
        onStepsIdsChange(updatedStepsIds)
      }
    }
  }
  // get the steps data
  useEffect(()=>{
    dispatch(getSteps())
  },[])
  // set the steps data
  useEffect(()=>{
    if (getStepsData?.status) {
      setAllSteps(getStepsData?.data?.steps)
    }
  },[getStepsData])
  // set the first step as default
  useEffect(()=>{
    if (allSteps?.length > 0) {
      setSelectedSteps([allSteps[0].id])
    }
  },[allSteps])



  return (
    <>
      {getStepsDataLoading ? <Loading/> : null}
      <div className="bg-white rounded-3xl ">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-black2 leading-[28px]">
            Department development rate
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
        {/* Render a line chart for each selected step */}
        <div className="grid gap-8">
          {selectedData.map(step => (
            <DepartmentLineChart
              key={step.id}
              section={step}
              label={step.label}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default DepartmentDevelopmentRate