import React, { useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import styled from "@emotion/styled";
import { Colors } from "../../Theme";
import { FlexCenter } from "../../components/FlexCenter";

const StepName = styled("span")(({ theme }) => ({
  width: "fit-content",
}));

const StepInput = styled("input")(({ theme }) => ({
    backgroundColor: "transparent",
    width: "100%",
    color: Colors.gray_l,
    border: "1px solid transparent",
    borderBottom: "1px solid #fff",
    outline: "none",
    fontSize: "20px",
    "::placeholder": {
      color: Colors.gray_l,
    },
    "::selection": {
      backgroundColor: Colors.hoverMain,
    },
    "&.active": {
      color: "white",
      backgroundColor: Colors.second,
    },
  }));


  
  const DeleteStep = styled(FlexCenter)(({ theme }) => ({
    position: "absolute",
    fontSize: "12px",
    fontWeight: "bold",
    border: "2px solid #fff",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    right: theme.direction == "rtl" ? "-10px" : "auto",
    left: theme.direction == "ltr" ? "-10px" : "auto",
    top: "-7px",
    backgroundColor: Colors.red,
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: Colors.hoverRed,
    },
  }));

const StepComponent = ({
  answer,
  index,
  focusedStep,
  moveStep,
  handleClickStep,
  handleStepTitle,
  handleRemoveStep,
  activeStep,
  setActiveStep,
  setIsApplyFocus,
}) => {
  const ref = useRef(null);
  useEffect(() => {
    if (setIsApplyFocus && focusedStep === index && ref.current) {
      ref.current.focus();
    }
  }, [focusedStep, setIsApplyFocus, index]);

  const [, drop] = useDrop({
    accept: "STEP",
    hover: (item) => {
      const draggedIndex = item.index;
      const targetIndex = index;
      if (draggedIndex === targetIndex) return;
      moveStep(draggedIndex, targetIndex);
      item.index = targetIndex;
    },
  });

  const [, drag] = useDrag({
    type: "STEP",
    item: { type: "STEP", index },
  });

  drag(drop(ref));

  const handleInputChange = (e) => {
    const { selectionStart, selectionEnd } = e.target;
    handleStepTitle(e.target.value);
    setTimeout(() => {
      if (ref.current) {
        ref.current.setSelectionRange(selectionStart, selectionEnd);
      }
    }, 0);
  };

  return (
    <>
      <StepName
        onClick={() => {
          handleClickStep(index, answer.questions);
          setActiveStep(index);
          setIsApplyFocus(true);
        }}
      >
        <StepInput
          value={answer.name}
          ref={ref}
          placeholder="Step Title"
          onChange={handleInputChange}
          onMouseDown={(e) => e.stopPropagation()}
          className={activeStep === index ? "active" : ""}
        />
      </StepName>
      <DeleteStep onClick={() => handleRemoveStep(index, answer.questions)}>
        x
      </DeleteStep>
    </>
  );
};

export default StepComponent; 