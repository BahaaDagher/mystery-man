import React from 'react';
import { useTranslation } from 'react-i18next';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import Stars from '../../../../assets/icons/Stars.svg';
import SectionRating from './SectionRating';


const BranchRating = ({ rating }) => {
  const { t } = useTranslation();
  
  // Transform API data for branches
  const transformBranchData = () => {
    if (!rating?.branches || rating.branches.length === 0) {
      return [
        { name: 'Jeddah', rating: 4, count: 51 },
        { name: 'Riyadh', rating: 1, count: 44 },
      ];
    }
    
    const branchData = rating.branches[0]; // Get first item from array
    return [
      { 
        name: branchData.first?.name || 'N/A', 
        rating: parseFloat(branchData.first?.rate) || 0, 
        count: branchData.first?.countRate || 0 
      },
      { 
        name: branchData.last?.name || 'N/A', 
        rating: parseFloat(branchData.last?.rate) || 0, 
        count: branchData.last?.countRate || 0 
      }
    ];
  };

  // Transform API data for steps
  const transformStepData = () => {
    if (!rating?.steps || rating.steps.length === 0) {
      return [
        { name: 'Clean', rating: 4, count: 31 },
        { name: 'Food Quality', rating: 1, count: 20},
      ];
    }
    
    const stepData = rating.steps[0]; // Get first item from array
    return [
      { 
        name: stepData.first?.step_name || 'N/A', 
        rating: stepData.first?.average_rating || 0, 
        count: 0 // API doesn't provide count for steps
      },
      { 
        name: stepData.last?.step_name || 'N/A', 
        rating: stepData.last?.average_rating || 0, 
        count: 0 // API doesn't provide count for steps
      }
    ];
  };

  const branchData = transformBranchData();
  const sectionData = transformStepData();

  return (
    <div className="bg-white rounded-[12px] p-[20px] border-[10px]   mx-auto">
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