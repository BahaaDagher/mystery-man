import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Colors } from '../../../../Theme';

const DepartmentBarChart = ({ section, label ,height}) => {
  // Function to determine color based on percentage value
  const getColorBasedOnPercentage = (percentage) => {
    if (percentage >= 70) {
      return Colors.green; // green
    } else if (percentage >= 40) {
      return Colors.gold2; // gold
    } else {
      return Colors.red; // red
    }
  };

  const ratingData = section.branches.map(d => d.average_rating);
  
  const data = {
    labels: section.branches.map(d => d.branch_name),
    datasets: [
      {
        label: section.step_name,
        data: ratingData,
        backgroundColor: ratingData.map(value => getColorBasedOnPercentage(value)),
        hoverBackgroundColor: ratingData.map(value => getColorBasedOnPercentage(value)),
        borderRadius: 5,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
      },
    ],
  }
  const lang = localStorage.getItem("language");
  const isArabic = lang === "ar";

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { 
        enabled: true,
        callbacks: {
          label: function(context) {
            const branch = section.branches[context.dataIndex];
            return [
              `${branch.branch_name}: ${branch.average_rating}%`,
              `Count: ${branch.count}`,
              `Percentage: ${branch.percentage}%`
            ];
          }
        }
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#585151', font: { size: 12 } },
      },
      y: {
        position: isArabic ? 'right' : 'left',
        beginAtZero: true,
        grid: { color: '#F0F0F0' },
        ticks: { 
          color: "#A5A5A5", 
          font: { size: 14 },
          callback: function(value) {
            return value + '%';
          }
        },
      },
    },
  };
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="mb-2 text-lg font-semibold text-black2">{label}</div>
      <Bar data={data} options={options} height={height} />
    </div>
  )
}

export default DepartmentBarChart