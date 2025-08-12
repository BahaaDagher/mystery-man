import React from 'react'
import { useTranslation } from 'react-i18next'

const QuestionsModal = ({ isOpen, onClose, questions }) => {
  const { t } = useTranslation()

  // Helper function to render question type
  const renderQuestionType = (type) => {
    const typeMap = {
      'yesOrNo': 'Yes/No',
      'singleChoice': 'Single Choice',
      'multiChoice': 'Multiple Choice',
      'rating': 'Rating',
      'open': 'Open Question',
      'uploadImages': 'Upload Images',
      'headLine': 'Headline'
    }
    return typeMap[type] || type
  }

  if (!isOpen || !questions) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">
            {t('text.Questionnaire_Details')} - {questions.title}
          </h3>
          <div
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold cursor-pointer w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            ×
          </div>
        </div>
        
        <div className="p-6">
          {/* Questionnaire Info */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">{t('text.Questionnaire_Information')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-blue-800">{t('text.ID')}:</span>
                <span className="ml-2 text-blue-700">{questions.id}</span>
              </div>
              <div>
                <span className="font-medium text-blue-800">{t('text.Title')}:</span>
                <span className="ml-2 text-blue-700">{questions.title}</span>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              {t('text.Steps')} ({questions.steps?.length || 0})
            </h4>
            
            {questions.steps?.map((step, stepIndex) => (
              <div key={step.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm mr-3">
                    {stepIndex + 1}
                  </div>
                  <h5 className="text-lg font-semibold text-gray-900">{step.name}</h5>
                </div>
                
                {/* Questions in this step */}
                <div className="ml-11 space-y-4">
                  <h6 className="font-medium text-gray-700 mb-3">
                    {t('text.Questions')} ({step.questions?.length || 0})
                  </h6>
                  
                  {step.questions?.map((question, questionIndex) => (
                    <div key={question.id} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-semibold mr-3">
                            {questionIndex + 1}
                          </span>
                          <h6 className="font-medium text-gray-900">{question.title}</h6>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            question.required ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {question.required ? t('text.Required') : t('text.Optional')}
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {renderQuestionType(question.type)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Question details */}
                      <div className="ml-9 space-y-2 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">{t('text.Question_ID')}:</span>
                          <span className="ml-2">{question.id}</span>
                        </div>
                        <div>
                          <span className="font-medium">{t('text.Type')}:</span>
                          <span className="ml-2">{renderQuestionType(question.type)}</span>
                        </div>
                        
                        {/* Show choices if available */}
                        {question.choices && question.choices.length > 0 && (
                          <div>
                            <span className="font-medium">{t('text.Choices')}:</span>
                            <div className="ml-2 mt-1">
                              {question.choices.map((choice, choiceIndex) => (
                                <div key={choice.id || choiceIndex} className="flex items-center space-x-2">
                                  <span className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                                    {choiceIndex + 1}
                                  </span>
                                  <span>{choice.title || choice}</span>
                                  {choice.rate && (
                                    <span className="text-xs text-gray-500">({choice.rate}%)</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            {t('text.Close')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuestionsModal 