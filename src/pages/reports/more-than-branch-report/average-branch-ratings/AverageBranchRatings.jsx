import React from 'react'
import { useTranslation } from 'react-i18next';
import LineChartComponent from '../../../../components/LineChartComponent';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Colors } from '../../../../Theme';

const AverageBranchRatings = ({apiData}) => {
  const { t } = useTranslation();
  
  // Transform apiData to match the expected format for the chart
  const transformedData = apiData?.map(item => [
    `${item.month} ${item.year}`, 
    item.average_rating
  ]) || []

  const labels = transformedData.map(item => item[0]);
  const dataValues = transformedData.map(item => item[1]);

  const chartData = {
    labels,
    datasets: [
      {
        label: t('text.sections'),
        data: dataValues,
        fill: true,
        borderColor: Colors.main6, 
        backgroundColor: "transparent",
        pointBackgroundColor: "#fff",
        pointBorderColor: Colors.main6,
        pointRadius: 7,
        pointHoverRadius: 7,
        tension: 0,
      },
    ],
  };

  const lang = localStorage.getItem("language");
  const isArabic = lang === "ar";

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.parsed.y;
          },
        },
      },
      // Enhanced datalabels plugin configuration without background
      datalabels: {
        anchor: 'end',
        align: 'top',
        formatter: (value) => value,
        font: {
          weight: 'bold',
          size: 12,
        },
        color: Colors.main6,
        offset: 5,
        padding: {
          top: 6,
          bottom: 6,
          left: 10,
          right: 10
        },
        textAlign: 'center'
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "#e5e7eb" },
        position: isArabic ? "right" : "left",
        ticks: {
          max: undefined,
        },
        max: undefined,
      },
      x: {
        grid: { display: false },
      },
    },
    // Add padding at the top to accommodate data labels
    layout: {
      padding: {
        top: 30
      }
    }
  };

  return (
    <LineChartComponent
      title={t('text.average_branch_ratings')}
      chartData={chartData}
      chartOptions={chartOptions} 
      height={200}
    />
  )
}

export default AverageBranchRatings