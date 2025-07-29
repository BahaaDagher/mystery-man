import React, { useState, useEffect } from 'react'
import { SubmitButton } from '../../../components/SubmitButton'
import { useTranslation } from 'react-i18next';
import plusSign from '../../../assets/icons/plusSign.svg';
import editIcon from '../../../assets/icons/editIcon.svg';
import deleteIcon from '../../../assets/icons/deleteIcon.svg';
import Swal from 'sweetalert2';

const Quiz = ({ onPrev, onNext, initialData = [], onQuizDataChange }) => {
  const { t } = useTranslation();
  const [questions, setQuestions] = useState(initialData);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    answer: 1,
    option_1: '',
    option_2: '',
    option_3: '',
    option_4: ''
  });

  useEffect(() => {
    setQuestions(initialData);
  }, [initialData]);

  // Update parent component whenever questions change
  useEffect(() => {
    if (onQuizDataChange) {
      onQuizDataChange(questions);
    }
  }, [questions, onQuizDataChange]);

  const handleOptionChange = (optionNumber) => {
    setNewQuestion({ ...newQuestion, answer: optionNumber });
  };

  const handleAddQuestion = () => {
    // Check if question is empty
    if (!newQuestion.question.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Question Required',
        text: 'Please enter a question before saving.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
      return;
    }

    // Check if any option is empty
    let hasEmptyOption = false;
    for (let i = 1; i <= 4; i++) {
      if (!newQuestion[`option_${i}`].trim()) {
        hasEmptyOption = true;
        break;
      }
    }

    if (hasEmptyOption) {
      Swal.fire({
        icon: 'error',
        title: 'Options Required',
        text: 'Please fill in all options before saving.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
      return;
    }

    // All validations passed
    if (editingIndex !== null) {
      // Editing existing question
      const updatedQuestions = [...questions];
      updatedQuestions[editingIndex] = { ...newQuestion };
      setQuestions(updatedQuestions);
      setEditingIndex(null);
      
      Swal.fire({
        icon: 'success',
        title: 'Question Updated',
        text: 'Question has been updated successfully.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    } else {
      // Adding new question
      setQuestions([...questions, { ...newQuestion }]);
      
      Swal.fire({
        icon: 'success',
        title: 'Question Added',
        text: 'Question has been added successfully.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    }
    
    setNewQuestion({
      question: '',
      answer: 1,
      option_1: '',
      option_2: '',
      option_3: '',
      option_4: ''
    });
    setShowAddQuestion(false);
  };

  const handleEditQuestion = (index) => {
    setNewQuestion({ ...questions[index] });
    setEditingIndex(index);
    setShowAddQuestion(true);
  };

  const handleDeleteQuestion = (index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete question "${questions[index].question}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
        Swal.fire(
          'Deleted!',
          'Question has been deleted.',
          'success'
        );
      }
    });
  };

  const handleCancelEdit = () => {
    setNewQuestion({
      question: '',
      answer: 1,
      option_1: '',
      option_2: '',
      option_3: '',
      option_4: ''
    });
    setEditingIndex(null);
    setShowAddQuestion(false);
  };

  const handleNext = () => {
    if (questions.length > 0) {
      console.log('Quiz data:', questions);
      onNext();
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'No Questions Added',
        text: 'Please add at least one question to continue.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    }
  };

  const handlePrev = () => {
    onPrev();
  };

  return (
    <div className="w-full p-4 rounded-[10px] bg-white mr-2.5 lg:w-[70%]">
        <div className="flex justify-between items-center mb-5">
            <div 
            onClick={handlePrev}
            className="cursor-pointer w-30 px-4 py-2 bg-white border border-main text-main rounded-lg  "
            >
            {t("text.previous")}
            </div>
            <div 
            onClick={handleNext}
            className="cursor-pointer w-30 px-4 py-2 bg-main text-white rounded-lg"
            >
            {t("text.Next")}
            </div>
        </div>

      <div>
        <div className="text-lg mb-1.5">{t("text.Quiz")}</div>
        <div className="text-gray-400 text-sm">
          {t("text.Quiz_description")}
        </div>
      </div>
      
      <div className="h-px bg-gray-200 my-5 w-full"></div>
      
      {/* Quiz Questions List */}
      <div className="mb-5">
        {questions.map((q, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div className="font-semibold">Question {index + 1}: {q.question}</div>
              <div className="flex space-x-2 ">
                <div 
                  onClick={() => handleEditQuestion(index)}
                  className="cursor-pointer"
                >
                  <img src={editIcon} alt="Edit" className="w-6 h-6" />
                </div>
                <div 
                  onClick={() => handleDeleteQuestion(index)}
                  className="cursor-pointer"
                >
                  <img src={deleteIcon} alt="Delete" className="w-6 h-6" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((optionNum) => (
                <div key={optionNum} className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    q.answer === optionNum ? 'bg-main border-main' : 'border-gray-300'
                  }`}></div>
                  <span className={q.answer === optionNum ? 'font-semibold text-main' : ''}>
                    {q[`option_${optionNum}`]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Question Button */}
      <div className="flex items-center mb-5">
        <div 
          onClick={() => setShowAddQuestion(true)}
          className="flex items-center cursor-pointer px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          <img src={plusSign} alt="Add" className="w-5 h-5 mr-2" />
          <span>Add Question</span>
        </div>
      </div>

      {/* Add Question Form */}
      {showAddQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingIndex !== null ? 'Edit Question' : 'Add New Question'}
              </h3>
              <div
                onClick={handleCancelEdit}
                className="flex items-center justify-center cursor-pointer h-6 w-6 border border-red rounded-full p-1 text-gray-500 hover:text-red "
              >
                ×
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Question:</label>
              <input
                type="text"
                value={newQuestion.question}
                onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter your question"
              />
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-medium mb-2">Options:</label>
              {[1, 2, 3, 4].map((optionNum) => (
                <div key={optionNum} className="flex items-center">
                  <div 
                    onClick={() => handleOptionChange(optionNum)}
                    className={`w-4 h-4 rounded-full border mr-3 cursor-pointer ${
                      newQuestion.answer === optionNum ? 'bg-main border-main' : 'border-grayDC'
                    }`}
                  ></div>
                  <input
                    type="text"
                    value={newQuestion[`option_${optionNum}`]}
                    onChange={(e) => setNewQuestion({...newQuestion, [`option_${optionNum}`]: e.target.value})}
                    className="flex-1 p-2 border border-gray-300 rounded-lg"
                    placeholder={`Option ${optionNum}`}
                  />
                </div>
              ))}
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddQuestion}
                className="px-4 py-2 bg-main text-white rounded-lg hover:bg-blue-700"
              >
                {editingIndex !== null ? 'Update Question' : 'Add Question'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      
    </div>
  )
}

export default Quiz