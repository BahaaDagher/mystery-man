import React from "react";
import { useTranslation } from 'react-i18next';
import DoughnutComponent from "../../../../components/DoughnutComponent";

const backgroundColor = [
  "#2F49A9", // Good (blue)
  "#C32B43", // Bad (red)
  "#45464E", // Normal (gray)
  "#27AE60", // Excellent (green)
];

const doughnutSize = 200;

const options = {
  cutout: "65%",
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      position: "nearest",
    },
  },
  maintainAspectRatio: false,
};

const GeneralRate = ({apiData}) => {
  const { t } = useTranslation();
  
  const legend = [
    { color: "#C32B43", label: t('text.bad') },
    { color: "#2F49A9", label: t('text.good') },
    { color: "#45464E", label: t('text.normal') },
    { color: "#27AE60", label: t('text.excellent') },
  ];

  // Transform API data to chart format
  const chartData = {
    labels: apiData?.map(item => item.label) || [],
    datasets: [
      {
        data: apiData?.map(item => item.value) || [],
        backgroundColor: backgroundColor,
        borderWidth: 1,
        spacing: -1,
        borderRadius: 10,
      },
    ],
  };

  // Calculate total for center content
  const total = apiData?.reduce((sum, item) => sum + item.value, 0) || 0;
  const content = {
    value: total,
    contentDimensions: 80,
    contentFontSize: 28,
  };

  return (
    <div className="bg-white rounded-[12px] p-6  ">
      <div className="flex justify-between items-center mb-2">
        <span className="text-2xl font-bold text-black2 leading-[28px]">
          {t('text.general_rate')}
        </span>
        <div className="flex gap-8 items-center">
          {/* Legend in two columns, all flex */}
          <div className="flex flex-wrap gap-1 " style={{ maxWidth: 220 }}>
            <div>
              <div className="flex items-center gap-3 w-1/2 min-w-[90px]">
                <div
                  className="flex items-center justify-center w-[8px] h-[8px] rounded-full"
                  style={{ background: legend[0].color }}
                ></div>
                <span className="text-black text-[12px] font-normal">
                  {legend[0].label}
                </span>
              </div>
              <div className="flex items-center gap-3 w-1/2 min-w-[90px]">
                <div
                  className="flex items-center justify-center w-[8px] h-[8px] rounded-full"
                  style={{ background: legend[2].color }}
                ></div>
                <span className="text-black text-[12px] font-normal">
                  {legend[2].label}
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 w-1/2 min-w-[90px]">
                <div
                  className="flex items-center justify-center w-[8px] h-[8px] rounded-full"
                  style={{ background: legend[1].color }}
                ></div>
                <span className="text-black text-[12px] font-normal">
                  {legend[1].label}
                </span>
              </div>
              <div className="flex items-center gap-3 w-1/2 min-w-[90px]">
                <div
                  className="flex items-center justify-center w-[8px] h-[8px] rounded-full"
                  style={{ background: legend[3].color }}
                ></div>
                <span className="text-black text-[12px] font-normal">
                  {legend[3].label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-4 border-gray-200" />
      <div className="flex flex-col items-center justify-center">
        <DoughnutComponent
          chartData={chartData}
          options={options}
          doughnutSize={doughnutSize}
          content={content}
        />
      </div>
    </div>
  );
};

export default GeneralRate;
