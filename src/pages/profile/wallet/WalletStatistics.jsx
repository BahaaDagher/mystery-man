import React from 'react'
import dollarIcon from "../../../assets/icons/dollarIcon.svg"
const WalletStatistics = ({currentBalance  , totalBalance , pending}) => {
  return (
    <div className='flex  w-full border border-main mb-[20px]'>
        <div className='bg-[#fff] rounded-[12px] lg:w-[30%]  px-[10px] py-[16px]  flex justify-between'>
            <div>
                <div className='text-[14px] text-gray2'>Statistics</div>
                <div className='text-[18px] text-black2 font-[700]'>Current Balance</div>
                <div className='text-[44px] text-black2 font-[700]'>{currentBalance} <span className='text-[30px] font-[700]'>SAR</span></div>
            </div>
            <div>
                <img src={dollarIcon} alt="$" />
            </div>
        </div>
        <div className='bg-[#fff] rounded-[12px] lg:w-[70%]  px-[10px] py-[16px] flex justify-between  ml-[20px] '>
            <div className='w-[50%] border border-main'>
                <div className='text-[14px] text-gray2'>Statistics</div>
                <div className='text-[18px] text-black2 font-[700]'>Total Expenses</div>
                <div className='text-[44px] text-black2 font-[700]'>{totalBalance} <span className='text-[30px] font-[700]'>SAR</span></div>
            </div>

            <div className='w-[50%] border border-main'>
                <div className='text-[14px] text-gray2'>Statistics</div>
                <div className='text-[18px] text-black2 font-[700]'>Pending</div>
                <div className='text-[44px] text-black2 font-[700]'>{pending} <span className='text-[30px] font-[700]'>SAR</span></div>
            </div>

        </div>
    </div>
  )
}

export default WalletStatistics