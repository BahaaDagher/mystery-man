import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import printIcon from '../../../assets/icons/PrintIcon.svg';
import QuestionnaireDisplay from './QuestionnaireDisplay';

const QrCodeModal = ({ 
  showModal, 
  handleCloseModal, 
  item, 
  copied, 
  handleCopyUrl, 
  handleDownloadPDF 
}) => {
  const { t } = useTranslation();

  // Handle ESC key press
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showModal, handleCloseModal]);

  // Handle click outside modal
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  };

  if (!showModal) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{t("text.QR_Code_Options")}</h3>
          <div
            onClick={handleCloseModal}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center cursor-pointer transition-all duration-200 text-gray-500 hover:text-gray-700"
            title={t('text.Close')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="text-center">
            <img 
              src={item?.image} 
              alt={t('text.QR_Code_Image')} 
              className="max-w-full h-auto max-h-48 mx-auto mb-4"
            />
            <div className="text-sm text-gray-600 mb-4">
              <div className="font-medium">{item?.name}</div>
              <div>{t("text.Branch")}: {item?.branch_name}</div>
              <div>{t("text.responses")}: {item?.used_count} / {item?.count}</div>
              {item?.url && (
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className="font-medium">{t('text.URL')}:</span>
                  <a 
                    href={item?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-blue-600 hover:text-blue-800 underline cursor-pointer"
                    title={t('text.Open_URL_in_new_tab')}
                  >
                    {item?.url}
                  </a>
                  <div
                    onClick={handleCopyUrl}
                    className="p-1 rounded hover:bg-gray-100"
                    title={copied ? t('text.Copied') : t('text.Copy_URL')}
                    aria-label={t('text.Copy_URL')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-700">
                      <path d="M16 1H4c-1.1 0-2 .9-2 2v12h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                    </svg>
                  </div>
                  {copied && (
                    <span className="text-green-600 text-xs">{t('text.Copied')}</span>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-center gap-2">
            <div
              onClick={handleDownloadPDF}
              className=" cursor-pointer bg-green hover:bg-hoverGreen text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
              title={t('text.Print_QR_Code_as_PDF')}
            >
              <img src={printIcon} alt={t('text.Print')} className="w-5 h-5" />
              {t("text.Print_PDF")}
            </div>
          </div>
          {/* Questionnaire Details */}
          <QuestionnaireDisplay questionnaire={item?.questions} />
          
        </div>
      </div>
    </div>
  );
};

export default QrCodeModal;