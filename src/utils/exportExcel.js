// Excel export helper built on SheetJS with optional styling support
// Usage:
// exportToExcel({
//   filename: 'report.xlsx',
//   sheets: [
//     { name: 'Sheet1', data: [{ a: 1, b: 2 }] }, // array of objects
//     { name: 'Sheet2', data: [['A', 'B'], [1, 2]] } // array of arrays
//   ]
// });
//
// Note: install at least: xlsx
// For styled titles, also install: xlsx-js-style
// npm install xlsx xlsx-js-style

/* eslint-disable import/no-extraneous-dependencies */
export async function exportToExcel({ filename, sheets }) {
  if (!Array.isArray(sheets) || sheets.length === 0) {
    throw new Error('exportToExcel: "sheets" must be a non-empty array.');
  }

  // Lazy-load modules
  let XLSX = null;
  let XLSX_STYLE = null;
  try {
    XLSX_STYLE = await import('xlsx-js-style');
  } catch (e) {
    // ignore
  }
  if (!XLSX_STYLE) {
    XLSX = await import('xlsx');
  }
  const writer = (XLSX_STYLE && (XLSX_STYLE.default || XLSX_STYLE)) || (XLSX && (XLSX.default || XLSX));
  const hasStyles = Boolean(XLSX_STYLE);

  const workbook = writer.utils.book_new();

  for (const sheet of sheets) {
    const { name, data } = sheet || {};
    if (!name || !data) continue;

    let worksheet;
    let merges = [];
    let styles = [];
    let inferredMaxCols = 0;

    // Support enhanced shape: { aoa, merges, styles }
    if (data && typeof data === 'object' && !Array.isArray(data) && data.aoa) {
      worksheet = writer.utils.aoa_to_sheet(data.aoa);
      merges = Array.isArray(data.merges) ? data.merges : [];
      styles = Array.isArray(data.styles) ? data.styles : [];
      inferredMaxCols = (data.aoa || []).reduce((m, r) => Math.max(m, r.length), 0);
    } else if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
      // Array of arrays (AOA)
      worksheet = writer.utils.aoa_to_sheet(data);
      inferredMaxCols = data.reduce((m, r) => Math.max(m, (Array.isArray(r) ? r.length : 0)), 0);
    } else if (Array.isArray(data)) {
      // Array of objects
      worksheet = writer.utils.json_to_sheet(data, { skipHeader: false });
      // Approximate: keys of first row
      const keys = Object.keys(data[0] || {});
      inferredMaxCols = keys.length;
    } else {
      // Unsupported data type, skip
      // eslint-disable-next-line no-continue
      continue;
    }

    // Apply merges if provided
    if (merges.length > 0) {
      worksheet['!merges'] = (worksheet['!merges'] || []).concat(merges);
    }

    // Apply styles if supported
    if (hasStyles && styles.length > 0) {
      for (const s of styles) {
        const { cell, style } = s || {};
        if (!cell || !style) continue;
        if (!worksheet[cell]) worksheet[cell] = { t: 's', v: '' };
        worksheet[cell].s = style;
      }
    }

    // Set default column widths: widen first column for section titles
    if (inferredMaxCols > 0) {
      const defaultCols = Array.from({ length: inferredMaxCols }, (_, idx) => {
        return { wch: idx === 0 ? 15 : 12 }; // first column wider
      });
      worksheet['!cols'] = defaultCols;
    }

    writer.utils.book_append_sheet(workbook, worksheet, name);
  }

  // Write workbook and trigger download in browser
  writer.writeFile(workbook, filename || 'report.xlsx', { compression: true });
}

