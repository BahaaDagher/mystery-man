export function generateQrPrintHtml({ qrCodeName, qrCodeImage, branchName, address }) {
  return `
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
} 