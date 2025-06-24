import React from 'react'

const StatisticsContainer = ({ children, className = '' }) => {
  return (
    <div className={` bg-white rounded-[20px] px-3 py-4 w-[25%] flex flex-col items-center justify-between ${className}`}>
      {children}
    </div>
  )
}

export default StatisticsContainer
