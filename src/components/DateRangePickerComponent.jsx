import React, { useState, useEffect, useRef } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import calendarIcon from "../assets/icons/calenderIcon.svg";

const DateRangePickerComponent = ({ onDateChange }) => {
  const [range, setRange] = useState([
    {
      startDate: new Date("2024-11-30"),
      endDate: new Date("2025-11-30"),
      key: "selection",
    },
  ]);

  const [showPicker, setShowPicker] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const wrapperRef = useRef(null);

  // Detect window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Detect outside click (mobile + desktop)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside); // for mobile touch
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleChange = (item) => {
    setRange([item.selection]);
    if (typeof onDateChange === "function") {
      onDateChange(item.selection);
    }

    // Auto-close when both dates selected
    const { startDate, endDate } = item.selection;
    if (startDate && endDate && startDate !== endDate) {
      setShowPicker(false);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="relative inline-block z-15 w-full max-w-sm sm:max-w-md md:max-w-lg"
    >
      {/* Trigger Button */}
      <div
        onClick={() => setShowPicker(true)}
        className="border border-gray-300 px-4 py-2 rounded-lg cursor-pointer flex items-center justify-between bg-white hover:shadow-sm transition w-full"
      >
        <span className="mr-2 text-sm text-gray-700 truncate">
          {format(range[0].startDate, "dd MMM yyyy")} -{" "}
          {format(range[0].endDate, "dd MMM yyyy")}
        </span>
        <img src={calendarIcon} alt="calendar" className="w-5 h-5 flex-shrink-0" />
      </div>

      {/* Date Picker */}
      {showPicker && (
        <div
          className={`${
            isMobile
              ? "fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-30"
              : "absolute top-full right-0 mt-2 z-50"
          }`}
        >
          <div className="bg-white rounded-lg shadow-lg p-2" onClick={(e) => e.stopPropagation()}>
            <DateRange
              editableDateInputs={true}
              onChange={handleChange}
              moveRangeOnFirstSelection={false}
              ranges={range}
              months={isMobile ? 1 : 2}
              direction={isMobile ? "vertical" : "horizontal"}
              rangeColors={["#007bff"]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePickerComponent;
