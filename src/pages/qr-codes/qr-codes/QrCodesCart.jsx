import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import location from '../../../assets/icons/location2.svg'
import deleteIcon from '../../../assets/icons/deleteIcon.svg'
import editIcon from '../../../assets/icons/editIcon.svg'
import showIcon from '../../../assets/icons/ShowIcon.svg'
import printIcon from '../../../assets/icons/PrintIcon.svg'
import { generateQrPrintHtml } from './generateQrPrintHtml'
import { deleteQrCodeBranch } from '../../../store/slices/QrCode'
import Loading from '../../../components/Loading'

const QrCodesCart = ({ item, onDeleteSuccess }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Get delete state from Redux
  const deleteQrCodeBranchData = useSelector(state => state.qrCodeData.deleteQrCodeBranchData);
  const deleteQrCodeBranchLoading = useSelector(state => state.qrCodeData.deleteQrCodeBranchLoading);
  
  const handleDownloadImage = () => {
    if (item?.image) {
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = item.image;
      link.download = `${item?.name || t('text.qr_code')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(item?.url || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      setCopied(false);
    }
  }

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDownloadPDF = () => {
    if (!item?.image) return;

    // Create optimized print content
    const printContent = generateQrPrintHtml({
      qrCodeName: item?.name,
      qrCodeImage: item?.image,
      branchName: item?.branch_name,
      address: item?.branch_address,
    });

    try {
      // Create a hidden iframe for printing
      const iframe = document.createElement('iframe');
      iframe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:800px;height:600px;border:none;';
      document.body.appendChild(iframe);
      
      // Write content to iframe
      iframe.contentDocument.write(printContent);
      iframe.contentDocument.close();
      
      // Wait for image to load then print
      const img = iframe.contentDocument.querySelector('.qr-image');
      
      const printAndCleanup = () => {
        try {
          iframe.contentWindow.print();
        } catch (printError) {
          console.warn('Print failed, trying fallback:', printError);
          // Final fallback - print current page
          window.print();
        }
        
        // Clean up iframe after a delay
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
        }, 2000);
      };
      
      if (img) {
        // If image is already loaded
        if (img.complete) {
          printAndCleanup();
        } else {
          // Wait for image to load
          img.onload = printAndCleanup;
          img.onerror = printAndCleanup; // Print even if image fails to load
        }
      } else {
        // If no image found, print anyway
        printAndCleanup();
      }
      
    } catch (error) {
      console.warn('Iframe creation failed, using fallback:', error);
      // Fallback: Simple print of current page
      window.print();
    }
  };

  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: t('text.Are_you_sure'),
        text: t('text.Delete_QR_Code_Confirmation'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: t('text.Yes_delete_it'),
        cancelButtonText: t('text.Cancel')
      });

      if (result.isConfirmed) {
        const response = await dispatch(deleteQrCodeBranch(item.id)).unwrap();
        
        if (response && response.status === true) {
          await Swal.fire({
            title: t('text.Deleted'),
            text: t('text.QR_Code_deleted_successfully'),
            icon: 'success',
            confirmButtonColor: '#3085d6'
          });
          
          // Call the callback to refresh the parent component
          if (onDeleteSuccess) {
            onDeleteSuccess();
          }
        } else {
          await Swal.fire({
            title: t('text.Error'),
            text: t('text.Failed_to_delete_QR_Code'),
            icon: 'error',
            confirmButtonColor: '#3085d6'
          });
        }
      }
    } catch (error) {
      console.error('Delete error:', error);
      await Swal.fire({
        title: t('text.Error'),
        text: t('text.Something_went_wrong'),
        icon: 'error',
        confirmButtonColor: '#3085d6'
      });
    }
  };

  return (
    <>
      {deleteQrCodeBranchLoading ? <Loading /> : null}
      
      <div className='bg-white rounded-[10px] p-[10px] flex flex-col gap-1 w-full'>
          <div className='flex items-center justify-between'>
              <div className='flex flex-col'>
                  <div className='font-medium text-[18px]  text-second'>{item?.name}</div>
                  <div className='font-medium text-[14px]  text-gray-600'>{item?.branch_name}</div>
              </div>
              <div className='flex items-center gap-2'>
                  <div className='cursor-pointer' onClick={handleDelete} title={t('text.Delete_QR_Code')}> 
                    <img src={deleteIcon} alt={t('text.Delete_QR_Code')} />
                  </div>
                  {/* <div className='cursor-pointer' onClick={()=>{}}> <img src={editIcon} alt="" /></div> */}
                  <div className='cursor-pointer' onClick={handleShowModal} title={t('text.View_QR_Code_Options')}> 
                    <img src={showIcon} alt={t('text.View_QR_Code_Options')} />
                  </div>
              </div>
          </div>
          <div className='font-bold text-[14px] leading-[21.28px] tracking-[2%]'>{item?.used_count} / {item?.count} {t("text.responses")}</div>
          <div className='flex items-center gap-2'>
              <div className=''>
                  <img src={location} alt={t('text.Location')} />
              </div>
              <div className='font-medium text-[16px] leading-[22.4px] text-second'>{item?.branch_address}</div>
          </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
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
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default QrCodesCart