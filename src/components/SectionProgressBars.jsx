import React from "react";
import { Colors } from "../Theme";

const SectionProgressBars = ({ sections = [] }) => {
  // Function to determine color based on percentage value
  const getColorBasedOnPercentage = (percentage) => {
    if (percentage >= 70) {
      return Colors.green; // Green for high percentages
    } else if (percentage >= 40) {
      return Colors.gold2; // Gold for medium percentages
    } else {
      return Colors.red; // Red for low percentages
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {sections.map((section, idx) => (
        <div key={idx} className="flex flex-col  ">
          <div className="flex justify-between items-center">
            <div className="font-medium text-[13px] leading-[18px] ">{section.name}</div>
            <div className="font-medium text-[13px] leading-[18px] ">{section.value}%</div>
          </div>
          <div className="flex-1 flex items-center">
            <div className="w-full h-4 bg-input_fill rounded-s-[4px] overflow-hidden">
              <div
                className="h-4 rounded-s-[4px] transition-all duration-300"
                style={{
                  width: `${section.value}%`,
                  background: getColorBasedOnPercentage(section.value),
                }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionProgressBars;