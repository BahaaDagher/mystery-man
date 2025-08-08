import React from 'react';
import { useTranslation } from 'react-i18next';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import Stars from '../../../../assets/icons/Stars.svg';
import SectionRating from './SectionRating';


const BranchRating = () => {
  const { t } = useTranslation();
  
  const branchData = [
    { name: 'Jeddah', rating: 4, count: 51 },
    { name: 'Riyadh', rating: 1, count: 44 },
  ];
  const sectionData = [
    { name: 'Clean', rating: 4, count: 31 },
    { name: 'Food Quality', rating: 1, count: 20},
  ];

  return (
    <div className="bg-white rounded-[12px] p-[20px] border-[10px]  max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-semibold">{t('text.rating')}</span>
        {/* Star icon group */}
        <span >
          <img src={Stars} alt="star" />
        </span>
      </div>
      <hr className="my-4 h-[1px] bg-gray7" />
      {/* Branch Section */}
      <SectionRating title={t('text.branch')} data={branchData} />
      {/* Section Section */}
      <SectionRating title={t('text.section')} data={sectionData} />
    </div>
  );
};

export default BranchRating;