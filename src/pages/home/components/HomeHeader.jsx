import React from 'react'
import DateRangePickerComponent from '../../../components/DateRangePickerComponent';
import PrintIcon from '../../../assets/icons/PrintIcon.svg';
import { Rating, styled } from '@mui/material';
const BranchRating = styled(Rating)(({ theme }) => ({
  direction : "ltr"
}));
const HomeHeader = () => {
  return (
    <div className='w-full flex justify-between items-center'>
      <div className='flex '>
          <div>Overview</div>
          <BranchRating name="half-rating" defaultValue={4} precision={0.5} readOnly />
          <div className='text-green'>( Excellent )</div>
      </div>
      <div className='flex items-center justify-center gap-2 '>
        <div className='bg-main p-[8px] rounded-[5px] cursor-pointer flex items-center justify-center '> 
          <img src={PrintIcon} alt=""  />
        </div>
        <DateRangePickerComponent />
      </div>
    </div>
  )
}

export default HomeHeader