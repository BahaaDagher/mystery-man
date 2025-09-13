import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportQuestionnaireToPdf = (questionnaire) => {
  if (!questionnaire) {
    console.error('No questionnaire data provided for export');
    return;
  }

  // Create HTML content with proper page break CSS
  const createHTMLContent = () => {
    let html = `
      <div style="
        font-family: Arial, sans-serif;
        direction: rtl;
        text-align: right;
        padding: 20px;
        background: white;
        width: 794px;
        margin: 0 auto;
        font-size: 14px;
        line-height: 1.6;
      ">
        <style>
          @media print {
            .page-break { page-break-before: always; }
            .no-break { page-break-inside: avoid; }
          }
          .page-break { margin-top: 50px; }
        </style>
        
        <h1 style="
          text-align: center;
          font-size: 22px;
          margin-bottom: 30px;
          font-weight: bold;
          margin-top: 0;
        ">${questionnaire.title || 'Questionnaire'}</h1>
    `;

    let questionCount = 0;
    const questionsPerPage = 8; // Adjust this number based on your needs

    questionnaire.steps.forEach((step, stepIndex) => {
      // Add page break before step if we have too many questions on current page
      if (questionCount > 0 && questionCount % questionsPerPage === 0) {
        html += `<div class="page-break"></div>`;
      }

      html += `
        <div class="no-break" style="margin-bottom: 25px;">
          <h2 style="
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
            color: #333;
            margin-top: 15px;
          ">${stepIndex + 1}. ${step.name}</h2>
      `;

      step.questions.forEach((question, questionIndex) => {
        // Add page break if we're at the limit and not the first question
        if (questionCount > 0 && questionCount % questionsPerPage === 0) {
          html += `</div><div class="page-break"></div><div class="no-break" style="margin-bottom: 25px;">`;
        }

        html += `
          <div class="no-break" style="margin-bottom: 20px; margin-right: 20px; min-height: 60px;">
            <h3 style="
              font-size: 15px;
              margin-bottom: 10px;
              font-weight: normal;
              line-height: 1.4;
            ">${stepIndex + 1}.${questionIndex + 1} ${question.title}</h3>
        `;

        // Question type specific content
        if (question.type === 'yesOrNo') {
          html += `<p style="margin: 8px 0; font-size: 14px;">☐ Yes &nbsp;&nbsp;&nbsp;&nbsp; ☐ No</p>`;
        } else if ((question.type === 'SingleChoice' || question.type === 'multiChoice') && question.options?.length > 0) {
          question.options.forEach((option) => {
            html += `<p style="margin: 5px 0; font-size: 14px;">☐ ${option.title}</p>`;
          });
        } else if (question.type === 'rating') {
          html += `<p style="margin: 8px 0; font-size: 14px;">Rating: ⭐ ⭐ ⭐ ⭐ ⭐</p>`;
        } else if (question.type === 'open') {
          // Add lines for open questions
          for (let i = 0; i < 3; i++) {
            html += `<div style="border-bottom: 1px solid #000; height: 20px; margin: 10px 0;"></div>`;
          }
        } else if (question.type === 'uploadImages') {
          html += `<div style="margin: 8px 0; border: 1px dashed #ccc; padding: 15px; text-align: center; font-size: 14px;">[Image Upload Area]</div>`;
        }

        html += `</div>`;
        questionCount++;
      });

      // Add separator lines between steps (except for the last step)
      if (stepIndex < questionnaire.steps.length - 1) {
        html += `
          <div class="no-break" style="text-align: center; margin: 30px 0;">
            <hr style="border: none; border-top: 2px solid #000; width: 60%; margin: 8px auto;">
            <hr style="border: none; border-top: 2px solid #000; width: 60%; margin: 8px auto;">
          </div>
        `;
      }

      html += `</div>`;
    });

    html += `</div>`;
    return html;
  };

  // Create a temporary div with the HTML content
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = createHTMLContent();
  tempDiv.style.position = 'fixed';
  tempDiv.style.top = '-9999px';
  tempDiv.style.left = '-9999px';
  tempDiv.style.width = '794px'; // A4 width in pixels
  tempDiv.style.backgroundColor = 'white';
  tempDiv.style.fontSize = '14px';
  document.body.appendChild(tempDiv);

  // Wait a moment for the DOM to render
  setTimeout(() => {

  // Convert HTML to canvas then to PDF with smart page breaking
  html2canvas(tempDiv, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
    allowTaint: true,
    height: tempDiv.scrollHeight,
    width: tempDiv.scrollWidth
  }).then(canvas => {
    // Remove the temporary div
    document.body.removeChild(tempDiv);

    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    const margin = 10; // Top/bottom margin for each page
    const usableHeight = pdfHeight - (margin * 2); // Height available for content
    
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    // Calculate the scaling factor
    const scale = pdfWidth / canvasWidth;
    const scaledCanvasHeight = canvasHeight * scale;
    
    // If content fits in one page
    if (scaledCanvasHeight <= usableHeight) {
      pdf.addImage(imgData, 'PNG', 0, margin, pdfWidth, scaledCanvasHeight);
    } else {
      // Calculate how many pages we need
      const totalPages = Math.ceil(scaledCanvasHeight / usableHeight);
      
      for (let pageNum = 0; pageNum < totalPages; pageNum++) {
        if (pageNum > 0) {
          pdf.addPage();
        }
        
        // Calculate the Y offset for this page in canvas coordinates
        const canvasYOffset = (pageNum * usableHeight) / scale;
        
        // Add the image section for this page
        pdf.addImage(
          imgData, 
          'PNG', 
          0, 
          margin - (pageNum * usableHeight), // Y position in PDF
          pdfWidth, 
          scaledCanvasHeight
        );
      }
    }

    // Generate and download the PDF
    const fileName = `${questionnaire.title || 'Questionnaire'}_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
  }).catch(error => {
    console.error('Error generating PDF:', error);
    // Remove the temporary div in case of error
    if (document.body.contains(tempDiv)) {
      document.body.removeChild(tempDiv);
    }
  });

  }, 100); // Small delay to ensure DOM is ready
};