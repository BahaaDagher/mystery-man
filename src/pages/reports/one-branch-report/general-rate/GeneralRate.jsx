import React from "react";
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

const legend = [
  { color: "#C32B43", label: "Bad" },
  { color: "#2F49A9", label: "Good" },
  { color: "#45464E", label: "Normal" },
  { color: "#27AE60", label: "Excellent" },
];

const GeneralRate = ({apiData}) => {
  // Transform API data to chart format
  const transformApiData = (apiData) => {
    if (!apiData || !apiData.percentages) {
      return {
        labels: ["Bad", "Normal", "Good", "Excellent"],
        data: [0, 0, 0, 0]
      };
    }
    
    return {
      labels: ["Bad", "Normal", "Good", "Excellent"],
      data: [
        apiData.percentages.bad || 0,
        apiData.percentages.normal || 0,
        apiData.percentages.good || 0,
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
        borderRadius: 10,
      },
    ],
  };

  return (
    <div className="bg-white rounded-[12px] p-6 ">
      <div className="flex justify-between items-center mb-2">
        <span className="text-2xl font-bold text-black2 leading-[28px]">
          General Rate
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
              <div className="flex items-center gap-3 w-1/2 min-w-[90px]">
                <div
                  className="flex items-center justify-center w-[8px] h-[8px] rounded-full"
                  style={{ background: legend[1].color }}
                ></div>
                <span className="text-black text-[12px] font-semibold">
                  {legend[1].label}
                </span>
              </div>
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
