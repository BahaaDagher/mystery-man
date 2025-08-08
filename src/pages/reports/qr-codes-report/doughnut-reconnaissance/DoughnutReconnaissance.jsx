import React from "react";
import { useTranslation } from 'react-i18next';
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import DoughnutComponent from "../../../../components/DoughnutComponent";

Chart.register(ArcElement, Tooltip, Legend);

// Function to generate N distinct colors
function generateColors(count) {
  const baseColors = [
    "#3366FF",
    "#FF7A59",
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

const DoughnutReconnaissance = ({apiData}) => {
  const { t } = useTranslation();
  
  // Transform API data to chart format
  const chartData = {
    data: [apiData?.done_responses || 0, apiData?.remaining_responses || 0],
    labels: [t('text.done_qr_codes'), t('text.running_qr_codes')],
  };

  // Generate colors based on label count
  const backgroundColor = generateColors(chartData.labels.length);

  // Dynamic size (could also come from API or props)
  const doughnutSize = 150;
  const total = apiData?.total_responses || 0;
  const content = {
    value: total,
    contentDimensions: 80,
    contentFontSize: 30,
  };

  const chartDataConfig = {
    labels: chartData.labels,
    datasets: [
      {
        // label: "number",
        data: chartData.data,
        backgroundColor: backgroundColor,
        borderWidth: 1,
        spacing: 3,
        borderRadius: 7,
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
    <div className="bg-white rounded-[12px] p-[20px] w-full ">
      <div className="text-[20px] font-semibold mb-5 ">{t('text.reconnaissance')}</div>
      <div className="flex items-center justify-center gap-10">
        <DoughnutComponent
          chartData={chartDataConfig}
          options={options}
          doughnutSize={doughnutSize}
          content={content}
        />
        <div className="flex-1 ">
          <div className="flex gap-8 flex-wrap">
            {chartDataConfig.datasets[0].data.map((value, idx) => (
              <div className="flex flex-col" key={idx}>
                <div className="flex items-center gap-2 ">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor:
                        chartDataConfig.datasets[0].backgroundColor[idx],
                    }}
                  ></div>
                  <span className="text-[16px] text-gray-600">
                    {chartDataConfig.labels[idx]}
                  </span>
                </div>
                <div
                  className="font-bold text-xl ml-6"
                  style={{ color: chartDataConfig.datasets[0].backgroundColor[idx] }}
                >
                  {value}
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
