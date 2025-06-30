import React from "react";
import HexMapSaudi from "./HexMapSaudi";

// Example data
const data = {
  branches: 6,
  cities: [
    { name: "Riyadh", count: 3 },
    { name: "Jeddah", count: 1 },
    { name: "Dammam", count: 1 },
    { name: "Khobar", count: 1 },
    { name: "Mecca", count: 1 },
    { name: "Medina", count: 1 },
  ],
};

const cityColors = [
  "#2563eb", // Riyadh
  "#f87171", // Jeddah
  "#06b6d4", // Dammam
  "#be123c", // Khobar
  "#facc15", // Mecca
  "#60a5fa", // Medina
];

const hexPositions = [
  [2, 0], // Riyadh (blue)
  [1, 4], // Jeddah (red)
  [4, 2], // Dammam (cyan, selected)
  [3, 4], // Khobar (dark red)
  [5, 3], // Mecca (yellow)
  [2, 5], // Medina (light blue)
];
const strokesWidth = [6, 5, 6, 3, 8, 6];

const hexSize = 24;
const hexWidth = Math.sqrt(3) * hexSize;
const hexHeight = 2 * hexSize;

function hexagonPoints(cx, cy, size) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i;
    return [cx + size * Math.cos(angle), cy + size * Math.sin(angle)].join(",");
  }).join(" ");
}

const BranchesLocation = () => {
  return (
    <div className="bg-white rounded-[12px] p-[20px] border-[10px] border-[#F22E2E] max-w-3xl mx-auto ">
      {/* Legend */}
      <div className="text-2xl font-semibold mb-4 flex justify-between items-center">
        <div>Branches in Saudi Arabia</div>
        {/* Branches count */}
        <div className="text-3xl font-bold">
          {data.branches}
        </div>
      </div>
      <div className="flex  justify-between items-center">
        <div className="flex-1">
          <ul className="space-y-3">
            {data.cities.map((city, idx) => (
              <li key={city.name} className="flex items-center gap-2">
                <span
                  className=" w-3 h-3 rounded-full"
                  style={{ background: cityColors[idx] }}
                ></span>
                <span
                  className={`font-semibold `}
                  style={{ color: cityColors[idx] }}
                >
                  {city.name.charAt(0).toUpperCase() + city.name.slice(1)} 
                  <span className="text-sm ms-[10px]">({city.count})</span>
                </span>
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
