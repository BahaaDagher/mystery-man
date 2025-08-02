import React from 'react'
import { useTranslation } from 'react-i18next';
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler
);

const ImprovementPercentage = ({apiData}) => {
    const { t } = useTranslation();
    const lang = localStorage.getItem("language");
    const isArabic = lang === "ar";
  
    // Transform API data to chart format
    const transformApiData = (apiData) => {
      if (!apiData || !apiData.chart) {
        return {
          labels: [],
          data: []
        };
      }
      
      return {
        labels: apiData.chart.map(item => item.month),
        data: apiData.chart.map(item => item.value)
      };
    };

    const transformedData = transformApiData(apiData);
    const labels = transformedData.labels;
    const dataValues = transformedData.data;
  
    const data = {
      labels,
      datasets: [
        {
          label: t("text.Sections"),
          data: dataValues,
          fill: true,
          borderColor: "#5654D4",
          backgroundColor: "transparent",
          pointBackgroundColor: "#fff",
          pointBorderColor: "#5654D4",
          pointRadius: 7,
          pointHoverRadius: 7,
          tension: 0,
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function (context) {
              return context.parsed.y;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: "#e5e7eb" },
          position: isArabic ? "right" : "left",
          ticks: {
            //   stepSize: isRate ? 1 : 10,
            max: undefined,
          },
          max: undefined,
        },
        x: {
          grid: { display: false },
        },
      },
    };
  return (
    <div className="bg-white  rounded-[12px] p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[22px] font-bold text-black6 leading-[21.55px] tracking-[-0.16px]">
            {t("text.The_percentage_of_improvement_of_the_branch_during_the_specified_period_of_time")}
        </span>
      </div>
      <hr className="my-4 border-gray-200 bg-main mb-8" />
      <div>
      <Line data={data} options={options} height={200} />
      </div>
    </div>
  )
}

export default ImprovementPercentage