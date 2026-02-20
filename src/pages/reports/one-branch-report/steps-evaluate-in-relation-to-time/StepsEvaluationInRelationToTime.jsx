import React from 'react'
import { useTranslation } from 'react-i18next';
import LineChartComponent from '../../../../components/LineChartComponent'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Colors } from '../../../../Theme';

const StepsEvaluationInRelationToTime = ({apiData}) => {
  const { t } = useTranslation();
  
  // Extract all unique time periods from the API data
  const allTimePeriods = [...new Set(apiData?.steps?.flatMap(step => 
    step.chart.map(item => item.month)
  ))];

  // Prepare labels (time periods) from the actual data
  const labels = allTimePeriods || [];

  // Prepare datasets for each step
  const datasets = apiData?.steps?.map((step, index) => {
    // Create an array of values for each time period
    const values = allTimePeriods.map(timePeriod => {
      const periodData = step.chart.find(item => item.month === timePeriod);
      return periodData ? periodData.average_rating : 0;
    });

    // Generate a unique color for each step
    const colors = [
      Colors.main6, "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", 
      "#9966FF", "#FF9F40", "#8AC926", "#1982C4", "#6A4C93"
    ];
    
    return {
      label: step.step_name,
      data: values,
      fill: true, // Enable filling for stacked area chart
      borderColor: 'transparent', // Remove border line
      backgroundColor: colors[index % colors.length] + 'cc', // Add transparency
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
        align: 'bottom', // Changed from 'top' to 'bottom'
        formatter: (value) => {
          // Only show labels for non-zero values
          return value > 0 ? value : '';
        },
        font: {
          weight: 'bold',
          size: 12,
        },
        color: '#fff',
        offset: 5,
        // Dynamic background color that matches the segment color, but don't return anything if value is 0
        backgroundColor: (context) => {
          if (context.dataset.data[context.dataIndex] === 0) {
            return undefined;
          }
          return context.dataset.backgroundColor;
        },
        borderRadius: 4,
        borderWidth: 0,
        padding: {
          top: 2,
          bottom: 2,
          left: 4,
          right: 4
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

  // Don't render if there's no data
  if (!apiData || !apiData.steps || apiData.steps.length === 0) {
    return null;
  }

  return (
    <LineChartComponent
      title={t('text.steps_evaluation_in_relation_to_time')}
      chartData={chartData}
      chartOptions={chartOptions} 
      height={100}
    />
  )
}

export default StepsEvaluationInRelationToTime