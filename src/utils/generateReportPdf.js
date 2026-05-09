import { toCanvas, getFontEmbedCSS } from 'html-to-image';
import jsPDF from 'jspdf';
import BlueLogo from '../assets/images/BlueLogo.png';
import { refreshAllChartFonts } from './chartRtlFont';

/** Same stack as index.css so export matches screen and shapes Arabic correctly */
const AR_PDF_FONT_STACK =
  "'Cairo', 'Tajawal', 'Noto Sans Arabic', 'Segoe UI', Tahoma, Arial, sans-serif";

const PDF_MARGIN_MM = 10;
const PDF_PAGE_WIDTH_MM = 210 - (2 * PDF_MARGIN_MM);
const PDF_PAGE_HEIGHT_MM = 297 - (2 * PDF_MARGIN_MM);
const MIN_CHART_HEADER_SPACE_PX = 180;

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

/**
 * Mark chart-containing cards that should never be split across PDF pages.
 * We detect the nearest "card-like" container around each canvas.
 */
const markChartBlocks = (rootElement) => {
  const canvases = rootElement.querySelectorAll('canvas');
  canvases.forEach((canvas) => {
    const card = canvas.closest('.bg-white, [class*="bg-white"], .pdf-section');
    const target = card || canvas.parentElement;
    if (target) {
      target.classList.add('pdf-keep-together');
      target.style.pageBreakInside = 'avoid';
      target.style.breakInside = 'avoid';
    }
  });
};

/**
 * Insert spacers before keep-together blocks so each block starts on a fresh page
 * when it would otherwise be split by the image slicing step.
 */
const applyManualPagination = (wrapper, blocks) => {
  if (!blocks || blocks.length === 0) return;

  const wrapperWidthPx = wrapper.scrollWidth || wrapper.offsetWidth;
  if (!wrapperWidthPx) return;

  const pxPerMm = wrapperWidthPx / PDF_PAGE_WIDTH_MM;
  const pageHeightPx = PDF_PAGE_HEIGHT_MM * pxPerMm;
  if (!pageHeightPx || Number.isNaN(pageHeightPx)) return;

  blocks.forEach((block) => {
    let anchor = block;
    let probe = block.previousElementSibling;
    let hasHeaderAnchor = false;

    // Pull likely title rows (and optional hr divider) into the same moveable unit.
    // This prevents heading text from being orphaned at the bottom of previous page.
    while (probe) {
      const probeHeight = probe.offsetHeight || 0;
      const probeText = (probe.textContent || '').trim();
      const containsCanvas = !!probe.querySelector?.('canvas');
      const tag = (probe.tagName || '').toUpperCase();
      const className = typeof probe.className === 'string' ? probe.className : '';
      const isDivider = tag === 'HR';
      const looksLikeHeader =
        !containsCanvas &&
        probeHeight > 0 &&
        probeHeight <= 180 &&
        (tag === 'H1' ||
          tag === 'H2' ||
          tag === 'H3' ||
          tag === 'H4' ||
          tag === 'H5' ||
          tag === 'H6' ||
          className.includes('font-bold') ||
          className.includes('font-semibold') ||
          probeText.length > 0);

      if (looksLikeHeader) {
        anchor = probe;
        hasHeaderAnchor = true;
        probe = probe.previousElementSibling;
        continue;
      }

      // Include a divider only if we've already captured a header.
      if (isDivider && hasHeaderAnchor) {
        anchor = probe;
        probe = probe.previousElementSibling;
        continue;
      }

      break;
    }

    const anchorTop = anchor.offsetTop;
    const blockTop = block.offsetTop;
    const blockHeight = block.offsetHeight;
    if (!blockHeight) return;

    const pageBottom = (Math.floor(anchorTop / pageHeightPx) + 1) * pageHeightPx;
    const remainingSpace = pageBottom - anchorTop;
    const blockBottom = blockTop + blockHeight;
    const firstElementChild = block.firstElementChild;
    const dynamicHeaderSpace = Math.max(
      MIN_CHART_HEADER_SPACE_PX,
      (firstElementChild?.offsetHeight || 0) + 110
    );

    // If block itself is taller than a single page, at least avoid orphaning its title:
    // when the start is too close to page bottom, push block start to next page.
    if (blockHeight >= pageHeightPx) {
      if (remainingSpace < dynamicHeaderSpace) {
        const spacer = document.createElement('div');
        spacer.className = 'pdf-page-spacer';
        spacer.style.height = `${Math.ceil(Math.max(remainingSpace, 0))}px`;
        spacer.style.width = '100%';
        spacer.style.pointerEvents = 'none';
        spacer.style.background = 'transparent';
        anchor.parentNode.insertBefore(spacer, anchor);
      }
      return;
    }

    const overflow = blockBottom - pageBottom;
    if (overflow > 0 || remainingSpace < dynamicHeaderSpace) {
      const spacer = document.createElement('div');
      spacer.className = 'pdf-page-spacer';
      spacer.style.height = `${Math.ceil(Math.max(pageBottom - anchorTop, 0))}px`;
      spacer.style.width = '100%';
      spacer.style.pointerEvents = 'none';
      spacer.style.background = 'transparent';
      anchor.parentNode.insertBefore(spacer, anchor);
    }
  });
};