// Helper to build a sheet like the provided Google Sheet structure
// Example shape:
// buildBranchReportSheet({
//   overallEvaluation: [{ category: 'ممتاز', percent: 0.5 }, ...],
//   questionTypes: [{ type: 'إيجابي', count: 22, percent: 0.5 }, ...],
//   monthlyDepartmentScores: [{ month: 'يناير', sales: 85, marketing: 70, customerService: 90 }, ...],
//   departmentAveragesForBranch: [{ department: 'قسم المبيعات', performancePercent: 0.87 }, ...]
// })
export function buildBranchReportSheet({
  title = 'أكسيل فرع واحد',
  overallEvaluation = [],
  questionTypes = [],
  monthlyDepartmentScores = [],
  departmentAveragesForBranch = [],
  branchImprovementTrend = [], // [{ month, value }]
  stepDevelopmentComparison = [], // [{ label, first, second }]
  stepProgressOverTime = [], // [{ name, data: [{ month, value }] }]
} = {}) {
  // Section 1: Header
  const aoa = [[title]];
  aoa.push([]); // empty row

  // Section 2: Overall evaluation
  aoa.push(['التقييم العام']);
  aoa.push(['الفئة', 'النسبه']);
  for (const row of overallEvaluation) {
    aoa.push([row.category ?? '', formatPercent(row.percent)]);
  }

  aoa.push([]); // spacer

  // Section 3: Question types
  aoa.push(['عدد الاستبيانات والاسئله']);
  aoa.push(['نوع الاسئله', 'العدد', 'النسبه']);
  for (const row of questionTypes) {
    aoa.push([row.type ?? '', safeNum(row.count), formatPercent(row.percent)]);
  }

  aoa.push([]); // spacer

  // Section 4: Monthly department scores
  aoa.push(['تقييم الأقسام بالنسبة للزمن']);
  // Derive dynamic columns from provided data keys (excluding 'month')
  const dynamicStepNames = Array.from(
    new Set(
      monthlyDepartmentScores.flatMap(r => Object.keys(r || {}))
        .filter(k => k !== 'month')
    )
  );
  aoa.push(['الشهر', ...dynamicStepNames]);
  for (const row of monthlyDepartmentScores) {
    aoa.push([row.month ?? '', ...dynamicStepNames.map(n => safeNum(row[n]))]);
  }

  aoa.push([]); // spacer

  // Section 5: Department averages for the branch
  aoa.push(['متوسط مجموع الأقسام لجميع المهام لنفس الفرع']);
  aoa.push(['القسم', 'النسبة المئوية للأداء']);
  for (const row of departmentAveragesForBranch) {
    aoa.push([row.department ?? '', formatPercent(row.performancePercent)]);
  }

  aoa.push([]); // spacer

  // Section 6: Branch improvement percentage over time
  if (Array.isArray(branchImprovementTrend) && branchImprovementTrend.length > 0) {
    aoa.push(['نسبة التحسّن خلال الفترة']);
    aoa.push(['الشهر', 'النسبة']);
    for (const row of branchImprovementTrend) {
      aoa.push([row.month ?? '', formatPercent(row.value)]);
    }
    aoa.push([]); // spacer
  }

  // Section 7: Rate of development in each section (previous vs current month)
  if (Array.isArray(stepDevelopmentComparison) && stepDevelopmentComparison.length > 0) {
    aoa.push(['معدل التطور في كل قسم']);
    aoa.push(['القسم', 'الشهر السابق', 'الشهر الحالي']);
    for (const row of stepDevelopmentComparison) {
      aoa.push([row.label ?? '', formatPercent(row.first), formatPercent(row.second)]);
    }
    aoa.push([]); // spacer
  }

  // Section 8: Department development rate over time (per step sub-tables)
  if (Array.isArray(stepProgressOverTime) && stepProgressOverTime.length > 0) {
    aoa.push(['معدل تطور القسم بالنسبة للزمن']);
    for (const step of stepProgressOverTime) {
      aoa.push([step.name ?? step.label ?? '']);
      aoa.push(['الشهر', 'القيمة']);
      for (const d of (step.data || [])) {
        aoa.push([d.month ?? '', safeNum(d.value)]);
      }
      aoa.push([]); // spacer between steps
    }
  }

  // Compute max column width for merges and styling references
  const maxCols = aoa.reduce((m, r) => Math.max(m, r.length), 1);
  const merges = [];
  const styles = [];

  // Title styling and merge (A1 to max col)
  merges.push({
    s: { r: 0, c: 0 },
    e: { r: 0, c: Math.max(0, maxCols - 1) }
  });
  styles.push({
    cell: 'A1',
    style: titleStyle('#1D49A7', 20, true, '#FFFFFF')
  });

  // Style all section titles (rows that have single-cell titles we pushed)
  // We will traverse and apply style when row has length 1 or it's a known section header.
  let rowIdx = 0;
  for (const row of aoa) {
    const isSectionTitle =
      row.length === 1 &&
      typeof row[0] === 'string' &&
      row[0].trim().length > 0;
    if (isSectionTitle) {
      const cell = a1Address(rowIdx, 0);
      styles.push({
        cell,
        style: titleStyle('#E6F0FF', 16, true, '#1D49A7')
      });
      // Merge this title row across all columns
      merges.push({
        s: { r: rowIdx, c: 0 },
        e: { r: rowIdx, c: Math.max(0, maxCols - 1) }
      });
    }
    rowIdx += 1;
  }

  return { aoa, merges, styles };
}

