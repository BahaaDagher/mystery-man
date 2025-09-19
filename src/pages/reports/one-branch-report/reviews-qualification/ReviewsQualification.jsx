import React from "react";
import { useTranslation } from 'react-i18next';
import { Rating, styled } from '@mui/material';
import PieChartComponent from "../../../../components/PieChartComponent";
import Star from "../../../../assets/icons/Star.svg";
import PositiveIcon from "../../../../assets/icons/PositiveIcon.svg";
import NeutralIcon from "../../../../assets/icons/NeutralIcon.svg";
import NegativeIcon from "../../../../assets/icons/NegativeIcon.svg";

const BranchRating = styled(Rating)(({ theme }) => ({
  direction: "ltr",
  '& .MuiRating-icon': {
    fontSize: '28px', // adjust size for this component
  },
}));

const ReviewsQualification = ({apiData}) => {
  const { t } = useTranslation();
  
  // Transform API data to chart format
  const transformApiData = (apiData) => {
    if (!apiData || !apiData.chart) {
      return {
        labels: [t("text.Positive"), t("text.Neutral"), t("text.Negative")],
        data: [0, 0, 0]
      };
    }
    
    return {
      labels: apiData.chart.map(item => item.label),
      data: apiData.chart.map(item => item.value)
    };
  };

  const transformedData = transformApiData(apiData);

  const pieData = {
    labels: transformedData.labels,
    datasets: [
      {
        data: transformedData.data,
        backgroundColor: ["#27AE60", "#DCDCDC", "#C32B43"], // positive, neutral, negative
        borderWidth: 0,
      },
    ],
  };

const pieOptions = {
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  maintainAspectRatio: false,
};

  return (
    <div className="bg-[#fff] rounded-[20px] p-6 w-full max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[22px] font-bold text-black2 leading-[28px]">
          {t("text.Reviews_Qualification")}
        </span>
        <span className="flex items-center gap-2 text-[24px] font-bold text-black2">
          {apiData?.total_reviews || 0}  
          {apiData?.total_stars > 0 && (
            <BranchRating 
              name="half-rating" 
              defaultValue={apiData.total_stars} 
              precision={0.5} 
              readOnly 
            />
          )}
        </span>
      </div>
      <hr className="my-4 border-gray-200" />
      <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
        {/* Pie Chart only */}
        <div className="flex-1 flex items-center gap-8">
          <div className="relative">
            <PieChartComponent
              chartData={pieData}
              options={pieOptions}
              size={200}
            />
          </div>
        </div>
        {/* Right side stats */}
        <div className="flex-1 flex flex-col gap-6 ">
          <div className="flex gap-16">
            <div className="">
              <div className="flex items-center gap-2  text-lg font-bold">
                <img src={PositiveIcon} alt="star" /> {apiData?.positive || 0}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2  text-lg font-bold">
                <img src={NegativeIcon} alt="star" /> {apiData?.negative || 0}
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2  text-lg font-bold">
              <img src={NeutralIcon} alt="star" /> {apiData?.neutral || 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsQualification;
