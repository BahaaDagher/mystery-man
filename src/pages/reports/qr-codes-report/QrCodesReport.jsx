import React from 'react'
import DoughnutReconnaissance from './doughnut-reconnaissance/DoughnutReconnaissance'
import GeneralRate from './general-rate/GeneralRate'
import ReviewsQualification from './reviews-qualification/ReviewsQualification'
import HighLowSections from './high-low-sections/HighLowSections'
import AverageRating from './average-rating/AverageRating'
import OverAllRating from './over-all-rating/OverAllRating'

const QrCodesReport = () => {
  return (
    <div className='w-full flex flex-col gap-3'>
        <div className='w-full flex flex-col gap-3'>
            <div className='w-full flex justify-between gap-3'>
                <div className='w-[65%] bg-white rounded-[12px] '> <DoughnutReconnaissance /></div>
                <div className='w-[35%] bg-white rounded-[12px] '> <GeneralRate /></div>
            </div>
            <div className='w-full flex justify-between gap-3'>
                <div className='w-[65%] bg-white rounded-[12px] '> <ReviewsQualification /></div>
                <div className='w-[35%] bg-white rounded-[12px] '> <HighLowSections /></div>
            </div>
        </div>
        <div className='w-full flex justify-between gap-3'>
            <AverageRating />
        </div>
        <div className='w-full flex justify-between gap-3'>
            <OverAllRating />
        </div>
    </div>
  )
}

export default QrCodesReport