import { Rating, styled } from '@mui/material';
import React from 'react'
import DateRangePickerComponent from '../../components/DateRangePickerComponent';
const BranchRating = styled(Rating)(({ theme }) => ({
  direction : "ltr"
}));
const Home2 = () => {
  return (
    <>
    <div className='w-full flex justify-between items-center'>
      <div className='flex '>
          <div>Overview</div>
          <BranchRating name="half-rating" defaultValue={4} precision={0.5} readOnly />
          <div className='text-green'>( Excellent )</div>
      </div>
      <DateRangePickerComponent />
    </div>
    </>
  )
}

export default Home2