export const generateReportPdf = async (elementRef, reportName, isRTL = false, dateRange = null, note = '') => {
  try {
    // Get the element to convert
    const element = elementRef.current;
    if (!element) {
      throw new Error('Element not found');
    }

    // Ensure Chart.js uses Arabic-capable fonts on canvas, then re-render before capture
    refreshAllChartFonts(isRTL);
    await waitForCharts();

    // Create a wrapper div to include header
    const wrapper = document.createElement('div');
    wrapper.style.backgroundColor = '#f5f5f5';
    wrapper.style.padding = '20px';
    wrapper.style.width = (element.scrollWidth + 40) + 'px';
    if (isRTL) {
      wrapper.setAttribute('dir', 'rtl');
      wrapper.setAttribute('lang', 'ar');
      wrapper.style.fontFamily = AR_PDF_FONT_STACK;
      wrapper.style.letterSpacing = 'normal';
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
    title.style.fontFamily = isRTL ? AR_PDF_FONT_STACK : 'Arial, sans-serif';
    title.style.direction = isRTL ? 'rtl' : 'ltr';
    title.style.unicodeBidi = 'embed';
    
    // Date range
    if (dateRange) {
      const dateText = document.createElement('p');
      dateText.textContent = dateRange;
      dateText.style.fontSize = '14px';
      dateText.style.color = '#666';
      dateText.style.fontFamily = isRTL ? AR_PDF_FONT_STACK : 'Arial, sans-serif';
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

    // Mark chart blocks so we can keep them together when paginating.
    markChartBlocks(clonedElement);
    
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
      noteTitle.style.fontFamily = isRTL ? AR_PDF_FONT_STACK : 'Arial, sans-serif';
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
      noteContent.style.fontFamily = isRTL ? AR_PDF_FONT_STACK : 'Arial, sans-serif';
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

    // Force keep-together chart cards to start on a fresh page when needed.
    // This is needed because final PDF is generated by slicing one large image.
    const keepTogetherBlocks = Array.from(wrapper.querySelectorAll('.pdf-keep-together'));
    applyManualPagination(wrapper, keepTogetherBlocks);
    
    // Scroll to top to ensure full capture
    window.scrollTo(0, 0);
    
    // Wait a bit more for layout/fonts (Cairo/Tajawal/Noto come from index.css)
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
      await document.fonts.ready;
      if (isRTL) {
        await Promise.all([
          document.fonts.load('500 16px Cairo').catch(() => {}),
          document.fonts.load('500 16px Tajawal').catch(() => {}),
          document.fonts.load('500 16px "Noto Sans Arabic"').catch(() => {}),
        ]);
      }
    } catch {
      /* ignore */
    }

    const exportWidth = wrapper.scrollWidth;
    const exportHeight = wrapper.scrollHeight;

    let fontEmbedCSS = '';
    if (isRTL) {
      try {
        fontEmbedCSS = await getFontEmbedCSS(wrapper, { cacheBust: true });
      } catch {
        fontEmbedCSS = '';
      }
    }

    let canvas;
    try {
      // SVG foreignObject path preserves browser text shaping (Arabic); html2canvas often breaks it.
      canvas = await toCanvas(wrapper, {
        pixelRatio: 2,
        backgroundColor: '#f5f5f5',
        width: exportWidth,
        height: exportHeight,
        cacheBust: true,
        preferredFontFormat: 'woff2',
        ...(fontEmbedCSS ? { fontEmbedCSS } : {}),
      });
    } catch (err) {
      console.warn('html-to-image toCanvas failed, using html2canvas fallback', err);
      const html2canvas = (await import('html2canvas')).default;
      canvas = await html2canvas(wrapper, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#f5f5f5',
        width: exportWidth,
        height: exportHeight,
        letterRendering: false,
      });
    } finally {
      if (wrapper.parentNode) {
        wrapper.parentNode.removeChild(wrapper);
      }
    }

    // Calculate PDF dimensions with margins
    const margin = PDF_MARGIN_MM;
    const imgWidth = PDF_PAGE_WIDTH_MM;
    const pageHeight = PDF_PAGE_HEIGHT_MM;
    const pxPerMm = canvas.width / imgWidth;
    const pageHeightPx = Math.floor(pageHeight * pxPerMm);
    const totalPages = Math.max(1, Math.ceil(canvas.height / pageHeightPx));

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');

    // Render each page from an exact canvas crop.
    // This removes boundary overlap where titles could appear on two pages.
    for (let pageIndex = 0; pageIndex < totalPages; pageIndex += 1) {
      if (pageIndex > 0) {
        pdf.addPage();
      }

      const sourceY = pageIndex * pageHeightPx;
      const sourceHeight = Math.min(pageHeightPx, canvas.height - sourceY);
      if (sourceHeight <= 0) continue;

      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvas.width;
      pageCanvas.height = sourceHeight;
      const pageCtx = pageCanvas.getContext('2d');
      pageCtx.drawImage(
        canvas,
        0,
        sourceY,
        canvas.width,
        sourceHeight,
        0,
        0,
        canvas.width,
        sourceHeight
      );

      const pageImgData = pageCanvas.toDataURL('image/png', 1.0);
      const pageImgHeightMm = sourceHeight / pxPerMm;
      pdf.addImage(pageImgData, 'PNG', margin, margin, imgWidth, pageImgHeightMm, undefined, 'FAST');
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