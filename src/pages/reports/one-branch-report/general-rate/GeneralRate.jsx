import React from "react";
import { useTranslation } from 'react-i18next';
import DoughnutComponent from "../../../../components/DoughnutComponent";
import { Colors } from "../../../../Theme";

const backgroundColor = [
  Colors.red, // Bad (red)
  Colors.gold2, // Normal (gray)
  // "#2F49A9", // Good (blue)
  Colors.green, // Excellent (green)
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
    datalabels: {
      anchor: 'center',
      align: 'center',
      formatter: (value) => {
        // Only show labels for non-zero values
        return value > 0 ? value : '';
      },
      font: {
        weight: 'bold',
        size: 12,
      },
      color: "#fff",
      offset: 5,
      padding: {
        top: 5,
        bottom: 6,
        left: 10,
        right: 10
      },
      textAlign: 'center'
    },
  },
  
  maintainAspectRatio: false,
};

const GeneralRate = ({apiData}) => {
  const { t } = useTranslation();
  
  const legend = [
    { color: Colors.red, label: t("text.bad") },
    { color: Colors.blue, label: t("text.good") },
    { color: Colors.gold2, label: t("text.natural") },
    { color: Colors.green, label: t("text.excellent") },
  ];

  // Transform API data to chart format
  const transformApiData = (apiData) => {
    if (!apiData || !apiData.percentages) {
      return {
        labels: [t("text.bad"), t("text.natural"), t("text.excellent")],
        data: [0, 0, 0, 0]
      };
    }
    
    return {
      labels: [t("text.bad"), t("text.natural"), t("text.excellent")],
      data: [
        apiData.percentages.bad || 0,
        apiData.percentages.normal || 0,
        apiData.percentages.excellent || 0
      ]
    };
  };

  const transformedData = transformApiData(apiData);

  const content = {
    value: apiData?.center_label || "Excellent",
    contentDimensions: 80,
    contentFontSize: 20,
  };

  const chartData = {
    labels: transformedData.labels,
    datasets: [
      {
        data: transformedData.data,
        backgroundColor: backgroundColor,
        borderWidth: 1,
        spacing: -1,
        // borderRadius: 10,
      },
    ],
  };

  return (
    <div className="bg-white rounded-[12px] p-6 ">
      <div className="flex justify-between items-center mb-2">
        <span className="text-2xl font-bold text-black2 leading-[28px]">
          {t("text.General_rate")}
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
                <span className="text-black text-[12px] font-semibold ">
                  {legend[0].label}
                </span>
              </div>
              <div className="flex items-center gap-3 w-1/2 min-w-[90px]">
                <div
                  className="flex items-center justify-center w-[8px] h-[8px] rounded-full"
                  style={{ background: legend[2].color }}
                ></div>
                <span className="text-black text-[12px] font-semibold">
                  {legend[2].label}
                </span>
              </div>
            </div>
            <div>
              {/* <div className="flex items-center gap-3 w-1/2 min-w-[90px]">
                <div
                  className="flex items-center justify-center w-[8px] h-[8px] rounded-full"
                  style={{ background: legend[1].color }}
                ></div>
                <span className="text-black text-[12px] font-semibold">
                  {legend[1].label}
                </span>
              </div> */}
              <div className="flex items-center gap-3 w-1/2 min-w-[90px]">
                <div
                  className="flex items-center justify-center w-[8px] h-[8px] rounded-full"
                  style={{ background: legend[3].color }}
                ></div>
                <span className="text-black text-[12px] font-semibold">
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
