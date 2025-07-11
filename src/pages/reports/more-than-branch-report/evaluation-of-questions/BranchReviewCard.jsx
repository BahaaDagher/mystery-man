import React from "react";
import { Colors } from "../../../../Theme";

const BranchReviewCard = ({ branchName, reviews , index}) => {
  const { total, negative, neutral, positive } = reviews;

  // Calculate bar widths as percentages
  const negPercent = (negative / total) * 100;
  const neuPercent = (neutral / total) * 100;
  const posPercent = (positive / total) * 100;

  return (
    <div
      className="w-[33%] p-4"
      style={
        index === 1
          ? { borderLeft: `1px solid ${Colors.grayDC}`, borderRight: `1px solid ${Colors.grayDC}` }
          : {}
      }
    >
      <div className="font-bold text-xl mb-2 flex items-center gap-2">
        <div className="text-black2">{branchName}</div>
        <div className="font-normal text-gray-600 ">({total.toLocaleString()})</div>
      </div>
      <div className="flex items-center w-full h-[6px] rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-red"
          style={{ width: `${negPercent}%`, minWidth: negative ? 8 : 0 }}
        />
        <div
          className="h-full bg-grayDC"
          style={{ width: `${neuPercent}%`, minWidth: neutral ? 8 : 0 }}
        />
        <div
          className="h-full bg-green"
          style={{ width: `${posPercent}%`, minWidth: positive ? 8 : 0 }}
        />
      </div>
      <div className="flex items-center  mt-2 text-sm font-bold gap-5">
        <div className="flex items-center gap-1 text-red gap-1">
          <span className="w-[8px] h-[8px] rounded-full bg-red inline-block"></span>
          <span className="font-inter font-bold text-[10px] text-black">{negative.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1 text-grayDC gap-1">
          <span className="w-[8px] h-[8px] rounded-full bg-grayDC inline-block"></span>
          <span className="font-inter font-bold text-[10px] text-black">{neutral.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1 text-green gap-1">
          <span className="w-[8px] h-[8px] rounded-full bg-green inline-block"></span>
          <span className="font-inter font-bold text-[10px] text-black">{positive.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default BranchReviewCard; 