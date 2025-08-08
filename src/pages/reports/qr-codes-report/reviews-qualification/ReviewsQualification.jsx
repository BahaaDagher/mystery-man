import React from "react";
import { useTranslation } from 'react-i18next';
import PieChartComponent from "../../../../components/PieChartComponent";
import Star from "../../../../assets/icons/Star.svg";
import PositiveIcon from "../../../../assets/icons/PositiveIcon.svg";
import NeutralIcon from "../../../../assets/icons/NeutralIcon.svg";
import NegativeIcon from "../../../../assets/icons/NegativeIcon.svg";

const pieOptions = {
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  maintainAspectRatio: false,
};

const ReviewsQualification = ({apiData}) => {
  const { t } = useTranslation();
  
  // Transform API data to chart format
  const pieData = {
    labels: [t('text.positive'), t('text.neutral'), t('text.negative')],
    datasets: [
      {
        data: [
          apiData?.data?.positive || 0,
          apiData?.data?.neutral || 0,
          apiData?.data?.negative || 0
        ],
        backgroundColor: ["#27AE60", "#C32B43", "#DCDCDC"], // positive , negative , neutral
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="bg-[#fff] rounded-[20px] p-6 w-full max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[22px] font-bold text-black2 leading-[28px]">
          {t('text.reviews_qualification')}
        </span>
        <span className="flex items-center gap-2 text-[24px] font-bold text-black2">
          {apiData?.total || 0} <img src={Star} alt="star" className="w-7 h-7" />
        </span>
      </div>
      <hr className="my-4 border-gray-200" />
      <div className="flex flex-row gap-8 items-center justify-between">
        {/* Pie Chart only */}
        <div className="flex-1 flex items-center gap-8">
          <div className="relative">
            <PieChartComponent
              chartData={pieData}
              options={pieOptions}
              size={260}
            />
          </div>
        </div>
        {/* Right side stats */}
        <div className="flex-1 flex flex-col gap-6 ">
          <div className="flex gap-16">
            <div className="">
              <div className="flex items-center gap-2  text-lg font-bold">
                <img src={PositiveIcon} alt="star" /> {apiData?.data?.positive || 0}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2  text-lg font-bold">
                <img src={NegativeIcon} alt="star" /> {apiData?.data?.negative || 0}
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2  text-lg font-bold">
              <img src={NeutralIcon} alt="star" /> {apiData?.data?.neutral || 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsQualification;
