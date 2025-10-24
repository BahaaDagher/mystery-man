import React from 'react';
import { useSelector } from 'react-redux';
import { getColorPercentages } from '../utils/colorPercentageUtils';
import { Colors } from '../Theme';

const SectionProgressBars = ({ sections = [] }) => {
  // Get profile data from Redux state
  const profileData = useSelector(state => state.profileData.getProfileData);
  
  // Get dynamic color percentages
  const { greenPercentage, goldPercentage } = getColorPercentages(profileData);

  // Function to determine color based on percentage value using dynamic thresholds
  const getColorBasedOnPercentage = (percentage) => {
    if (percentage >= greenPercentage) {
      return Colors.green; // Green for high percentages
    } else if (percentage >= goldPercentage) {
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