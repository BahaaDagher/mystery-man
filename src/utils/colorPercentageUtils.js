import { createSelector } from '@reduxjs/toolkit';

/**
 * Utility function to get color percentages from profile data
 * @param {Object} profileData - The profile data from Redux state
 * @returns {Object} Object containing green and gold percentage thresholds
 */
export const getColorPercentages = (profileData) => {
  // Default values if not found in profile data
  let greenPercentage = 70;
  let goldPercentage = 40;

  if (profileData?.data?.colorPercentages) {
    const colorPercentages = profileData.data.colorPercentages;
    
    // Use index-based mapping: index 0 => green, index 1 => gold
    if (Array.isArray(colorPercentages)) {
      const greenData = colorPercentages[0];
      if (greenData && typeof greenData.percentage === 'number') {
        greenPercentage = greenData.percentage;
      }

      const goldData = colorPercentages[1];
      if (goldData && typeof goldData.percentage === 'number') {
        goldPercentage = goldData.percentage;
      }
    }
  }

  return {
    greenPercentage,
    goldPercentage
  };
};

/**
 * Function to determine color based on percentage value using dynamic thresholds
 * @param {number} percentage - The percentage value to evaluate
 * @param {Object} profileData - The profile data from Redux state
 * @returns {string} Color value (green, gold2, or red)
 */
export const getColorBasedOnPercentage = (percentage, profileData) => {
  const { greenPercentage, goldPercentage } = getColorPercentages(profileData);
  
  if (percentage >= greenPercentage) {
    return '#27AE60'; // green
  } else if (percentage >= goldPercentage) {
    return '#F3B51A'; // gold2
  } else {
    return '#C32B43'; // red
  }
};

/**
 * Redux selector to get color percentages from state
 */
export const selectColorPercentages = createSelector(
  [(state) => state.profileData.getProfileData],
  (getProfileData) => getColorPercentages(getProfileData)
);