import { Chart } from 'chart.js';

/** Fonts that shape Arabic correctly when Chart.js draws on canvas (fillText). */
const FONT_AR =
  "'Segoe UI', Tahoma, 'Noto Sans Arabic', 'Arial Unicode MS', Arial, sans-serif";

const FONT_EN =
  "'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Helvetica, Arial, sans-serif";

/**
 * Set global Chart.js font so axis labels, legends, and plugins use a shaping-capable family.
 */
export function applyChartFontForLanguage(isArabic) {
  Chart.defaults.font.family = isArabic ? FONT_AR : FONT_EN;
}

function patchChartOptionsFont(chart, family) {
  const opts = chart?.options;
  if (!opts) return;

  opts.font = { ...opts.font, family };

  const scales = opts.scales || {};
  Object.values(scales).forEach((scale) => {
    if (scale?.ticks?.font && typeof scale.ticks.font === 'object') {
      scale.ticks.font = { ...scale.ticks.font, family };
    }
  });

  const plugins = opts.plugins || {};
  if (plugins.legend?.labels?.font && typeof plugins.legend.labels.font === 'object') {
    plugins.legend.labels.font = { ...plugins.legend.labels.font, family };
  }
  if (plugins.datalabels?.font && typeof plugins.datalabels.font === 'object') {
    plugins.datalabels.font = { ...plugins.datalabels.font, family };
  }
  if (plugins.tooltip && typeof plugins.tooltip === 'object') {
    const tt = plugins.tooltip;
    if (tt.bodyFont && typeof tt.bodyFont === 'object') {
      tt.bodyFont = { ...tt.bodyFont, family };
    }
    if (tt.titleFont && typeof tt.titleFont === 'object') {
      tt.titleFont = { ...tt.titleFont, family };
    }
  }
}

/**
 * Push the current default font into every live chart and re-render (needed for PDF capture).
 */
export function refreshAllChartFonts(isArabic) {
  applyChartFontForLanguage(isArabic);
  const family = Chart.defaults.font.family;
  const canvases = document.querySelectorAll('canvas');
  canvases.forEach((canvas) => {
    const chart = Chart.getChart(canvas);
    if (!chart) return;
    patchChartOptionsFont(chart, family);
    chart.update('none');
  });
}

export function initChartFontFromStorage() {
  try {
    const lang = localStorage.getItem('language');
    applyChartFontForLanguage(lang === 'ar');
  } catch {
    applyChartFontForLanguage(false);
  }
}
