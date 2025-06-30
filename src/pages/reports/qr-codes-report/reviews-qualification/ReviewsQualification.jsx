import React from "react";
import PieChartComponent from "../../../../components/PieChartComponent";
import Star from "../../../../assets/icons/Star.svg";
import PositiveIcon from "../../../../assets/icons/PositiveIcon.svg";
import NeutralIcon from "../../../../assets/icons/NeutralIcon.svg";
import NegativeIcon from "../../../../assets/icons/NegativeIcon.svg";

const pieData = {
  labels: ["Positive", "Neutral", "Negative"],
  datasets: [
    {
      data: [30, 30, 30],
      backgroundColor: ["#27AE60", "#C32B43", "#DCDCDC"], // positive , negative , neutral
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

const ReviewsQualification = () => {
  return (
    <div className="bg-[#fff] rounded-[20px] p-6 w-full max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[22px] font-bold text-black2 leading-[28px]">
          Reviews Qualification
        </span>
        <span className="flex items-center gap-2 text-[24px] font-bold text-black2">
          250 <img src={Star} alt="star" className="w-7 h-7" />
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
                <img src={PositiveIcon} alt="star" /> 211
              </div>
              <div className="flex gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <img key={i} src={Star} alt="star" className="w-5 h-5" />
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2  text-lg font-bold">
                <img src={NegativeIcon} alt="star" /> 16
              </div>
              <div className="flex gap-1 mt-1">
                {[...Array(3)].map((_, i) => (
                  <img key={i} src={Star} alt="star" className="w-5 h-5" />
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2  text-lg font-bold">
              <img src={NeutralIcon} alt="star" /> 45
            </div>
            <div className="flex gap-1 mt-1">
              {[...Array(4)].map((_, i) => (
                <img key={i} src={Star} alt="star" className="w-5 h-5" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsQualification;
