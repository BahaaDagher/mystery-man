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
import QuestionnaireDisplay from './QuestionnaireDisplay'
import QrCodeModal from './QrCodeModal'

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
      <QrCodeModal 
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        item={item}
        copied={copied}
        handleCopyUrl={handleCopyUrl}
        handleDownloadPDF={handleDownloadPDF}
      />
    </>
  )
}

export default QrCodesCart