// Multi-branch or QR report builder
export function buildMultiBranchReportSheet({
  title = 'تقرير أكثر من فرع',
  topBranchesByStepRating = [], // [{ branch_name, percentage, average_rating? }]
  questionStatsPerBranch = null, // { summary:{mission_negative,mission_neutral,mission_positive}, branches:[{branch_name,total_questions,positive,neutral,negative, positive_percentage,neutral_percentage,negative_percentage}]}
  overallEvaluationPerBranch = [], // [{ branch_name, average_rating }]
  branchesImprovementTrend = [], // [{ branch_name, chart:[{month,value}]}]
  stepMonthlyTrendPerBranch = [], // [{ step_name, chart:[{month,average_rating}]}]
  averageRatingPerStep = [], // [{ step_name, average_rating }]
  monthlyBranchRatingsFromSteps = [], // [{ month, year, average_rating }]
  stepImprovementPerBranch = [], // [{ branch_id, branch_name, steps:[{ step_name, old_avg, new_avg }]}]
  stepStatsGroupedByStep = [], // [{ step_id, step_name, branches:[{ branch_name, average_rating, count, percentage }]}]
} = {}) {
  const aoa = [[title]];

  // Top 3 branches
  if (Array.isArray(topBranchesByStepRating) && topBranchesByStepRating.length > 0) {
    aoa.push([]);
    aoa.push(['أعلى 3 فروع حسب التقييم']);
    aoa.push(['الفرع', 'النسبة']);
    const top3 = topBranchesByStepRating.slice(0, 3);
    for (const b of top3) {
      const percent = b.percentage != null ? b.percentage : (b.average_rating != null ? b.average_rating : '');
      aoa.push([b.branch_name ?? '', formatPercent(percent)]);
    }
  }

  // Evaluation of questions per branch - summary
  if (questionStatsPerBranch && questionStatsPerBranch.summary) {
    aoa.push([]);
    aoa.push(['تقييم الأسئلة - ملخص']);
    aoa.push(['نوع', 'العدد']);
    const s = questionStatsPerBranch.summary;
    aoa.push(['سلبي', safeNum(s.mission_negative)]);
    aoa.push(['متوسط', safeNum(s.mission_neutral)]);
    aoa.push(['إيجابي', safeNum(s.mission_positive)]);
  }

  // Evaluation of questions per branch - detailed
  if (questionStatsPerBranch && Array.isArray(questionStatsPerBranch.branches)) {
    aoa.push([]);
    aoa.push(['تقييم الأسئلة - تفصيلي لكل فرع']);
    aoa.push(['الفرع', 'إيجابي', '% إيجابي', 'متوسط', '% متوسط', 'سلبي', '% سلبي', 'إجمالي الأسئلة']);
    for (const b of questionStatsPerBranch.branches) {
      aoa.push([
        b.branch_name ?? '',
        safeNum(b.positive),
        formatPercent(normalizePercent(b.positive_percentage)),
        safeNum(b.neutral),
        formatPercent(normalizePercent(b.neutral_percentage)),
        safeNum(b.negative),
        formatPercent(normalizePercent(b.negative_percentage)),
        safeNum(b.total_questions),
      ]);
    }
  }

  // Overall evaluation per branch
  if (Array.isArray(overallEvaluationPerBranch) && overallEvaluationPerBranch.length > 0) {
    aoa.push([]);
    aoa.push(['التقييم العام لكل فرع']);
    aoa.push(['الفرع', 'التقييم']);
    for (const b of overallEvaluationPerBranch) {
      const val = b.average_rating != null ? b.average_rating : b.percentage;
      aoa.push([b.branch_name ?? '', formatPercent(val)]);
    }
  }

  // Branches evaluation in relation to time (months rows, branch columns)
  if (Array.isArray(branchesImprovementTrend) && branchesImprovementTrend.length > 0) {
    const months = Array.from(new Set(branchesImprovementTrend.flatMap(br => (br.chart || []).map(d => d.month))));
    const branchNames = branchesImprovementTrend.map(b => b.branch_name);

    aoa.push([]);
    aoa.push(['تقييم الفروع بالنسبة للزمن']);
    aoa.push(['الشهر', ...branchNames]);
    for (const m of months) {
      const row = [m];
      for (const b of branchesImprovementTrend) {
        const found = (b.chart || []).find(d => d.month === m);
        row.push(safeNum(found ? found.value : ''));
      }
      aoa.push(row);
    }
  }

  // Steps evaluation in relation to time (months rows, step columns)
  if (Array.isArray(stepMonthlyTrendPerBranch) && stepMonthlyTrendPerBranch.length > 0) {
    const months = Array.from(new Set(stepMonthlyTrendPerBranch.flatMap(s => (s.chart || []).map(d => d.month))));
    const stepNames = stepMonthlyTrendPerBranch.map(s => s.step_name);

    aoa.push([]);
    aoa.push(['تقييم الأقسام بالنسبة للزمن']);
    aoa.push(['الشهر', ...stepNames]);
    for (const m of months) {
      const row = [m];
      for (const s of stepMonthlyTrendPerBranch) {
        const found = (s.chart || []).find(d => d.month === m);
        row.push(safeNum(found ? found.average_rating : ''));
      }
      aoa.push(row);
    }
  }

  // Average section ratings
  if (Array.isArray(averageRatingPerStep) && averageRatingPerStep.length > 0) {
    aoa.push([]);
    aoa.push(['متوسط تقييم الأقسام']);
    aoa.push(['القسم', 'التقييم']);
    for (const s of averageRatingPerStep) {
      aoa.push([s.step_name ?? '', formatPercent(s.average_rating)]);
    }
  }

  // Average branch ratings (monthly)
  if (Array.isArray(monthlyBranchRatingsFromSteps) && monthlyBranchRatingsFromSteps.length > 0) {
    aoa.push([]);
    aoa.push(['متوسط تقييم الفروع من الأقسام شهريًا']);
    aoa.push(['الشهر', 'التقييم']);
    for (const r of monthlyBranchRatingsFromSteps) {
      const label = r.year != null ? `${r.month} ${r.year}` : (r.month ?? '');
      aoa.push([label, formatPercent(r.average_rating)]);
    }
  }

  // The rate of development in each branch (per branch sub-table)
  if (Array.isArray(stepImprovementPerBranch) && stepImprovementPerBranch.length > 0) {
    aoa.push([]);
    aoa.push(['معدل التطور في كل فرع']);
    for (const b of stepImprovementPerBranch) {
      aoa.push([b.branch_name ?? '']);
      aoa.push(['القسم', 'المتوسط السابق', 'المتوسط الحالي']);
      for (const st of (b.steps || [])) {
        aoa.push([st.step_name ?? '', formatPercent(st.old_avg), formatPercent(st.new_avg)]);
      }
      aoa.push([]);
    }
  }

  // Compare sections for branches (per step sub-table)
  if (Array.isArray(stepStatsGroupedByStep) && stepStatsGroupedByStep.length > 0) {
    aoa.push([]);
    aoa.push(['مقارنة الأقسام بين الفروع']);
    for (const s of stepStatsGroupedByStep) {
      aoa.push([s.step_name ?? '']);
      aoa.push(['الفرع', 'التقييم', 'العدد', 'النسبة']);
      for (const b of (s.branches || [])) {
        aoa.push([b.branch_name ?? '', formatPercent(b.average_rating), safeNum(b.count), formatPercent(b.percentage)]);
      }
      aoa.push([]);
    }
  }

  const maxCols = aoa.reduce((m, r) => Math.max(m, r.length), 1);
  const merges = [{
    s: { r: 0, c: 0 },
    e: { r: 0, c: Math.max(0, maxCols - 1) }
  }];

  const styles = [{
    cell: 'A1',
    style: titleStyle('#1D49A7', 20, true, '#FFFFFF')
  }];

  // Style section titles (single-cell rows)
  let rowIdx = 0;
  for (const row of aoa) {
    const isSectionTitle =
      row.length === 1 &&
      typeof row[0] === 'string' &&
      row[0].trim().length > 0;
    if (isSectionTitle) {
      styles.push({
        cell: a1Address(rowIdx, 0),
        style: titleStyle('#FFF4E5', 16, true, '#A15C00')
      });
      merges.push({
        s: { r: rowIdx, c: 0 },
        e: { r: rowIdx, c: Math.max(0, maxCols - 1) }
      });
    }
    rowIdx += 1;
  }

  return { aoa, merges, styles };
}

