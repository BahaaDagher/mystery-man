import React from 'react';
import DraggableQuestion from './DraggableQuestion';
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

const QuestionComponent = ({ questions, setIsApplyFocus }) => {
  const dispatch = useDispatch();
  const moveQuestion = (fromIndex, toIndex) => {
    console.log('llllllllllll', fromIndex, toIndex);
    dispatch(handleMoveQuestion({ fromIndex, toIndex }));
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
          QuestionTypeMap={QuestionTypeMap}
        />
      ))}
    </div>
  );
};

export default QuestionComponent;
