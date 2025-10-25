import React from 'react'
import { useTranslation } from 'react-i18next';
import LineChartComponent from '../../../../components/LineChartComponent'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Colors } from '../../../../Theme';

const BranchEvaluationInRelationToTime = ({apiData}) => {
  const { t } = useTranslation();
  
  // Transform apiData to match the expected format for the chart
  // Extract all unique months from the data
  const allMonths = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Prepare labels (months)
  const labels = allMonths;

  // Prepare datasets for each branch
  const datasets = apiData?.map((branch, index) => {
    // Create an array of values for each month
    const values = allMonths.map(month => {
      const monthData = branch.chart.find(item => item.month === month);
      return monthData ? monthData.value : 0;
    });

    // Generate a unique color for each branch (you might want to use a more sophisticated color scheme)
    const colors = [
      Colors.main6, "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", 
      "#9966FF", "#FF9F40", "#8AC926", "#1982C4", "#6A4C93"
    ];
    
    return {
      label: branch.branch_name,
      data: values,
      fill: true,
      borderColor: colors[index % colors.length], 
      backgroundColor: "transparent",
      pointBackgroundColor: "#fff",
      pointBorderColor: colors[index % colors.length],
      pointRadius: 7,
      pointHoverRadius: 7,
      tension: 0,
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
      title={t('text.branch_evaluation_in_relation_to_time')}
      chartData={chartData}
      chartOptions={chartOptions} 
      height={100}
    />
  )
}

export default BranchEvaluationInRelationToTime