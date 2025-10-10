import React from "react";
import { useTranslation } from 'react-i18next';
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import DoughnutComponent from "../../../../components/DoughnutComponent";
import { Colors } from "../../../../Theme";

Chart.register(ArcElement, Tooltip, Legend);

// Function to generate N distinct colors
function generateColors(count) {
  const baseColors = [
    Colors.green,
    Colors.gold2,
    "#34D399",
    "#F59E42",
    "#A78BFA",
    "#F87171",
    "#FBBF24",
    "#10B981",
    "#3B82F6",
    "#F472B6",
  ];
  if (count <= baseColors.length) return baseColors.slice(0, count);
  // If more colors needed, generate with HSL
  return Array.from(
    { length: count },
    (_, i) => `hsl(${(i * 360) / count}, 80%, 60%)`
  );
}

const DoughnutReconnaissance = ({ reconnaissanceChart }) => {
  const { t } = useTranslation();
  
  // Use API data if available, otherwise use default data
  const apiData = reconnaissanceChart ? {
    data: [reconnaissanceChart.done || 0, reconnaissanceChart.running || 0],
    labels: [t('text.done_qr_codes'), t('text.running_qr_codes')],
  } : {
    data: [16, 3],
    labels: [t('text.done_qr_codes'), t('text.running_qr_codes')],
  };

  // Generate colors based on label count
  const backgroundColor = generateColors(apiData.labels.length);

  // Dynamic size (could also come from API or props)
  const doughnutSize = 150;
  const total = apiData.data.reduce((a, b) => a + b, 0);
  const content = {
    value: total,
    contentDimensions: 80,
    contentFontSize: 30,
  };

  const chartData = {
    labels: apiData.labels,
    datasets: [
      {
        label: "number",
        data: apiData.data,
        backgroundColor: backgroundColor,
        borderWidth: 1,
        spacing: 0,
        borderRadius: 4,
      },
    ],
  };
  const options = {
    cutout: '75%',
    plugins: {
        legend: { display: false },
        tooltip: {
            enabled: true,
            position: 'nearest',
        },
    },
    maintainAspectRatio: false,
};

  return (
    <div className="bg-white rounded-[12px] p-[20px]  w-full border-[10px] ">
      <div className="text-[20px] font-semibold mb-5 ">{t('text.Qr_Codes')}</div>
      <div className="flex items-center justify-center gap-10">
        <DoughnutComponent
          chartData={chartData}
          options={options}
          doughnutSize={doughnutSize}
          content={content}
        />
        <div className="flex-1 ">
          <div className="flex gap-8 flex-wrap">
            {chartData.datasets[0].data.map((value, idx) => (
              <div className="flex flex-col" key={idx}>
                <div className="flex items-center gap-2 ">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor:
                        chartData.datasets[0].backgroundColor[idx],
                    }}
                  ></div>
                  <span className="text-[16px] text-gray-600">
                    {chartData.labels[idx]}
                  </span>
                </div>
                <div
                  className="font-bold text-xl ml-6"
                  style={{ color: chartData.datasets[0].backgroundColor[idx] }}
                >
                  {value.toString().padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoughnutReconnaissance;
