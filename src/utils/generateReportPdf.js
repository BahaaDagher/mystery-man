import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import BlueLogo from '../assets/images/BlueLogo.png';

// Helper function to wait for Chart.js to fully render
const waitForCharts = async () => {
  // Wait for any Chart.js animations to complete
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Force all charts to update
  if (window.Chart) {
    const charts = window.Chart.instances;
    if (charts) {
      Object.values(charts).forEach(chart => {
        if (chart) {
          chart.update('none'); // Update without animation
          chart.render();
        }
      });
    }
  }
  
  // Additional wait after update
  await new Promise(resolve => setTimeout(resolve, 500));
};

export const generateReportPdf = async (elementRef, reportName, isRTL = false, dateRange = null, note = '') => {
  try {
    // Get the element to convert
    const element = elementRef.current;
    if (!element) {
      throw new Error('Element not found');
    }

    // Wait for charts to be fully rendered
    await waitForCharts();

    // Create a wrapper div to include header
    const wrapper = document.createElement('div');
    wrapper.style.backgroundColor = '#f5f5f5';
    wrapper.style.padding = '20px';
    wrapper.style.width = (element.scrollWidth + 40) + 'px';
    if (isRTL) {
      wrapper.setAttribute('dir', 'rtl');
    }
    
    // Create header
    const header = document.createElement('div');
    header.style.backgroundColor = 'white';
    header.style.padding = '20px';
    header.style.marginBottom = '20px';
    header.style.borderRadius = '12px';
    header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.direction = isRTL ? 'rtl' : 'ltr';
    header.style.pageBreakAfter = 'avoid';
    header.style.pageBreakInside = 'avoid';
    
    // Logo
    const logoImg = document.createElement('img');
    logoImg.src = BlueLogo;
    logoImg.style.height = '50px';
    logoImg.style.objectFit = 'contain';
    
    // Title and date container
    const titleContainer = document.createElement('div');
    titleContainer.style.textAlign = 'center';
    titleContainer.style.flex = '1';
    
    // Title
    const title = document.createElement('h1');
    title.textContent = reportName;
    title.style.fontSize = '24px';
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '10px';
    title.style.color = '#333';
    title.style.fontFamily = isRTL ? 'Arial, Tahoma, sans-serif' : 'Arial, sans-serif';
    title.style.direction = isRTL ? 'rtl' : 'ltr';
    title.style.unicodeBidi = 'embed';
    
    // Date range
    if (dateRange) {
      const dateText = document.createElement('p');
      dateText.textContent = dateRange;
      dateText.style.fontSize = '14px';
      dateText.style.color = '#666';
      dateText.style.fontFamily = isRTL ? 'Arial, Tahoma, sans-serif' : 'Arial, sans-serif';
      dateText.style.direction = isRTL ? 'rtl' : 'ltr';
      dateText.style.unicodeBidi = 'embed';
      titleContainer.appendChild(title);
      titleContainer.appendChild(dateText);
    } else {
      titleContainer.appendChild(title);
    }
    
    // Empty div for balance
    const emptyDiv = document.createElement('div');
    emptyDiv.style.width = '100px';
    
    // Append elements to header
    header.appendChild(isRTL ? emptyDiv : logoImg);
    header.appendChild(titleContainer);
    header.appendChild(isRTL ? logoImg : emptyDiv);
    
    // Clone the original element
    const clonedElement = element.cloneNode(true);
    clonedElement.style.backgroundColor = 'transparent';
    
    // Add page break styling to major sections
    const sections = clonedElement.querySelectorAll('.pdf-section');
    sections.forEach((section, index) => {
      if (index > 0) {
        // Add page break before each section (except the first)
        section.style.pageBreakBefore = 'always';
        
        // Custom margins for specific sections
        if (index === 3) { // Fourth section (index 3)
          section.style.paddingTop = '85px';
          section.style.marginTop = '85px';
        } else if (index === 1) { // Second section
          section.style.paddingTop = '30px';
          section.style.marginTop = '30px';
        } else if (index === 2) { // Third section
          section.style.paddingTop = '20px';
          section.style.marginTop = '20px';
        } else {
          section.style.paddingTop = '10px';
          section.style.marginTop = '10px';
        }
      }
      // Ensure section doesn't break in the middle
      section.style.pageBreakInside = 'avoid';
    });
    
    // Special handling for two-column sections
    const twoColumnSections = clonedElement.querySelectorAll('.flex.justify-between.gap-3');
    twoColumnSections.forEach(container => {
      container.style.pageBreakInside = 'avoid';
      container.style.marginBottom = '20px';
      // Ensure children stay together
      const children = container.querySelectorAll('.bg-white');
      children.forEach(child => {
        child.style.pageBreakInside = 'avoid';
      });
    });
    
    // Process all canvas elements in both original and cloned elements
    const originalCanvases = element.querySelectorAll('canvas');
    const clonedCanvases = clonedElement.querySelectorAll('canvas');
    
    originalCanvases.forEach((originalCanvas, index) => {
      if (clonedCanvases[index]) {
        try {
          // Create an image element
          const img = document.createElement('img');
          
          // Convert canvas to image
          img.src = originalCanvas.toDataURL('image/png', 1.0);
          
          // Copy dimensions and styles
          const computedStyle = window.getComputedStyle(originalCanvas);
          img.style.width = computedStyle.width;
          img.style.height = computedStyle.height;
          img.style.maxWidth = '100%';
          img.style.display = 'block';
          
          // Replace canvas with image in cloned element
          clonedCanvases[index].parentNode.replaceChild(img, clonedCanvases[index]);
        } catch (error) {
          console.error('Error converting canvas:', error);
        }
      }
    });
    
    // Ensure all elements avoid page breaks
    const allElements = clonedElement.querySelectorAll('*');
    allElements.forEach(el => {
      el.style.pageBreakInside = 'avoid';
    });
    
    // Append header and content to wrapper
    wrapper.appendChild(header);
    wrapper.appendChild(clonedElement);
    
    // Add note section if note is provided
    if (note && note.trim()) {
      const noteSection = document.createElement('div');
      noteSection.style.backgroundColor = 'white';
      noteSection.style.padding = '20px';
      noteSection.style.marginTop = '20px';
      noteSection.style.borderRadius = '12px';
      noteSection.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
      noteSection.style.direction = isRTL ? 'rtl' : 'ltr';
      noteSection.style.pageBreakInside = 'avoid';
      
      // Note title
      const noteTitle = document.createElement('h3');
      noteTitle.textContent = isRTL ? 'ملاحظات' : 'Notes';
      noteTitle.style.fontSize = '18px';
      noteTitle.style.fontWeight = 'bold';
      noteTitle.style.marginBottom = '15px';
      noteTitle.style.color = '#333';
      noteTitle.style.fontFamily = isRTL ? 'Arial, Tahoma, sans-serif' : 'Arial, sans-serif';
      noteTitle.style.direction = isRTL ? 'rtl' : 'ltr';
      noteTitle.style.unicodeBidi = 'embed';
      
      // Note content
      const noteContent = document.createElement('div');
      // Check if note contains HTML tags
      if (note && /<[a-z][\s\S]*>/i.test(note)) {
        // If it's HTML, set innerHTML
        noteContent.innerHTML = note;
      } else {
        // If it's plain text, set textContent
        noteContent.textContent = note;
      }
      noteContent.style.fontSize = '14px';
      noteContent.style.lineHeight = '1.6';
      noteContent.style.color = '#555';
      noteContent.style.fontFamily = isRTL ? 'Arial, Tahoma, sans-serif' : 'Arial, sans-serif';
      noteContent.style.direction = isRTL ? 'rtl' : 'ltr';
      noteContent.style.unicodeBidi = 'embed';
      // Remove whiteSpace: 'pre-wrap' as it's not needed for HTML content
      noteContent.classList.add('report-note-content');
      
      noteSection.appendChild(noteTitle);
      noteSection.appendChild(noteContent);
      wrapper.appendChild(noteSection);
    }
    
    // Temporarily append wrapper to body
    wrapper.style.position = 'absolute';
    wrapper.style.top = '0';
    wrapper.style.left = '0';
    wrapper.style.zIndex = '99999';
    wrapper.style.backgroundColor = '#f5f5f5';
    document.body.appendChild(wrapper);
    
    // Scroll to top to ensure full capture
    window.scrollTo(0, 0);
    
    // Wait a bit more
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Add a font preload for Arabic text
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;600;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    
    // Wait for font to load
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Configure html2canvas options
    const canvas = await html2canvas(wrapper, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#f5f5f5',
      windowWidth: wrapper.scrollWidth,
      windowHeight: wrapper.scrollHeight,
      width: wrapper.scrollWidth,
      height: wrapper.scrollHeight,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
      foreignObjectRendering: false,
      imageTimeout: 0,
      letterRendering: true,
      onclone: (clonedDoc) => {
        // Ensure RTL is preserved
        if (isRTL) {
          clonedDoc.body.style.direction = 'rtl';
          clonedDoc.documentElement.style.direction = 'rtl';
        }
        
        // Preserve styles for Quill-generated content
        const noteContentElements = clonedDoc.querySelectorAll('.report-note-content');
        noteContentElements.forEach(el => {
          // Ensure the element preserves its inner HTML structure
          el.style.whiteSpace = 'normal';
          
          // Handle Quill-specific styling
          const styledElements = el.querySelectorAll('*');
          styledElements.forEach(childEl => {
            // Preserve color styles
            if (childEl.style && childEl.style.color) {
              childEl.style.color = childEl.style.color;
            }
            
            // Preserve background color styles
            if (childEl.style && childEl.style.backgroundColor) {
              childEl.style.backgroundColor = childEl.style.backgroundColor;
            }
          });
        });
        
        // Fix Arabic text rendering
        const allTextElements = clonedDoc.querySelectorAll('*');
        allTextElements.forEach(el => {
          if (el.textContent && /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(el.textContent)) {
            // Element contains Arabic text
            el.style.fontFamily = "'Noto Sans Arabic', Arial, Tahoma, sans-serif";
            el.style.direction = 'rtl';
            el.style.unicodeBidi = 'embed';
            el.style.textAlign = 'right';
            el.style.lineHeight = '1.6';
          }
        });
        
        // Add CSS for better rendering
        const style = clonedDoc.createElement('style');
        style.textContent = `
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;600;700&display=swap');
          
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          [dir="rtl"] {
            font-family: 'Noto Sans Arabic', Arial, Tahoma, sans-serif !important;
          }
          
          /* Page break rules */
          .page-break-before {
            page-break-before: always;
          }
          
          .no-page-break {
            page-break-inside: avoid;
          }
          
          /* Quill editor content styling */
          .report-note-content h1, .report-note-content h2, .report-note-content h3,
          .report-note-content h4, .report-note-content h5, .report-note-content h6 {
            margin: 10px 0;
            font-weight: bold;
          }
          
          .report-note-content p {
            margin: 8px 0;
          }
          
          .report-note-content strong {
            font-weight: bold;
          }
          
          .report-note-content em {
            font-style: italic;
          }
          
          .report-note-content u {
            text-decoration: underline;
          }
          
          .report-note-content strike {
            text-decoration: line-through;
          }
          
          .report-note-content ul, .report-note-content ol {
            margin: 10px 0;
            padding-left: 20px;
          }
          
          .report-note-content li {
            margin: 5px 0;
          }
        `;
        clonedDoc.head.appendChild(style);
      }
    });
    
    // Remove the temporary wrapper and font link
    document.body.removeChild(wrapper);
    if (fontLink && fontLink.parentNode) {
      document.head.removeChild(fontLink);
    }

    // Calculate PDF dimensions with margins
    const margin = 10; // 10mm margin
    const imgWidth = 210 - (2 * margin); // A4 width minus margins
    const pageHeight = 297 - (2 * margin); // A4 height minus margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = 0;

    // Add the first page with margin
    const imgData = canvas.toDataURL('image/png', 1.0);
    pdf.addImage(imgData, 'PNG', margin, margin + position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    // Add additional pages if content is longer than one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', margin, margin + position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }

    // Generate filename with current date
    const date = new Date();
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const filename = `${reportName}_${dateStr}.pdf`;

    // Save the PDF
    pdf.save(filename);

    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};