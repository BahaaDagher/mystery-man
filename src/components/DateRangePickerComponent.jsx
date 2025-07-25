import React, { useState, useEffect, useRef } from "react";
import { DateRange } from "react-date-range";
import { format, startOfDay, endOfDay, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import calendarIcon from "../assets/icons/calenderIcon.svg";

const DateRangePickerComponent = ({ onDateChange }) => {
  const [range, setRange] = useState([
    {
      startDate: startOfMonth(new Date()),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [showPicker, setShowPicker] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const [selectedPreset, setSelectedPreset] = useState("");
  const [tempRange, setTempRange] = useState(range);
  const wrapperRef = useRef(null);

  // Preset date functions
  const getPresetDates = (preset) => {
    const now = new Date();
    switch (preset) {
      case "today":
        return { startDate: startOfDay(now), endDate: endOfDay(now) };
      case "yesterday":
        const yesterday = subDays(now, 1);
        return { startDate: startOfDay(yesterday), endDate: endOfDay(yesterday) };
      case "thisWeek":
        return { startDate: startOfWeek(now, { weekStartsOn: 1 }), endDate: endOfWeek(now, { weekStartsOn: 1 }) };
      case "lastWeek":
        const lastWeek = subDays(now, 7);
        return { startDate: startOfWeek(lastWeek, { weekStartsOn: 1 }), endDate: endOfWeek(lastWeek, { weekStartsOn: 1 }) };
      case "thisMonth":
        return { startDate: startOfMonth(now), endDate: endOfMonth(now) };
      case "lastMonth":
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        return { startDate: startOfMonth(lastMonth), endDate: endOfMonth(lastMonth) };
      case "thisYear":
        return { startDate: startOfYear(now), endDate: endOfYear(now) };
      case "lastYear":
        const lastYear = new Date(now.getFullYear() - 1, 0, 1);
        return { startDate: startOfYear(lastYear), endDate: endOfYear(lastYear) };
      case "allTimes":
        return { startDate: new Date(now.getFullYear() - 10, now.getMonth(), now.getDate()), endDate: now };
      default:
        return { startDate: now, endDate: now };
    }
  };

  const handlePresetClick = (preset) => {
    setSelectedPreset(preset);
    const dates = getPresetDates(preset);
    const newRange = [{ ...dates, key: "selection" }];
    setTempRange(newRange);
  };

  // Detect window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
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
    setTempRange([item.selection]);
    setSelectedPreset("custom");
  };

  const handleApply = () => {
    setRange(tempRange);
    if (typeof onDateChange === "function") {
      onDateChange(tempRange[0]);
    }
    setShowPicker(false);
  };

  const handleCancel = () => {
    setTempRange(range);
    setSelectedPreset("custom");
    setShowPicker(false);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative inline-block z-15 w-full max-w-sm sm:max-w-md md:max-w-lg"
    >
      {/* Trigger Button */}
      <div
        onClick={() => setShowPicker(true)}
        className="border border-gray_l px-4 py-2 rounded-lg cursor-pointer flex items-center justify-between  hover:shadow-sm transition w-full"
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
              ? "fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-30 p-4"
              : "absolute top-full right-0 mt-2 z-50"
          }`}
        >
          <div className={`bg-white rounded-lg shadow-lg border border-gray-200 ${isMobile ? 'w-full max-w-md max-h-[90vh] overflow-y-auto' : ''}`} onClick={(e) => e.stopPropagation()}>
            <div className={`${isMobile ? 'flex-col' : 'flex'}`}>
              {/* Left Sidebar - Preset Options */}
              <div className={`${isMobile ? 'w-full' : 'w-48'} bg-gray-50 p-4 ${isMobile ? 'border-b border-gray-200' : 'border-r border-gray-200'}`}>
                <div className={`${isMobile ? 'grid grid-cols-2 gap-2' : 'space-y-2'}`}>
                  {[
                    { key: "today", label: "Today" },
                    { key: "yesterday", label: "Yesterday" },
                    { key: "thisWeek", label: "this week" },
                    { key: "lastWeek", label: "last week" },
                    { key: "thisMonth", label: "this month" },
                    { key: "lastMonth", label: "last month" },
                    { key: "thisYear", label: "this year" },
                    { key: "lastYear", label: "last year" },
                    { key: "allTimes", label: "all times" },
                  ].map((preset) => (
                    <div
                      key={preset.key}
                      onClick={() => handlePresetClick(preset.key)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer border border-gray-200 ${
                        selectedPreset === preset.key
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {preset.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Calendar Area */}
              <div className={`${isMobile ? 'w-full' : 'flex-1'} p-4`}>
                <DateRange
                  editableDateInputs={false}
                  onChange={handleChange}
                  moveRangeOnFirstSelection={false}
                  ranges={tempRange}
                  months={isMobile ? 1 : 2}
                  direction={isMobile ? "vertical" : "horizontal"}
                  rangeColors={["#007bff"]}
                  showDateDisplay={false}
                  showMonthAndYearPickers={true}
                  weekdayDisplayFormat="EEEEEE"
                />
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <div className={`${isMobile ? 'flex-col space-y-3' : 'flex items-center justify-between'}`}>
                <div className={`${isMobile ? 'flex-col space-y-2' : 'flex items-center space-x-2'}`}>
                  <span className="text-sm text-gray-600">Selected Range:</span>
                  <div className={`${isMobile ? 'flex-col space-y-1' : 'flex items-center space-x-2'}`}>
                    <div className="px-3 py-1 bg-white border border-gray-300 rounded text-sm">
                      {format(tempRange[0].startDate, "dd MMM yyyy")}
                    </div>
                    <span className="text-gray-400">-</span>
                    <div className="px-3 py-1 bg-white border border-gray-300 rounded text-sm">
                      {format(tempRange[0].endDate, "dd MMM yyyy")}
                    </div>
                  </div>
                </div>
                <div className={`${isMobile ? 'flex space-x-2' : 'flex space-x-2'}`}>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApply}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePickerComponent;
