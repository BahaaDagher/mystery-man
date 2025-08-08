import React from 'react'
import { useTranslation } from 'react-i18next'
import dollarIcon from "../../../assets/icons/dollarIcon.svg"

const WalletStatistics = ({currentBalance  , totalBalance , pending}) => {
  const { t } = useTranslation()

  return (
    <div className='flex  w-full  mb-[20px] gap-[10px]'>
        <div className='bg-[#fff] rounded-[12px] lg:w-[30%]  px-[10px] py-[16px]  flex justify-between'>
            <div>
                <div className='text-[14px] text-gray2'>{t('text.statistics')}</div>
                <div className='text-[18px] text-black2 font-[700]'>{t('text.current_balance')}</div>
                <div className='text-[44px] text-black2 font-[700]'>{currentBalance} <span className='text-[25px] font-[700]'>{t('text.SAR')}</span></div>
            </div>
            <div>
                <img src={dollarIcon} alt="$" />
            </div>
        </div>
        {/* <div className='bg-[#fff] rounded-[12px] lg:w-[70%]  px-[10px] py-[16px] flex justify-between  ml-[20px] '>
            <div className='w-[50%] '>
                <div className='text-[14px] text-gray2'>{t('text.statistics')}</div>
                <div className='text-[18px] text-black2 font-[700]'>{t('text.total_expenses')}</div>
                <div className='text-[44px] text-black2 font-[700]'>{totalBalance} <span className='text-[30px] font-[700]'>{t('text.SAR')}</span></div>
            </div>

            <div className='w-[50%] '>
                <div className='text-[14px] text-gray2'>{t('text.statistics')}</div>
                <div className='text-[18px] text-black2 font-[700]'>{t('text.pending')}</div>
                <div className='text-[44px] text-black2 font-[700]'>{pending} <span className='text-[30px] font-[700]'>{t('text.SAR')}</span></div>
            </div>

        </div> */}
    </div>
  )
}

export default WalletStatistics