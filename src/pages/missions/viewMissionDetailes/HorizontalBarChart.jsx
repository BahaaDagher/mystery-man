import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Colors } from '../../../Theme';
import { getColorBasedOnPercentage } from '../../../utils/colorPercentageUtils';
import { useTranslation } from 'react-i18next';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const HorizontalBarChart = ({ steps, profileData }) => {
  const { t } = useTranslation();

  const chartData = {
    labels: steps?.map(step => step.name) || [],
    datasets: [
      {
        // label: t('text.Rate'),
        data: steps?.map(step => parseFloat(step.rate?.replace(',', '.') || 0)) || [],
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
          gradient.addColorStop(0, Colors.main);
          gradient.addColorStop(1, '#0F4CE840');
          return gradient;
        },
        borderRadius: 0,
        barThickness: 50,
      },
    ],
  };

  const chartOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      datalabels: {
        anchor: 'end',
        align: 'right',
        offset:70,
        clip: false,
        formatter: (value) => value + '%',
        font: {
          weight: 'bold',
          size: 20,
          family: "'Tajawal', sans-serif"
        },
        color: (context) => {
          const value = context.dataset.data[context.dataIndex];
          return getColorBasedOnPercentage(value, profileData);
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        grid: { color: 'transparent' },
        ticks: {
          color: '#000',
          font: { family: "'Tajawal', sans-serif", size: 12 }
        },
      },
      y: {
        grid: { display: false },
        ticks: {
          color: '#000',
          font: {
            family: "'Tajawal', sans-serif",
            size: 12,
            weight: 'bold'
          },
        },
      },
    },
    layout: {
      padding: {
        right: 90,
        left : 170
      }
    }
  };

  return (
    <div style={{ width: '100%', marginTop: '40px'}}>
      <Bar data={chartData} options={chartOptions} height={(steps?.length || 4) * 80} />
    </div>
  );
};

export default HorizontalBarChart;
