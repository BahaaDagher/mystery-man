import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutComponent = ({ chartData, doughnutSize , content  , options}) => {
    
  return (
    <div className="flex items-center justify-center relative" style={{ width: doughnutSize, height: doughnutSize }}>
      <div className="flex items-center justify-center" style={{ width: doughnutSize, height: doughnutSize }}>
        <Doughnut data={chartData} options={options} width={doughnutSize} height={doughnutSize} />
      </div>
      <div
        className="flex items-center justify-center absolute top-0 left-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      >
        <span
          className="font-bold text-gray-800 rounded-full shadow flex items-center justify-center"
          style={{
            fontSize: `${content.contentFontSize}px`,
            width: `${content.contentDimensions}px`,
            height: `${content.contentDimensions}px`,
            background: 'rgba(255,255,255,0.3)',
            pointerEvents: 'none'
          }}
        >
          {content.value}
        </span>
      </div>
    </div>
  );
};

export default DoughnutComponent; 