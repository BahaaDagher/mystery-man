import React from 'react'
import DoughnutReconnaissance from './doughnut-reconnaissance/DoughnutReconnaissance'
import GeneralRate from './general-rate/GeneralRate'
import ReviewsQualification from './reviews-qualification/ReviewsQualification'
import HighLowSections from './high-low-sections/HighLowSections'
import AverageRating from './average-rating/AverageRating'
import OverAllRating from './over-all-rating/OverAllRating'

const QrCodesReport = ({qrCodeData}) => {
    console.log("qrCodeData",qrCodeData)
  return (
    <div className='w-full flex flex-col gap-3'>
        <div className='w-full flex flex-col gap-3 pdf-section'>
            <div className='w-full flex flex-col lg:flex-row justify-between gap-3'>
                <div className='w-full lg:w-[65%] bg-white rounded-[12px] '> <DoughnutReconnaissance apiData={qrCodeData?.getReconnaissanceData}/></div>
                <div className='w-full lg:w-[35%] bg-white rounded-[12px] '> <GeneralRate apiData={qrCodeData?.generalRate?.chart}/></div>
            </div>
            <div className='w-full flex flex-col lg:flex-row justify-between gap-3'>
                <div className='w-full lg:w-[65%] bg-white rounded-[12px] '> <ReviewsQualification apiData={qrCodeData?.reviewQualification}/></div>
                <div className='w-full lg:w-[35%] bg-white rounded-[12px] '> <HighLowSections apiData={qrCodeData?.topAndBottomSections}/></div>
            </div>
        </div>
        <div className='w-full flex justify-between gap-3 pdf-section'>
            <AverageRating apiData={qrCodeData?.averagePerSection} />
        </div>
        <div className='w-full flex justify-between gap-3 pdf-section'>
            <OverAllRating apiData={qrCodeData?.qrCodesOverallRating} />
        </div>
    </div>
  )
}

export default QrCodesReport