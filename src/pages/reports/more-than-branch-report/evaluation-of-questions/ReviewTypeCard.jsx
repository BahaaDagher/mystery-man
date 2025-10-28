import React from "react";
import PositiveIcon from "../../../../assets/icons/PositiveIcon.svg";
import NeutralIcon from "../../../../assets/icons/NeutralIcon.svg";
import NegativeIcon from "../../../../assets/icons/NegativeIcon.svg";
import Star from "../../../../assets/icons/Star.svg";

const iconMap = {
  negative: (
    <span className="inline-block  rounded-full border-2 border-red flex items-center justify-center">
      <img src={NegativeIcon} alt="Negative" className="w-9" />
    </span>
  ),
  neutral: (
    <span className="inline-block  rounded-full border-2 border-grayDC flex items-center justify-center">
      <img src={NeutralIcon} alt="Neutral" className="w-9" />
    </span>
  ),
  positive: (
    <span className="inline-block  rounded-full border-2 border-green flex items-center justify-center">
      <img src={PositiveIcon} alt="Positive" className="w-9" />
    </span>
  ),
};

const ReviewTypeCard = ({ name, name2, count }) => (
  console.log("count::" , count) ,
  <div className="flex flex-col gap-2">
    <div className="text-gray8 text-[18px] font-semibold mb-2">{name}</div>
    <div className="flex items-center gap-2 mb-2">
      {iconMap[name2]}
      <span className="text-[#18192B] font-bold text-2xl">{count}</span>
    </div>
    {/* <div className="flex flex-wrap  gap-1">
      {Array.from({ length: numberOfStars }).map((_, i) => (
        <img key={i} src={Star} alt="star" className="w-5 h-5" />
      ))}
    </div> */}
  </div>
);

export default ReviewTypeCard;