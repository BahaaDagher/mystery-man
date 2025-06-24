import React from 'react'
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
const HomeStatistics = () => {

  return (
    <div className='w-full flex gap-2'>
      <StatisticsContainer className=''>
        <div className='font-[600] text-[20px] text-black3'>AvailableMissions</div>
        <div className="font-extrabold text-[96px] tracking-[1.92px] text-black4">10</div>
        <Link to="/userDashboard/missions/newMission" className="text-green  m-2">
          + addMore
        </Link>
        <div className="w-full flex justify-center ">
          <div className="flex w-[90%]  rounded-full border border-gray5 p-[3px]">
            <div className="flex w-full h-[27px] rounded-full border-4 border-gray5 overflow-hidden bg-gray5">
              <div className="bg-main h-full w-[75%]" />
              <div className="h-full flex-1" />
            </div>
          </div>
        </div>
        <div className="font-medium text-[10px] tracking-[1.92px] text-gray6 ">
          LastPurchase 25 Missions
        </div>
      </StatisticsContainer>

      <StatisticsContainer className=''>
        <div className='font-[600] text-[20px] '>CurrentBalance</div>
        <div className='flex items-center justify-center gap-1'>
          <img src={monyIcon} alt="" />
        <div className="font-extrabold text-[64px] tracking-[1.92px] text-black4">230</div>
        </div>
        <div className='w-full'>
          <div className='text-gray6 tracking-[1.92px] text-[10px] font-medium'> lastTransaction</div>
          <div className='flex items-center gap-3 text-[20px] text-green'>
            <div className='flex items-center gap-1'>
              <img src={monyIcon2} alt="" />
              <div>+110</div>
            </div>
            <div>02 Feb, 2025</div>
          </div>
        </div>
      </StatisticsContainer>

      <StatisticsContainer className=''>
        <div className='font-[600] text-[20px] '>AvgReview</div>
        <div className="font-extrabold text-[70px] tracking-[1.92px] text-black4">4.7</div>
        <BranchRating name="half-rating" defaultValue={4.7} precision={0.5} readOnly />
        <div className="font-bold text-green text-[20px] leading-[140%] ">
          ( Excellent )
        </div>
      </StatisticsContainer>
      <StatisticsContainer className=''>
        <div className='font-[600] text-[20px] text-black3'>Reconnaissance</div>
        <div className="font-extrabold text-[130px] tracking-[1.92px] text-black4">210</div>
       
      </StatisticsContainer>
    </div>
  )
}

export default HomeStatistics