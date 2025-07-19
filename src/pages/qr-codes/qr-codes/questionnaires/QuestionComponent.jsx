import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Choices from './questions/Choices';
import YesOrNo from './questions/YesOrNo';
import RatingQuestion from './questions/RatingQuestion';
import OpenQuestion from './questions/OpenQuestion';
import UploadImages from './questions/UploadImages';
import HeadLine from './questions/HeadLine';
import { useDispatch } from 'react-redux';
import { handleMoveQuestion } from '../../../../store/slices/questionierSlice';

const QuestionTypeMap = {
  SingleChoice: Choices,
  multiChoice: Choices,
  yesOrNo: YesOrNo,
  rating: RatingQuestion,
  open: OpenQuestion,
  uploadImages: UploadImages,
  headLine: HeadLine,
};

const DraggableQuestion = ({ questionData, index, moveQuestion ,setIsApplyFocus}) => {
  const ref1 = useRef(null);

  const [, drop] = useDrop({
    accept: 'QUESTION',
    hover: (item) => {
      if (!ref1.current) {
        return;
      }
      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex) {
        return;
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
