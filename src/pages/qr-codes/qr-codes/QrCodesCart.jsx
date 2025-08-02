import React, { useState } from 'react'
import location from '../../../assets/icons/location2.svg'
import deleteIcon from '../../../assets/icons/deleteIcon.svg'
import editIcon from '../../../assets/icons/editIcon.svg'
import showIcon from '../../../assets/icons/ShowIcon.svg'
import printIcon from '../../../assets/icons/PrintIcon.svg'

const QrCodesCart = ({branchName , responseCount , address, qrCodeId, qrCodeName, qrCodeImage, totalCount }) => {
  const [showModal, setShowModal] = useState(false);
  
  const handleDownloadImage = () => {
    if (qrCodeImage) {
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = qrCodeImage;
      link.download = `${qrCodeName || 'qr-code'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDownloadPDF = () => {
    if (!qrCodeImage) return;

    // Create optimized print content
    const printContent = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${qrCodeName || 'QR Code'}</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: white;
              overflow: hidden;
            }
            
            .qr-container {
              width: 100vw;
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
            }
            
            .qr-image {
              width: 100vw;
              height: 100vh;
              object-fit: cover;
              image-rendering: -webkit-optimize-contrast;
              image-rendering: crisp-edges;
            }
            
            .qr-info {
              position: fixed;
              bottom: 0;
              left: 0;
              right: 0;
              background: rgba(255, 255, 255, 0.95);
              backdrop-filter: blur(10px);
              padding: 15px 25px;
              text-align: center;
              box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
              border-top: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .qr-name {
              font-size: 18px;
              font-weight: 600;
              margin-bottom: 8px;
              color: #1a1a1a;
            }
            
            .qr-details {
              font-size: 13px;
              color: #666;
              line-height: 1.4;
            }
            
            .qr-details div {
              margin-bottom: 2px;
            }
            
            @media print {
              @page {
                margin: 0;
                size: A4;
              }
              
              body {
                margin: 0 !important;
                padding: 0 !important;
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
                width: 100%;
                height: 100%;
              }
              
              .qr-container {
                width: 100%;
                height: 100%;
                page-break-inside: avoid;
                margin: 0;
                padding: 0;
              }
              
              .qr-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
                margin: 0;
                padding: 0;
              }
              
              .qr-info {
                position: fixed !important;
                bottom: 0 !important;
                left: 0 !important;
                right: 0 !important;
                background: white !important;
                box-shadow: none !important;
                border-top: 1px solid #ddd !important;
                border-radius: 0 !important;
                margin: 0;
                padding: 15px 25px;
              }
            }
            
            @media screen and (max-width: 768px) {
              .qr-info {
                bottom: 20px;
                padding: 12px 20px;
                min-width: 180px;
              }
              
              .qr-name {
                font-size: 16px;
              }
              
              .qr-details {
                font-size: 12px;
              }
            }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <img 
              src="${qrCodeImage}" 
              alt="QR Code - ${qrCodeName || 'QR Code'}" 
              class="qr-image"
            />
            <div class="qr-info">
              <div class="qr-name">${qrCodeName || 'QR Code'}</div>
              <div class="qr-details">
                <div>${branchName}</div>
                <div>${address}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

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

  return (
    <>
      <div className='bg-white rounded-[10px] p-[10px] flex flex-col gap-1 w-full'>
          <div className='flex items-center justify-between'>
              <div className='font-medium text-[18px] leading-[21.28px] tracking-[2%] text-second'>{branchName}</div>
              <div className='flex items-center gap-2'>
                  <div className='cursor-pointer' onClick={()=>{}}> <img src={deleteIcon} alt="" /></div>
                  {/* <div className='cursor-pointer' onClick={()=>{}}> <img src={editIcon} alt="" /></div> */}
                  <div className='cursor-pointer' onClick={handleShowModal}> <img src={showIcon} alt="" /></div>
              </div>
          </div>
          <div className='font-bold text-[14px] leading-[21.28px] tracking-[2%]'>{responseCount} / {totalCount} responses</div>
          <div className='flex items-center gap-2'>
              <div className=''>
                  <img src={location} alt="" />
              </div>
              <div className='font-medium text-[16px] leading-[22.4px] text-second'>{address}</div>
          </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">QR Code Options</h3>
              <div
                onClick={handleCloseModal}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center cursor-pointer transition-all duration-200 text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <img 
                  src={qrCodeImage} 
                  alt="QR Code" 
                  className="max-w-full h-auto max-h-48 mx-auto mb-4"
                />
                <div className="text-sm text-gray-600 mb-4">
                  <div className="font-medium">{qrCodeName}</div>
                  <div>Branch: {branchName}</div>
                  <div>Responses: {responseCount} / {totalCount}</div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div
                  onClick={handleDownloadPDF}
                  className=" cursor-pointer bg-green hover:bg-hoverGreen text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <img src={printIcon} alt="Print" className="w-5 h-5" />
                  Print PDF
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