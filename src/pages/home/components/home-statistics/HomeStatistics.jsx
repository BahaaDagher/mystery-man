import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import StatisticsContainer from './StatisticsContainer'
import monyIcon from '../../../../assets/icons/monyIcon.svg'
import monyIcon2 from '../../../../assets/icons/monyIcon2.svg'
import { Link } from 'react-router-dom'
import { Rating, styled } from '@mui/material'
const BranchRating = styled(Rating)(({ theme }) => ({
  direction : "ltr",
  '& .MuiRating-icon': {
    fontSize: '35px', // increase size
  },
}));
const HomeStatistics = ({ 
  availableMissions , 
  avgReview , 
  currentBalance , 
  reconnaissance 
}) => {
  console.log("availableMissions" , availableMissions)
  const { t } = useTranslation();

  // Font size variables - easy to control
  const fontSize = {
    title: 'text-base sm:text-lg lg:text-[20px]',        // Section titles
    mainNumber: 'text-4xl sm:text-5xl lg:text-6xl xl:text-[60px]',  // Large numbers
    avgNumber: 'text-3xl sm:text-4xl lg:text-5xl xl:text-[50px]',   // Avg review number
    ratingText: 'text-base sm:text-lg lg:text-[20px]',  // Rating description text
    small: 'text-[10px]',                               // Small text
    medium: 'text-[20px]'                               // Medium text
  };

  // Convert avgReview to number and handle rating text
  const avgRate =  parseFloat(avgReview) || 0;
   
  // Function to get rating text and color based on rating value
  const getRatingInfo = (rating) => {
    if (rating >= 4.5) return { text: t('text.excellent'), color: 'text-green' };
    if (rating >= 4.0) return { text: t('text.good'), color: 'text-main' };
    if (rating >= 3.0) return { text: t('text.normal'), color: 'text-orange' };
     return { text: t('text.bad'), color: 'text-red' };
  };



  return (
    <div className='w-full flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4'>
      <StatisticsContainer className=''>
        <div className={`font-[600] ${fontSize.title} text-black3`}>{t('text.available_missions')}</div>
        <div className='flex items-center justify-center gap-1 mt-0 sm:mt-[20%]'>
          <div className={`font-bold ${fontSize.mainNumber} tracking-[1.92px] text-black4`}>{availableMissions}</div>
        </div>
        {/* <Link to="/userDashboard/missions/newMission" className="text-green  m-2">
          + {t('text.add_more')}
        </Link> */}
        {/* <div className="w-full flex justify-center ">
          <div className="flex w-[90%]  rounded-full border border-gray5 p-[3px]">
            <div className="flex w-full h-[27px] rounded-full border-4 border-gray5 overflow-hidden bg-gray5">
              <div className="bg-main h-full w-[75%]" />
              <div className="h-full flex-1" />
            </div>
          </div>
        </div> */}
        {/* <div className="font-medium text-[10px] tracking-[1.92px] text-gray6 ">
          {t('text.last_purchase')}
        </div> */}
      </StatisticsContainer>

      <StatisticsContainer className=''>
         <div className={`font-[600] ${fontSize.title} text-black3`}>{t('text.current_balance')}</div>
        <div className='flex items-center justify-center gap-1 mt-0 sm:mt-[20%]'>
          <img src={monyIcon} alt="" />
          <div className={`font-bold ${fontSize.mainNumber} tracking-[1.92px] text-black4`}>{currentBalance}</div>
        </div>
        

        {/* <div className='w-full'>
          <div className='text-gray6 tracking-[1.92px] text-[10px] font-medium'> {t('text.last_transaction')}</div>
          <div className='flex items-center gap-3 text-[20px] text-green'>
            <div className='flex items-center gap-1'>
              <img src={monyIcon2} alt="" />
              <div>+110</div>
            </div>
            <div>02 Feb, 2025</div>
          </div>
        </div> */}
      </StatisticsContainer>

      <StatisticsContainer className=''>
        <div className={`font-[600] ${fontSize.title} mb-[10px]`}>{t('text.avg_review')}</div>
        <div className={`font-bold ${fontSize.avgNumber} tracking-[1.92px] text-black4`}>{avgReview}</div>
        {
          avgRate > 0 && (
            <BranchRating name="half-rating" defaultValue={avgRate} precision={0.5} readOnly />
          )
        }
       
        <div className={`font-bold ${fontSize.ratingText} leading-[140%] ${getRatingInfo(avgRate).color} mt-[2%]`}>
          ( {getRatingInfo(avgRate).text} )
        </div>
      </StatisticsContainer>

      <StatisticsContainer className=''>
        <div className={`font-[600] ${fontSize.title} text-black3`}>{t('text.reconnaissance')}</div>
        <div className='flex items-center justify-center gap-1 mt-0 sm:mt-[20%]'>
          <div className={`font-bold ${fontSize.mainNumber} tracking-[1.92px] text-black4`}>{reconnaissance}</div>
        </div>
      </StatisticsContainer>
    </div>
  )
}

export default HomeStatistics