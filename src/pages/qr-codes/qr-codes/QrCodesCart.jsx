import React from 'react'
import location from '../../../assets/icons/location2.svg'
import deleteIcon from '../../../assets/icons/deleteIcon.svg'
import editIcon from '../../../assets/icons/editIcon.svg'
import showIcon from '../../../assets/icons/ShowIcon.svg'

const QrCodesCart = ({branchName , responseCount , address }) => {
  return (
    <div className='bg-white rounded-[10px] p-[10px] flex flex-col gap-1 w-full'>
        <div className='flex items-center justify-between'>
            <div className='font-medium text-[18px] leading-[21.28px] tracking-[2%] text-second'>{branchName}</div>
            <div className='flex items-center gap-2'>
                <div className='cursor-pointer' onClick={()=>{}}> <img src={deleteIcon} alt="" /></div>
                <div className='cursor-pointer' onClick={()=>{}}> <img src={editIcon} alt="" /></div>
                <div className='cursor-pointer' onClick={()=>{}}> <img src={showIcon} alt="" /></div>
            </div>
        </div>
        <div className='font-bold text-[14px] leading-[21.28px] tracking-[2%]'>{responseCount} response</div>
        <div className='flex items-center gap-2'>
            <div className=''>
                <img src={location} alt="" />
            </div>
            <div className='font-medium text-[16px] leading-[22.4px] text-second'>{address}</div>
        </div>
    </div>
  )
}

export default QrCodesCart