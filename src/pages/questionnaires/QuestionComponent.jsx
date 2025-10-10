import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Choices from './questions/Choices';
import YesOrNo from './questions/YesOrNo';
import RatingQuestion from './questions/RatingQuestion';
import OpenQuestion from './questions/OpenQuestion';
import UploadImages from './questions/UploadImages';
import HeadLine from './questions/HeadLine';
import { useDispatch } from 'react-redux';
import { handleMoveQuestion } from '../../store/slices/questionierSlice';

const QuestionTypeMap = {
  SingleChoice: Choices,
  multiChoice: Choices,
  yesOrNo: YesOrNo,
  rating: RatingQuestion,
  open: OpenQuestion,
  uploadImages: UploadImages,
  headLine: HeadLine,
};

// Auto-scroll variables
let scrollSpeed = 0;
let scrollInterval = null;

// Function to handle auto-scrolling with improved speed and direction
const startAutoScroll = (direction) => {
  // Clear existing interval if any
  if (scrollInterval) {
    clearInterval(scrollInterval);
  }
  
  // Set scroll speed based on direction (negative for up, positive for down)
  // Increased speed for better user experience
  scrollSpeed = direction * 15; // Increased from 5 to 15 for faster scrolling
  scrollInterval = setInterval(() => {
    window.scrollBy(0, scrollSpeed);
  }, 20);
};

// Function to stop auto-scrolling
const stopAutoScroll = () => {
  if (scrollInterval) {
    clearInterval(scrollInterval);
    scrollInterval = null;
  }
};

const DraggableQuestion = ({ questionData, index, moveQuestion ,setIsApplyFocus}) => {
  const ref1 = useRef(null);

  const [, drop] = useDrop({
    accept: 'QUESTION',
    hover: (item, monitor) => {
      if (!ref1.current) {
        return;
      }
      
      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex) {
        return;
      }

      // Get the bounding rectangle of the target element
      const hoverBoundingRect = ref1.current.getBoundingClientRect();
      
      // Get the client offset of the drag
      const clientOffset = monitor.getClientOffset();
      
      // Calculate positions for auto-scroll
      const scrollThreshold = 30; // Reduced threshold for more responsive scrolling
      const windowTop = window.scrollY;
      const windowBottom = windowTop + window.innerHeight;
      const hoverTop = hoverBoundingRect.top + window.scrollY;
      const hoverBottom = hoverBoundingRect.bottom + window.scrollY;
      
      // Check if we need to scroll up (when element is near top of viewport)
      if (hoverTop < windowTop + scrollThreshold && windowTop > 0) {
        startAutoScroll(-1); // Scroll up
        console.log("uppp")
      }
      // Check if we need to scroll down (when element is near bottom of viewport)
      else if (hoverBottom > windowBottom - scrollThreshold) {
        startAutoScroll(1); // Scroll down
        console.log("down")
      }
      // Stop scrolling if we're in the middle
      else {
        stopAutoScroll();
      }

      // Move the question
      moveQuestion(draggedIndex, targetIndex);
      item.index = targetIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'QUESTION',
    item: { type: 'QUESTION', index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => {
      // Stop auto-scrolling when drag ends
      stopAutoScroll();
    },
  });

  // Attach the drag and drop refs to the component
  drag(drop(ref1));

  const QuestionComponent = QuestionTypeMap[questionData.type];

  return (
    <div ref={preview}>
      <div ref={ref1} style={{ opacity: isDragging ? 0 : 1 }}>
        <QuestionComponent questionData={questionData} index={index} setIsApplyFocus={setIsApplyFocus} />
      </div>
    </div>
  );
};

const QuestionComponent = ({ questions ,setIsApplyFocus}) => {
  const dispatch = useDispatch() ; 
  const moveQuestion = (fromIndex, toIndex) => {
    console.log('llllllllllll',fromIndex,toIndex);
    dispatch(handleMoveQuestion({fromIndex, toIndex}))
  };
  

  return (
    <div>
      {questions.map((question, index) => (
        <DraggableQuestion
          key={index}
          questionData={question}
          index={index}
          moveQuestion={moveQuestion}
          setIsApplyFocus={setIsApplyFocus}
        />
      ))}
    </div>
  );
};

export default QuestionComponent;