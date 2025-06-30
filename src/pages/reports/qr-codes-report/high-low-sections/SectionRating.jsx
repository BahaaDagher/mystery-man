import { Rating, styled } from '@mui/material';
import React from 'react'
import { Colors } from '../../../../Theme';
const getBarColor = (rating) => {
    if (rating >= 4) return Colors.green; // green
    if (rating >= 2) return '#facc15'; // yellow
    return Colors.danger; // red
  };
  
  const ProgressBar = ({ rating }) => {
    const color = getBarColor(rating);
    return (
      <div className="w-full h-5 bg-gray-100 rounded-[4px] overflow-hidden">
        <div
          className="h-full rounded-[4px] transition-all duration-300"
          style={{
            width: `${(rating /5) * 100}%`,
            background: color,
          }}
        />
      </div>
    );
  };
  

const SectionRating = ({ title, data }) => (
    <div className="mt-6 w-full">
      {data.map((item) => (
        <div key={item.name} className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium">{item.name}</span>
          </div>
          <ProgressBar rating={item.rating} />
        </div>
      ))}
    </div>
  );

export default SectionRating