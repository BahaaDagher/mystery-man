import React from 'react'
import { useTranslation } from 'react-i18next'
import Loading from '../../../components/Loading'
import { Rating } from '@mui/material'
import { de } from 'date-fns/locale'

const QuestionsModal = ({ isOpen, onClose, responseData, loading }) => {
  const { t } = useTranslation()

  // Helper function to render answer based on question type
  const renderAnswer = (question) => {
    const { type, answer, choices } = question
    switch (type) {
      case 'SingleChoice':
        const singleChoice = choices?.find(choice => choice.id.toString() == answer)
        console.log("singleChoice" , singleChoice)
        return singleChoice ? singleChoice.title : answer
      
      case 'multiChoice':
        const answerIds = answer.split(',').map(id => id.trim())
        const selectedChoices = choices?.filter(choice => answerIds.includes(choice.id.toString()))
        const selectedTitles = selectedChoices?.map(choice => choice.title) || []
        return selectedTitles.length > 0 ? selectedTitles.join(', ') : answer
      
      case 'yesOrNo':
        return answer === 'yes' ? t('text.Yes') : t('text.No')
      
      case 'rating':
        return (
          <div className="mt-2 flex items-center gap-2">
            <Rating 
              value={parseInt(answer)} 
              readOnly 
              size="small"
              precision={0.5}
            />
          </div>
        )
      
      case 'uploadImages':
        return (
          <div className="mt-2 flex justify-center items-center flex-wrap gap-2">
            {choices?.map((choice, index) => (
              <div className=''>
                <img 
                  key={index}
                  src={choice.image} 
                  alt={`Uploaded image ${index + 1}`}
                  className="w-full h-full  rounded-lg border border-gray-200"
                />
              </div>
            ))}
          </div>
        )
      
      case 'open':
      case 'headLine':
        return (
          <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
            {answer}
          </div>
        )
      
      default:
        return answer
    }
  }

  if (!isOpen) {
    return null
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <Loading />
        </div>
      </div>
    )
  }

  if (!responseData) {
    return null
  }

  const { time, total_score, correct_answers, wrong_answers, total_answers, questions } = responseData

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">
            {t('text.Response_Details')} - {questions.title}
          </h3>
          <div
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold cursor-pointer w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            ×
          </div>
        </div>
        
        <div className="p-6">
          {/* Response Summary */}
          {/* <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-3">{t('text.Total_Score')}</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              
                <div className="text-green-700 text-xl font-semibold">{total_score}%</div>
              
            </div>
          </div> */}

          {/* Questions and Answers */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              {t('text.Questions_and_Answers')}
            </h4>
            
            {questions.steps?.map((step, stepIndex) => (
              <div key={step.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm me-3">
                    {stepIndex + 1}
                  </div>
                  <h5 className="text-lg font-semibold text-gray-900">{step.name}</h5>
                </div>
                
                {/* Questions in this step */}
                <div className=" space-y-4 ">
                  {step.questions?.map((question, questionIndex) => (
                    <div key={question.id} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                      <div className="flex items-start mb-3">
                        <span className="w-6 h-6 bg-green text-white rounded-full flex items-center justify-center text-xs font-semibold me-3">
                          {questionIndex + 1}
                        </span>
                        <h6 className="font-medium text-gray-900">{question.title}</h6>
                      </div>
                      
                      {/* Answer */}
                      <div className="ms-9">
                        <span className="font-medium text-gray-700">{t('text.Answer')}: </span>
                        <span className="text-gray-600">{renderAnswer(question)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end p-6 border-t border-gray-200">
          <div
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg bg-main transition-colors cursor-pointer"
          >
            {t('text.Close')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionsModal 