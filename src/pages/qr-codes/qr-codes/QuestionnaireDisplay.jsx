import React from 'react';
import { useTranslation } from 'react-i18next';

const QuestionnaireDisplay = ({ questionnaire }) => {
  const { t } = useTranslation();

  if (!questionnaire) {
    return null;
  }

  return (
    <div className="mt-6 border-t pt-4">
      <h4 className="text-lg font-semibold text-gray-900 mb-3">
        {questionnaire?.title || t('text.Questionnaire')}
      </h4>
      
      {questionnaire?.steps && questionnaire?.steps.length > 0 && (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {questionnaire.steps.map((step, stepIndex) => (
            <div key={step.id || stepIndex} className="bg-gray-50 rounded-lg p-4">
              <h5 className="font-medium text-gray-800 mb-3">
                {t('text.Step')} {stepIndex + 1}: {step.name}
              </h5>
              
              {step.questions && step.questions.length > 0 && (
                <div className="space-y-2">
                  {step.questions.map((question, questionIndex) => (
                    <div key={question.id || questionIndex} className="bg-white rounded p-3">
                      <div className="flex items-start gap-2">
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded font-medium min-w-fit">
                          {questionIndex + 1}
                        </span>
                        <div className="flex-1">
                          <div className="font-medium text-gray-800 text-sm mb-1">
                            {question.title}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="px-2 py-1 rounded bg-pink-100 text-pink-600">
                              {t(`text.${question.type}`)}
                            </span>
                            {question.required && (
                              <span className="bg-red text-white px-2 py-1 rounded">
                                {t('text.Required')}
                              </span>
                            )}
                          </div>
                          
                          {/* Show choices for SingleChoice and multiChoice */}
                          {(question.type === 'SingleChoice' || question.type === 'multiChoice') && 
                           question.choices && question.choices.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {question.choices.map((choice, choiceIndex) => (
                                <div key={choice.id || choiceIndex} className="text-xs bg-gray-50 p-2 rounded flex justify-between">
                                  <span>{choice.title}</span>
                                  <span className="text-gray-500"> {choice.rate}%</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionnaireDisplay;