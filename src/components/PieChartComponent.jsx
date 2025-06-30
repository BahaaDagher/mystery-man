import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChartComponent = ({ chartData, options, size = 220, children }) => {
  return (
    <div className="flex items-center justify-center relative" style={{ width: size, height: size }}>
      <Pie data={chartData} options={options} width={size} height={size} />
      {children && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
          {children}
        </div>
      )}
    </div>
  );
};

export default PieChartComponent; 