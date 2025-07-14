import React, { useState } from 'react'
import { t } from 'i18next';
import QuestionsTypes from '../../questionnaires/QuestionsTypes';
import plusSign from '../../../assets/icons/plusSign.svg'

const NewQrCode = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [chosenType, setChosenType] = useState(null);
  const showTypes = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <div className='w-full flex flex-col gap-4'>
    <div className='flex items-center gap-2'>
        <div className='font-normal text-[14px] leading-[14px] tracking-[0.28px] text-gray_l'> Qr Codes /</div>
        <div className='font-normal text-[14px] leading-[14px] tracking-[0.28px] text-main'> New Qr Code</div> 
    </div>
      <QuestionsTypes setAnchorEl={setAnchorEl} anchorEl={anchorEl} setChosenType={setChosenType} />
      <div className="flex  items-center  justify-between gap-4 w-full ">
        <div className="bg-main py-3 px-4 rounded-[10px] w-full flex items-center">
          <input
            placeholder="Title"
            className="bg-transparent w-full text-white  border-b border-white border-t-0 border-l-0 border-r-0 p-2 me-4 outline-none text-xl placeholder-white"

            // onChange={(e) => handleQuestioneirTitle(e.target.value)}
          />
          <div
            onClick={showTypes}
            className="flex items-center justify-center gap-2 bg-white p-2 rounded-[10px] cursor-pointer  w-[200px]"
          >
            <img src={plusSign} alt="plus"  />
            <div className="text-[18px] font-medium text-center">{t('text.Add_Question')}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <div
            onClick={() => {}}
            className="flex items-center justify-center  px-4 py-4 rounded-[10px]  text-white cursor-pointer bg-green"
          >
            {t('text.Save')}
          </div>
          <div
            onClick={() => {}}
           className="flex items-center justify-center  px-4 py-4 rounded-[10px]  text-white cursor-pointer bg-red"
          >
            {t('text.Cancel')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewQrCode;