import React from "react";
import HomeHeader from "./components/HomeHeader";
import HomeStatistics from "./components/home-statistics/HomeStatistics";
import DoughnutReconnaissance from "./components/doughnut-reconnaissance/DoughnutReconnaissance";
import BranchRating from "./components/branch-rating/BranchRating";
import BranchesReport from "./components/branches-report/BranchesReport";
import BranchesLocation from "./components/branches-location/BranchesLocation";

const Home2 = () => {
  return (
    <>
      <div className="w-full flex flex-col gap-3">
        <HomeHeader />
        <div className="Printable w-full flex flex-col gap-3">
          <HomeStatistics />
          <div className="flex gap-2 w-full ">
            {/* Left column */}
            <div className="flex flex-col gap-4 w-[60%]">
              <div className="  ">
                <DoughnutReconnaissance />
              </div>
              <div className="">
                <BranchesReport />
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-4 w-[40%]">
              <div className="">
                <BranchRating />
              </div>
              <div className="">
                <BranchesLocation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home2;
