import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Filler);

const missionsData = [
    ['فرع الرياض الشمالي', 18],
    ['فرع المدينة الغربية', 27],
    ['فرع جدة المركزي', 33],
    ['فرع الدمام الشرقي', 12],
    ['فرع مكة الجنوبي', 24],
    ['فرع الطائف الجديد', 30],
    ['فرع أبها', 15],
    ['فرع الخبر', 29],
    ['فرع القصيم', 21],
    ['فرع تبوك', 36],
    ['فرع حائل', 17],
    ['فرع نجران', 25],
    ['فرع الجوف', 19],
    ['فرع الباحة', 23],
    ['فرع ينبع', 28],
    ['فرع عرعر', 31],
    ['فرع سكاكا', 20],
    ['فرع بيشة', 26],
    ['فرع الخرج', 22],
    ['فرع الزلفي', 100],
  ];
  

  const rateData = [
    ['فرع الرياض الشمالي', 1.5],
    ['فرع المدينة الغربية', 2.3],
    ['فرع جدة المركزي', 2.9],
    ['فرع الدمام الشرقي', 3.4],
    ['فرع مكة الجنوبي', 3.8],
    ['فرع الطائف الجديد', 4.0],
    ['فرع أبها', 4.3],
    ['فرع الخبر', 4.6],
    ['فرع القصيم', 4.8],
    ['فرع تبوك', 5.0],
    ['فرع حائل', 3.6],
    ['فرع نجران', 2.7],
    ['فرع الجوف', 3.1],
    ['فرع الباحة', 4.1],
    ['فرع ينبع', 2.5],
    ['فرع عرعر', 3.9],
    ['فرع سكاكا', 4.4],
    ['فرع بيشة', 3.0],
    ['فرع الخرج', 2.2],
    ['فرع الزلفي', 3.3],
  ];
  

const BranchesReport = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState('missions');

  const lang = localStorage.getItem('language');
  const isArabic = lang === 'ar';

  // Choose data based on selection
  const dataArray = selected === 'missions' ? missionsData : rateData;
  const labels = dataArray.map(item => item[0]);
  const dataValues = dataArray.map(item => item[1]);

  const data = {
    labels,
    datasets: [
      {
        label: selected === 'missions' ? t('text.missions') : t('text.rate'),
        data: dataValues,
        fill: true,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37,99,235,0.07)',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#2563eb',
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4,
      },
    ],
  };

  const isRate = selected === 'rate';

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.parsed.y;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#e5e7eb' },
        position: isArabic ? 'right' : 'left',
        ticks: {
          stepSize: isRate ? 1 : 10,
          max: isRate ? 5 : undefined
        },
        max: isRate ? 5 : undefined
      },
      x: {
        grid: { display: false },
        
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border-[10px] border-[#F22E2E] max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl font-semibold">{t('text.branches_report')}</span>
        <select
          className="border rounded-lg px-3 py-1 text-gray-700"
          value={selected}
          onChange={e => setSelected(e.target.value)}
        >
          <option value="missions">{t('text.missions')}</option>
          <option value="rate">{t('text.rate')}</option>
        </select>
      </div>
      <Line data={data} options={options} height={170} />
    </div>
  );
};

export default BranchesReport;