import React, { useState } from 'react'
import CustomSelect from '../../../../components/CustomSelect'
import DepartmentLineChart from './DepartmentLineChart'
import cancelIcon from '../../../../assets/icons/cancel-icon.svg'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
} from 'chart.js'

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Filler)

// New sections array with id (number), nameEn, nameAr
const allSections = [
  { id: 1, nameEn: 'Section 1', nameAr: 'قسم 1' },
  { id: 2, nameEn: 'Section 2', nameAr: 'قسم 2' },
  { id: 3, nameEn: 'Section 3', nameAr: 'قسم 3' },
  { id: 4, nameEn: 'Section 4', nameAr: 'قسم 4' },
  { id: 5, nameEn: 'Section 5', nameAr: 'قسم 5' },
]

// New apiData with sectionId (number) and sectionName
const apiData = [
  {
    sectionId: 1,
    sectionName: 'Section 1',
    data: [
      { month: 'يناير', value: 50 },
      { month: 'مارس', value: 90 },
      { month: 'نوفمبر', value: 35 },
      { month: 'ديسمبر', value: 20 },
      { month: 'يناير', value: 50 },
      { month: 'مارس', value: 90 },
      { month: 'نوفمبر', value: 35 },
    ],
  },
  {
    sectionId: 2,
    sectionName: 'Section 2',
    data: [
      { month: 'فبراير', value: 88 },
      { month: 'ديسمبر', value: 40 },
      { month: 'يناير', value: 30 },
      { month: 'مارس', value: 600 },
      { month: 'نوفمبر', value: 10 },
    ],
  },
  {
    sectionId: 3,
    sectionName: 'Section 3',
    data: [
      { month: 'يونيو', value: 95 },
      { month: 'يوليو', value: 95 },
      { month: 'أغسطس', value: 95 },
      { month: 'سبتمبر', value: 95 },
      { month: 'أكتوبر', value: 95 },
    ],
  },
  {
    sectionId: 4,
    sectionName: 'Section 4',
    data: [
      { month: 'أبريل', value: 60 },
      { month: 'مايو', value: 70 },
    ],
  },
  {
    sectionId: 5,
    sectionName: 'Section 5',
    data: [
      { month: 'سبتمبر', value: 40 },
      { month: 'أكتوبر', value: 80 },
    ],
  },
]

const DepartmentDevelopmentRate = () => {
  // Select the first section by default if available
  const [selectedSections, setSelectedSections] = useState(
    allSections.length > 0 ? [allSections[0].id] : []
  )

  // For CustomSelect, map to {value, label} (value is number)
  const selectOptions = allSections.map(s => ({ value: s.id, label: s.nameEn }))

  // Filter API data for selected sections
  const selectedData = apiData.filter(section => selectedSections.includes(section.sectionId))

  return (
    <div className="bg-white rounded-3xl ">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl font-bold text-black2 leading-[28px]">
          Department development rate
        </span>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <CustomSelect
          options={selectOptions}
          value={selectedSections}
          onChange={setSelectedSections}
          multiple
          placeholder="choose section"
          className="min-w-[200px]"
        />
        {/* Render selected sections as chips with cancel icon */}
        <div className="flex flex-wrap gap-2">
          {selectedSections.map(val => {
            const label = allSections.find(s => s.id === val)?.nameEn || val
            return (
              <span key={val} className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm font-medium">
                {label}
                <span
                  className="ml-2 text-gray-400 hover:text-red-500"
                  onClick={() => setSelectedSections(selectedSections.filter(s => s !== val))}
                  aria-label="Remove section"
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
      {/* Render a line chart for each selected section */}
      <div className="grid gap-8">
        {selectedData.map(section => (
          <DepartmentLineChart
            key={section.sectionId}
            section={section}
            label={section.sectionName}
          />
        ))}
      </div>
    </div>
  )
}

export default DepartmentDevelopmentRate