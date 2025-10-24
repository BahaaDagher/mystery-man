import React from 'react'
import { Bar } from 'react-chartjs-2'
import { useSelector } from 'react-redux';
import { getColorPercentages } from '../../../../utils/colorPercentageUtils';
import { Colors } from '../../../../Theme';

const DepartmentBarChart = ({ section, label ,height}) => {
  // Get profile data from Redux state
  const profileData = useSelector(state => state.profileData.getProfileData);
  
  // Get dynamic color percentages
  const { greenPercentage, goldPercentage } = getColorPercentages(profileData);

  // Function to determine color based on percentage value using dynamic thresholds
  const getColorBasedOnPercentage = (percentage) => {
    if (percentage >= greenPercentage) {
      return Colors.green; // green
    } else if (percentage >= goldPercentage) {
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
      // Enhanced datalabels plugin configuration without background
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
        color: '#000',
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
    // Add padding at the top to accommodate data labels
    layout: {
      padding: {
        top: 30
      }
    }
  };
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="mb-2 text-lg font-semibold text-black2">{label}</div>
      <Bar data={data} options={options} height={height} />
    </div>
  )
}

export default DepartmentBarChart