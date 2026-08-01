import React from 'react'
import { useTranslation } from 'react-i18next';
import BarComponent from '../../../../components/BarComponent';
import { useSelector } from 'react-redux';
import { getColorPercentages } from '../../../../utils/colorPercentageUtils';
import { Colors } from '../../../../Theme';

const OverallEvaluationOfEachBranch = ({apiData}) => {
  const { t } = useTranslation();

  const profileData = useSelector(state => state.profileData.getProfileData);
  const { greenPercentage, goldPercentage } = getColorPercentages(profileData);

  const getColorBasedOnPercentage = (percentage) => {
    if (percentage >= greenPercentage) {
      return Colors.green;
    } else if (percentage >= goldPercentage) {
      return Colors.gold2;
    }
    return Colors.red;
  };

  const transformedData = apiData?.map(branch => ({
    name: branch.branch_name,
    value: branch.average_rating
  })) || [];

  const chartData = {
    labels: transformedData.map(item => item.name),
    datasets: [
      {
        label: t('text.sections'),
        data: transformedData.map(item => item.value),
        backgroundColor: transformedData.map(item => getColorBasedOnPercentage(item.value)),
        borderRadius: 5,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
      },
    ],
  };

  const lang = localStorage.getItem("language");
  const isArabic = lang === "ar";

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      datalabels: {
        anchor: 'end',
        align: 'top',
        clip: false,
        formatter: (value) => value,
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
        ticks: {
          autoSkip: false,
          color: '#585151',
          font: { size: 12 },
          padding: 8,
        },
      },
      y: {
        beginAtZero: true,
        grid: { color: '#F0F0F0' },
        position: isArabic ? "right" : "left",
        ticks: { color: "#A5A5A5", font: { size: 14 } },
        max: 100,
      },
    },
    layout: {
      padding: {
        top: 30
      }
    }
  };

  return (
    <BarComponent
      title={t('text.overall_evaluation_branch')}
      chartData={chartData}
      chartOptions={chartOptions}
      height={100}
    />
  )
}

export default OverallEvaluationOfEachBranch
