import React from 'react'
import HomeHeader from './components/HomeHeader';
import HomeStatistics from './components/home-statistics/HomeStatistics';

const Home2 = () => {
  return (
    <>
    <div className='w-full flex flex-col gap-3'>
      <HomeHeader />
      <HomeStatistics />
    </div>
    </>
  )
}

export default Home2