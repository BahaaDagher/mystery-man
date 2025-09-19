import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import HexMapSaudi from "./HexMapSaudi";
import { useDispatch, useSelector } from "react-redux";
import { getCitiesBranches } from "../../../../store/slices/reportSlice";
import { getBranches } from "../../../../store/slices/branchSlice";
import CircleLoader from "../../../../components/CircleLoader";
import { Colors } from "../../../../Theme";
import Map from "../../../../components/Map";

// Default data for fallback
const defaultData = {
  branches: 0,
  cities: [],
};


const cityColors = {
  Riyadh: "#3F51B5",
  Jeddah: "#a6946f",
  Dammam: "#2196F3",
  Mecca: "#FF5722",
  Medina: "#FFC107",
  Abha: "#4CAF50",
  Jizan: "#9C27B0",
  Tabuk: "#00BCD4",
  Najran: "#795548",
  AlBaha: "#607D8B",
  Hafar_AlBatin: "#E91E63",
  AlKhobar: "#009688"
};

const BranchesLocation = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [citiesBranchesState, setCitiesBranchesState] = useState(null);
  const [branchesState, setBranchesState] = useState([]);

  const citiesBranchesData = useSelector(
    (state) => state.reportData.getCitiesBranchesData
  );
  const citiesBranchesLoading = useSelector(
    (state) => state.reportData.getCitiesBranchesLoading
  );

  // Add branches selectors
  const getBranchesData = useSelector(state => state.branchData.getBranchesData);
  const getBranchesDataLoading = useSelector(state => state.branchData.getBranchesDataLoading);

  useEffect(() => {
    if (citiesBranchesData?.status) {
      console.log("c", citiesBranchesData);
      setCitiesBranchesState(citiesBranchesData.data);
    }
  }, [citiesBranchesData]);

  // Add effect for branches data
  useEffect(() => {
    if (getBranchesData?.status) {
      console.log("getBranchesData", getBranchesData.data.branches);
      setBranchesState(getBranchesData.data.branches);
    }
  }, [getBranchesData]);

  useEffect(() => {
    dispatch(getCitiesBranches());
    dispatch(getBranches()); // Add getBranches call
  }, []);

  // Transform API data and calculate total branches
  const transformData = () => {
    if (
      !citiesBranchesState?.cities ||
      citiesBranchesState.cities.length === 0
    ) {
      return defaultData;
    }

    const cities = citiesBranchesState.cities.map((city) => ({
      name: city.city,
      count: city.count,
    }));

    const totalBranches = cities.reduce((sum, city) => sum + city.count, 0);

    return {
      branches: totalBranches,
      cities: cities,
    };
  };

  const data = transformData();

  // Get all valid branch coordinates for the map
  const getValidBranches = () => {
    if (!branchesState || branchesState.length === 0) {
      return [];
    }

    return branchesState.filter(branch => 
      branch.lat && branch.long && 
      !isNaN(parseFloat(branch.lat)) && !isNaN(parseFloat(branch.long))
    );
  };

  const validBranches = getValidBranches();

  // Default center for Saudi Arabia when no branches
  const defaultCenter = { lat: 24.7136, lng: 46.6753 };

  if (citiesBranchesLoading || getBranchesDataLoading) {
    return (
      <div className="bg-white rounded-[12px] p-[20px] border-[10px] border-[#F22E2E] max-w-3xl mx-auto">
        <div style={{ height: "128px" }}>
          <CircleLoader
            size={48}
            color={Colors.main}
            text="Loading branches data"
            textColor="#6b7280"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[12px] p-[20px] border-[10px] border-[#F22E2E] max-w-3xl mx-auto ">
      {/* Legend */}
      <div className="text-[xl] sm:text-2xl font-semibold mb-4 flex justify-between items-center">
        <div>{t("text.branches_saudi_arabia")}</div>
        {/* Branches count */}
        <div className="text-3xl font-bold">{data.branches}</div>
      </div>
      <div className="flex  justify-between items-center gap-2">
        <div className="flex-1">
          <ul className="space-y-3">
            {data.cities.map((city) => (
              <li key={city.name} className="flex items-center gap-2">
                <div
                  className=" w-3 h-3 rounded-full"
                  style={{ background: cityColors[city.name] || "#6b7280" }}
                ></div>
                <div
                  className={`font-semibold `}
                  style={{ color: cityColors[city.name] || "#6b7280" }}
                >
                  <span>{t(`text.${city.name}`)}</span>
                  <span className="text-sm ms-[10px]">({city.count})</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Map */}
        <div className="relative" style={{ width: '400px', height: '300px' }}>
          <Map 
            latPos={defaultCenter.lat} 
            lngPos={defaultCenter.lng} 
            mapWidth="100%" 
            mapHeight="100%" 
            showSearch={false}
            branches={validBranches}
            fitBounds={true}
          />
        </div>
      </div>
    </div>
  );
};

export default BranchesLocation;
