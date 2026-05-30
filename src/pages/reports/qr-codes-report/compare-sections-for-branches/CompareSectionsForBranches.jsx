import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import DepartmentBarChart from './DepartmentBarChart'
import cancelIcon from '../../../../assets/icons/cancel-icon.svg'
import CustomSelect from '../../../../components/CustomSelect'
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
  const { t } = useTranslation();

  const [appliedSteps, setAppliedSteps] = useState(
    allSteps?.length > 0 ? [allSteps[0].id] : []
  )
  const [pendingSteps, setPendingSteps] = useState(
    allSteps?.length > 0 ? [allSteps[0].id] : []
  )

  const selectOptions = allSteps?.map(step => ({ value: step.id, label: step.name })) || []

  const selectedData = apiData?.filter(step => appliedSteps.includes(step.step_id)) || []

  const hasPendingChanges =
    [...pendingSteps].sort().join(',') !== [...appliedSteps].sort().join(',')

  const handleApply = () => {
    const nextApplied =
      pendingSteps.length > 0
        ? pendingSteps
        : allSteps?.[0]?.id
          ? [allSteps[0].id]
          : []

    setAppliedSteps(nextApplied)
    setPendingSteps(nextApplied)

    if (onStepsIdsChangeFromMoreThanBranch) {
      onStepsIdsChangeFromMoreThanBranch(nextApplied)
    }
  }

  useEffect(() => {
    if (allSteps?.length > 0) {
      const defaultSelection = [allSteps[0].id]
      setAppliedSteps(defaultSelection)
      setPendingSteps(defaultSelection)
    }
  }, [allSteps])

  return (
    <>
      <div className="bg-white rounded-3xl p-6 ">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-black2 leading-[28px]">
            {t('text.compare_sections_branches')}
          </span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <CustomSelect
            options={selectOptions}
            value={pendingSteps}
            onChange={setPendingSteps}
            multiple
            showSelectAll
            onOk={handleApply}
            okDisabled={!hasPendingChanges || pendingSteps.length === 0}
            placeholder={t('text.choose_step')}
            className="min-w-[200px]"
          />
          {/* Render selected steps as chips with cancel icon */}
          <div className="flex flex-wrap gap-2">
            {pendingSteps.map(val => {
              const label = allSteps?.find(step => step.id === val)?.name || val
              return (
                <span key={val} className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm font-medium">
                  {label}
                  <span
                    className="ml-2 text-gray-400 hover:text-red-500"
                    onClick={() => setPendingSteps(pendingSteps.filter(s => s !== val))}
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
