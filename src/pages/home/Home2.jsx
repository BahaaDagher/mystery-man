import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomeData, getCitiesBranches } from "../../store/slices/reportSlice";
import HomeHeader from "./components/HomeHeader";
import HomeStatistics from "./components/home-statistics/HomeStatistics";
import DoughnutReconnaissance from "./components/doughnut-reconnaissance/DoughnutReconnaissance";
import BranchRating from "./components/branch-rating/BranchRating";
import BranchesReport from "./components/branches-report/BranchesReport";
import BranchesLocation from "./components/branches-location/BranchesLocation";
import HexMap from "./components/branches-location/HexMapSaudi";
import HexMapSaudi from "./components/branches-location/HexMapSaudi";
import Loading from "../../components/Loading";

const Home2 = () => {
  const dispatch = useDispatch();
  
  // Local state to store the data
  const [homeDataState, setHomeDataState] = useState(null);
  
  // Redux selectors
  const homeData = useSelector(state => state.reportData.getHomeDataData);
  const homeDataLoading = useSelector(state => state.reportData.getHomeDataLoading);

  // Call APIs on component mount
  useEffect(() => {
    dispatch(getHomeData());
  }, [dispatch]);

  // Update local state when Redux data changes
  useEffect(() => {
    if (homeData && homeData.status) {
      console.log("getHomeData Response:", homeData);
      setHomeDataState(homeData.data);
    }
  }, [homeData]);



  return (
    <>
    {homeDataLoading && <Loading/>}
      <div className="w-full flex flex-col gap-3">
        {/* <HomeHeader /> */}
        <div className="Printable w-full flex flex-col gap-3">
          <HomeStatistics 
            availableMissions={homeDataState?.availableMissions}
            avgReview={homeDataState?.avgReview}
            currentBalance={homeDataState?.currentBalance}
            reconnaissance={homeDataState?.reconnaissance}
          />
          <div className="flex flex-col lg:flex-row gap-2 w-full">
            {/* Left column */}
            <div className="flex flex-col gap-4 w-full lg:w-[60%]">
              <div className="">
                <DoughnutReconnaissance 
                  reconnaissanceChart={homeDataState?.reconnaissanceChart}
                />
              </div>
              <div className="">
                <BranchesReport 
                  missions={homeDataState?.missions}
                />
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-4 w-full lg:w-[40%]">
              <div className="">
                <BranchRating 
                  rating={homeDataState?.rating}
                />
              </div>
              <div className="relative ">
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
