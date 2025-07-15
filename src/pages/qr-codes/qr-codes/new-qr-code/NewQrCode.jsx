import React, { useEffect, useState } from "react";
import { t } from "i18next";
import QuestionsTypes from "./QuestionsTypes";
import plusSign from "../../../../assets/icons/plusSign.svg";

const NewQrCode = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [chosenQuestionType, setChosenQuestionType] = useState(null);
  const [showGroupsDropdown, setShowGroupsDropdown] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [currentSteps, setCurrentSteps] = useState([]);
  const [activeTab, setActiveTab] = useState(null);

  // Mock data for available steps/groups
  const steps = [
    { id: "1", name: "cleaning" },
    { id: "2", name: "restaurant" },
    { id: "3", name: "customers" },
    { id: "4", name: "service" },
    { id: "5", name: "facility" },
  ];

  const showTypes = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAddGroup = () => {
    setShowGroupsDropdown(!showGroupsDropdown);
  };

  const handleSelectGroup = (step) => {
    // Check if group is already selected
    const isAlreadySelected = selectedGroups.find(group => group.id === step.id);
    if (isAlreadySelected) return;

    // Add to selected groups
    const newSelectedGroups = [...selectedGroups, step];
    setSelectedGroups(newSelectedGroups);

    // Add to currentSteps with empty questions array
    const newStep = {
      id: step.id,
      name: step.name,
      questions: []
    };
    setCurrentSteps([...currentSteps, newStep]);

    // Set as active tab if it's the first one
    if (currentSteps.length === 0) {
      setActiveTab(step.id);
    }

    setShowGroupsDropdown(false);
  };

  const handleTabClick = (groupId) => {
    setActiveTab(groupId);
  };

  const handleRemoveTab = (groupId) => {
    setSelectedGroups(selectedGroups.filter(group => group.id !== groupId));
    setCurrentSteps(currentSteps.filter(step => step.id !== groupId));
    
    // If removing active tab, set first remaining tab as active
    if (activeTab === groupId && selectedGroups.length > 1) {
      const remainingGroups = selectedGroups.filter(group => group.id !== groupId);
      setActiveTab(remainingGroups[0]?.id || null);
    } else if (selectedGroups.length === 1) {
      setActiveTab(null);
    }
  };

  useEffect(() => {
    console.log("chosenQuestionType::", chosenQuestionType);
  }, [chosenQuestionType]);

  return (
    // Qr Codes / New Qr Code
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="font-normal text-[14px] leading-[14px] tracking-[0.28px] text-gray_l">
          {" "}
          Qr Codes /
        </div>
        <div className="font-normal text-[14px] leading-[14px] tracking-[0.28px] text-main">
          {" "}
          New Qr Code
        </div>
      </div>

     

      {/* start add question header */}
      <QuestionsTypes setAnchorEl={setAnchorEl} anchorEl={anchorEl} setChosenType={setChosenQuestionType}/>
      <div className="flex flex-col gap-4 bg-white rounded-[10px] p-4">
        <div className="flex  items-center  justify-between gap-4 w-full">
          <div className="bg-main py-3 px-4 rounded-[10px] w-full flex items-center">
            <input
              placeholder="Title"
              className="bg-transparent w-full text-white  border-b border-white border-t-0 border-l-0 border-r-0 p-2 me-4 outline-none text-xl placeholder-white"
              // onChange={(e) => handleQuestioneirTitle(e.target.value)}
            />
            <div
              onClick={showTypes}
              className="flex items-center justify-center gap-2 bg-white p-2 rounded-[10px] cursor-pointer  w-[200px]"
            >
              <img src={plusSign} alt="plus" />
              <div className="text-[18px] font-medium text-center">{t("text.Add_Question")}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <div
              onClick={() => {}}
              className="flex items-center justify-center  px-4 py-4 rounded-[10px]  text-white cursor-pointer bg-green"
            >
              {t("text.Save")}
            </div>
            <div
              onClick={() => {}}
              className="flex items-center justify-center  px-4 py-4 rounded-[10px]  text-white cursor-pointer bg-red"
            >
              {t("text.Cancel")}
            </div>
          </div>
        </div>
         {/* Groups/Tabs Section */}
        <div className="bg-white rounded-[10px] ">
          <div className="flex items-center gap-2 mb-4">
            {selectedGroups.map((group) => (
              <div
                key={group.id}
                className={`px-4 py-2 rounded-[10px] cursor-pointer flex items-center gap-2 ${
                  activeTab === group.id 
                    ? 'bg-main text-white' 
                    : 'bg-gray-200 text-black'
                }`}
                onClick={() => handleTabClick(group.id)}
              >
                <span className="capitalize">{group.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveTab(group.id);
                  }}
                  className="ml-2 text-xs hover:text-red-500"
                >
                  ×
                </button>
              </div>
            ))}
            
            {/* Add Group Button */}
            <div className="relative">
              <button
                onClick={handleAddGroup}
                className="px-4 py-2 rounded-[10px] bg-gray-200 text-black cursor-pointer flex items-center gap-2"
              >
                <img src={plusSign} alt="plus" className="w-4 h-4" />
                <span>Add Group</span>
              </button>
              
              {/* Dropdown */}
              {showGroupsDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-[10px] shadow-lg z-10 min-w-[200px]">
                  {steps.map((step) => {
                    const isSelected = selectedGroups.find(group => group.id === step.id);
                    return (
                      <div
                        key={step.id}
                        onClick={() => handleSelectGroup(step)}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 capitalize ${
                          isSelected ? 'bg-main text-gray-500' : ''
                        }`}
                      >
                        {step.name}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Active Tab Content */}
          {activeTab && (
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-4">
                {selectedGroups.find(group => group.id === activeTab)?.name} Questions
              </h3>
              {/* Questions content will go here */}
              <div className="text-gray-500">
                No questions added yet. Use the "Add Question" button below to add questions to this group.
              </div>
            </div>
          )}
        </div>
      </div>
      {/* end add question header */}
    </div>
  );
};

export default NewQrCode;
