import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import HexMapSaudi from "./HexMapSaudi";
import { useDispatch, useSelector } from "react-redux";
import { getCitiesBranches } from "../../../../store/slices/reportSlice";
import CircleLoader from "../../../../components/CircleLoader";
import { Colors } from "../../../../Theme";

// Default data for fallback
const defaultData = {
  branches: 0,
  cities: [],
};

const cityColors = {
  Riyadh: "#2563eb",
  Jeddah: "#f87171",
  Dammam: "#06b6d4",
  "Al Khobar": "#be123c",
  Mecca: "#facc15",
  Medina: "#60a5fa",
  Khobar: "#be123c", // Alternative name for Al Khobar
};

const BranchesLocation = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [citiesBranchesState, setCitiesBranchesState] = useState(null);

  const citiesBranchesData = useSelector(
    (state) => state.reportData.getCitiesBranchesData
  );
  const citiesBranchesLoading = useSelector(
    (state) => state.reportData.getCitiesBranchesLoading
  );

  useEffect(() => {
    if (citiesBranchesData.status) {
      console.log("getCitiesBranches Response:", citiesBranchesData);
      setCitiesBranchesState(citiesBranchesData.data);
    }
  }, [citiesBranchesData]);

  useEffect(() => {
    dispatch(getCitiesBranches());
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

  if (citiesBranchesLoading) {
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
      <div className="text-2xl font-semibold mb-4 flex justify-between items-center">
        <div>{t("text.branches_saudi_arabia")}</div>
        {/* Branches count */}
        <div className="text-3xl font-bold">{data.branches}</div>
      </div>
      <div className="flex  justify-between items-center">
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
                  <span>{city.name}</span>
                  <span className="text-sm ms-[10px]">({city.count})</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Map */}
        <div className="relative">
          <HexMapSaudi />
        </div>
      </div>
    </div>
  );
};

export default BranchesLocation;
