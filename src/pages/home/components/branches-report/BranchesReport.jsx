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
import { Colors } from '../../../../Theme';

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
        borderColor: Colors.main6,
        backgroundColor: 'rgba(37,99,235,0.07)',
        pointBackgroundColor: '#fff',
        pointBorderColor: Colors.main6,
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
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        formatter: (value) => {
          // Only show labels for non-zero values
          return value > 0 ? value : '';
        },
        font: {
          weight: 'bold',
          size: 12,
        },
        color: Colors.main6,
        offset: 5,
        padding: {
          top: 6,
          bottom: 0,
          left: 10,
          right: 10
        },
        textAlign: 'center'
      },
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
    },
    // Adding layout padding to prevent data labels from being cut off at the top
    layout: {
      padding: {
        top: 30,
        bottom: 0,
        left: 0,
        right: 0
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