import React from "react";
import { Colors } from "../../../../Theme";

const BranchReviewCard = ({ branchName, reviews , index}) => {



  return (
    <div
      className=" p-4 border border-grayDC rounded-[8px] min-w-[250px]  "
    >
      <div className="font-bold text-xl mb-2 flex items-center gap-2 w-full ">
        <div className="text-black2 w-full ">{branchName}</div>
        <div className="font-normal text-gray-600 ">({reviews.total_questions.toLocaleString()})</div>
      </div>
      <div className="flex items-center w-full h-[6px] rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-red"
          style={{ width: `${reviews.negative_percentage}%`, minWidth: reviews.negative_percentage ? 8 : 0 }}
        />
        <div
          className="h-full bg-grayDC"
          style={{ width: `${reviews.neutral_percentage}%`, minWidth: reviews.neutral_percentage ? 8 : 0 }}
        />
        <div
          className="h-full bg-green"
          style={{ width: `${reviews.positive_percentage}%`, minWidth: reviews.positive_percentage ? 8 : 0 }}
        />
      </div>
      <div className="flex items-center  mt-2 text-sm font-bold gap-5">
        <div className="flex items-center gap-1 text-red gap-1">
          <span className="w-[8px] h-[8px] rounded-full bg-red inline-block"></span>
          <span className="font-inter font-bold text-[10px] text-black">{reviews.negative.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1 text-grayDC gap-1">
          <span className="w-[8px] h-[8px] rounded-full bg-grayDC inline-block"></span>
          <span className="font-inter font-bold text-[10px] text-black">{reviews.neutral.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1 text-green gap-1">
          <span className="w-[8px] h-[8px] rounded-full bg-green inline-block"></span>
          <span className="font-inter font-bold text-[10px] text-black">{reviews.positive.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default BranchReviewCard; 