function formatPercent(value) {
  if (value == null || Number.isNaN(value)) return '';
  // Accept 0-1 or 0-100 inputs
  const v = value > 1 ? value : value * 100;
  return `${Math.round(v)}%`;
}

function safeNum(n) {
  if (n == null || Number.isNaN(n)) return '';
  return Number(n);
}

function normalizePercent(value) {
  if (value == null || Number.isNaN(Number(value))) return null;
  const num = Number(value);
  // Accept 0..1 or 0..100
  return num > 1 ? num / 100 : num;
}

function titleStyle(fillColor, fontSize = 14, bold = true, fontColor = '#000000') {
  return {
    fill: {
      patternType: 'solid',
      fgColor: { rgb: toRgb(fillColor) },
    },
    font: {
      name: 'Calibri',
      sz: fontSize,
      bold,
      color: { rgb: toRgb(fontColor) },
    },
    alignment: {
      horizontal: 'center',
      vertical: 'center',
    },
  };
}

function toRgb(hex) {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) {
    h = h.split('').map(c => c + c).join('');
  }
  return h.toUpperCase();
}

function a1Address(r, c) {
  return colToLetter(c) + (r + 1);
}

function colToLetter(col) {
  let temp = '';
  let c = col + 1;
  while (c > 0) {
    const rem = (c - 1) % 26;
    temp = String.fromCharCode(65 + rem) + temp;
    c = Math.floor((c - 1) / 26);
  }
  return temp;
}


