import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  ChartDataLabels
);

// Plugin that draws text directly in the center of the doughnut canvas
// This is print-safe because it's part of the canvas itself, not an overlay HTML element
const centerTextPlugin = {
  id: 'centerText',
  afterDraw(chart) {
    const { content } = chart.config.options._centerText || {};
    if (!content) return;

    const { ctx, chartArea } = chart;
    const centerX = (chartArea.left + chartArea.right) / 2;
    const centerY = (chartArea.top + chartArea.bottom) / 2;

    ctx.save();
    ctx.font = `bold ${content.contentFontSize || 20}px ${content.fontFamily || 'Tajawal, sans-serif'}`;
    ctx.fillStyle = content.color || '#1f2937';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(content.value ?? '', centerX, centerY);
    ctx.restore();
  },
};

ChartJS.register(centerTextPlugin);

const DoughnutComponent = ({ chartData, doughnutSize , content  , options}) => {
    
  const mergedOptions = {
    ...options,
    _centerText: { content },
  };

  return (
    <div className="flex items-center justify-center" style={{ width: doughnutSize, height: doughnutSize }}>
      <Doughnut data={chartData} options={mergedOptions} width={doughnutSize} height={doughnutSize} />
    </div>
  );
};

export default DoughnutComponent;
