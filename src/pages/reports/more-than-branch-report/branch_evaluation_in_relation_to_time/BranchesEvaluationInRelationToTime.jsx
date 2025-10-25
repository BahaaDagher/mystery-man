import React from 'react'
import { useTranslation } from 'react-i18next';
import LineChartComponent from '../../../../components/LineChartComponent'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Colors } from '../../../../Theme';

const BranchesEvaluationInRelationToTime = ({apiData}) => {
  const { t } = useTranslation();
  
  // Extract all unique months from the API data
  const allMonths = [...new Set(apiData?.flatMap(branch => 
    branch.chart.map(item => item.month)
  ))];

  // Prepare labels (months) from the actual data
  const labels = allMonths;

  // Prepare datasets for each branch
  const datasets = apiData?.map((branch, index) => {
    // Create an array of values for each month
    const values = allMonths.map(month => {
      const monthData = branch.chart.find(item => item.month === month);
      return monthData ? monthData.value : 0;
    });

    // Generate a unique color for each branch
    const colors = [
      Colors.main6, "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", 
      "#9966FF", "#FF9F40", "#8AC926", "#1982C4", "#6A4C93"
    ];
    
    return {
      label: branch.branch_name,
      data: values,
      fill: true, // Enable filling for stacked area chart
      borderColor: colors[index % colors.length], 
      backgroundColor: 'transparent', // Add transparency
      pointBackgroundColor: 'transparent', // Remove point fill color
      pointBorderColor: 'transparent', // Remove point border color
      pointRadius: 7,
      pointHoverRadius: 7,
      tension: 0,
      spanGaps: true,
    };
  }) || [];

  const chartData = {
    labels,
    datasets,
  };

  const lang = localStorage.getItem("language");
  const isArabic = lang === "ar";

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
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
          bottom: 6,
          left: 10,
          right: 10
        },
        textAlign: 'center'
      },
    },
    scales: {
      y: {
        stacked: true, // Enable stacking on Y axis
        beginAtZero: true,
        grid: { color: "#e5e7eb" },
        position: isArabic ? "right" : "left",
        ticks: {
          max: undefined,
        },
        max: undefined,
      },
      x: {
        stacked: true, // Enable stacking on X axis
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
      title={t('text.branches_evaluation_in_relation_to_time')}
      chartData={chartData}
      chartOptions={chartOptions} 
      height={100}
    />
  )
}

export default BranchesEvaluationInRelationToTime