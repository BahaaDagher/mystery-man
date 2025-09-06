import React, { useState, useEffect } from 'react';
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





const BranchesReport = ({ missions = [] }) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState('missions');
  const [chartHeight, setChartHeight] = useState(170);

  // Set responsive height based on screen size
  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth >= 1024) {
        setChartHeight(170); // Desktop (lg and above)
      } else {
        setChartHeight(300); // All screens below lg
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const lang = localStorage.getItem('language');
  const isArabic = lang === 'ar';

  // Transform API data for chart
  const transformMissionsData = () => {
    if (!missions || missions.length === 0) return [];
    return missions.map(mission => [mission.name, mission.countMissions]);
  };

  const transformRateData = () => {
    if (!missions || missions.length === 0) return [];
    return missions.map(mission => [mission.name, parseFloat(mission.rate) || 0]);
  };

  // Choose data based on selection
  const dataArray = selected === 'missions' ? transformMissionsData() : transformRateData();
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
    <div className="bg-white rounded-3xl p-[20px] border-[10px] border-[#F22E2E] ">
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
      <Line data={data} options={options} height={chartHeight} />
    </div>
  );
};

export default BranchesReport;