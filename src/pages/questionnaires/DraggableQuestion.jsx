import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const DraggableQuestion = ({ questionData, index, moveQuestion, setIsApplyFocus, QuestionTypeMap }) => {
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

export default DraggableQuestion; 