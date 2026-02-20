import React, { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import ReportHeader from './ReportHeader'
import OneBranchReport from './one-branch-report/OneBranchReport'
import MoreThanBranchReport from './more-than-branch-report/MoreThanBranchReport'
import QrMoreThanBranchReport from './qr-codes-report/QrMoreThanBranchReport'
import { useDispatch, useSelector } from 'react-redux'
import { getBranches } from '../../store/slices/branchSlice'
import { getQrCodeBranches } from '../../store/slices/QrCode'
import Loading from '../../components/Loading'
import { endOfYear, format, startOfMonth, startOfYear } from 'date-fns'
import { moreThanBranchReport, oneBranchReport, qrCodeReport } from '../../store/slices/reportSlice'
import Swal from 'sweetalert2'
import { getSteps } from '../../store/slices/stepSlice'
import { de, ar } from 'date-fns/locale';
import { generateReportPdf } from '../../utils/generateReportPdf';
import { exportToExcel, buildBranchReportSheet, buildMultiBranchReportSheet } from '../../utils/exportExcel';

const Reports = () => {
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState('one'); // one , more , qr
  const dispatch = useDispatch() ;
  
  // Refs for report components
  const oneBranchReportRef = useRef(null);
  const moreThanBranchReportRef = useRef(null);
  const qrCodesReportRef = useRef(null);

  // Remove the hardcoded qrCodes array
  // const qrCodes = [
  //   { value: 'qr1', label: t("text.QR_Code_1") },
  //   { value: 'qr2', label: t("text.QR_Code_2") },
  //   { value: 'qr3', label: t("text.QR_Code_3") },
  // ];

  const [branches , setBranches] = useState ([])
  const [qrCodes, setQrCodes] = useState([])

  const [selectedBranch, setSelectedBranch] = useState('');
  const [allSteps , setAllSteps] = useState([])
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [selectedQRCode, setSelectedQRCode] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: startOfYear(new Date()),
    endDate: endOfYear(new Date()),
  });
  const [stepsIdsFromOneBranch, setStepsIdsFromOneBranch] = useState([]);
  const [stepsIdsFromMoreThanBranch, setStepsIdsFromMoreThanBranch] = useState([]);
  const [selectedQrBranches, setSelectedQrBranches] = useState([]);
  const [stepsIdsFromQrBranches, setStepsIdsFromQrBranches] = useState([]);
  
  // branches data
  const getBranchesData = useSelector(state => state.branchData.getBranchesData) ;
  const getBranchesDataLoading = useSelector(state => state.branchData.getBranchesDataLoading) ;

  // steps data
  const getStepsData = useSelector(state => state.stepData.getStepsData) ;
  const getStepsDataLoading = useSelector(state => state.stepData.getStepsLoading) ;

  // qr codes data
  const getQrCodeBranchesData = useSelector(state => state.qrCodeData.qrCodeBranchesData) ;
  const getQrCodeBranchesLoading = useSelector(state => state.qrCodeData.qrCodeBranchesLoading) ;

  // onBranchReport data
  const oneBranchReportData = useSelector(state => state.reportData.oneBranchReportData) ;
  const oneBranchReportLoading = useSelector(state => state.reportData.oneBranchReportLoading) ;

  // moreThanBranchReport data
  const moreThanBranchReportData = useSelector(state => state.reportData.moreThanBranchReportData) ;
  const moreThanBranchReportLoading = useSelector(state => state.reportData.moreThanBranchReportLoading) ;

  // qrCodeReport data
  const qrCodeReportData = useSelector(state => state.reportData.qrCodeReportData) ;
  const qrCodeReportLoading = useSelector(state => state.reportData.qrCodeReportLoading) ;


  const [oneBranchData , setOneBranchData] = useState({})
  const [moreThanBranchData , setMoreThanBranchData] = useState({})
  const [qrCodeData , setQrCodeData] = useState({})

  const handleStepsIdsChangeFromOneBranch = (newStepsIds) => {
    setStepsIdsFromOneBranch(newStepsIds)
  }

  // Handle Excel export
  const handleExportExcel = async () => {
    let reportName = '';

    switch(selected) {
      case 'one': {
        const selectedBranchData = branches.find(branch => branch.id === selectedBranch);
        reportName = selectedBranchData ? selectedBranchData.name : t("text.One_Branch_Report");
        break;
      }
      case 'more': {
        const selectedBranchesData = branches.filter(branch => selectedBranches.includes(branch.id));
        reportName = selectedBranchesData.length > 0 
          ? selectedBranchesData.map(branch => branch.name).join(' - ')
          : t("text.More_than_Branch_Report");
        break;
      }
      case 'qr': {
        const selectedQrBranchesData = branches.filter(branch => selectedQrBranches.includes(branch.id));
        reportName = selectedQrBranchesData.length > 0 
          ? selectedQrBranchesData.map(branch => branch.name).join(' - ')
          : t("text.QR_Codes_Report");
        break;
      }
      default:
        reportName = t("text.Report");
    }

    const formattedDateRange = `${format(dateRange.startDate, 'dd/MM/yyyy', { locale: i18n.language === 'ar' ? ar : undefined })} - ${format(dateRange.endDate, 'dd/MM/yyyy', { locale: i18n.language === 'ar' ? ar : undefined })}`;

    // Always include an info sheet
    const infoSheet = [
      [t("text.Report_Name") || "Report Name", reportName],
      [t("text.Report_Type") || "Report Type", selected],
      [t("text.Date_Range") || "Date Range", formattedDateRange],
    ];

    // Build a sheet that mirrors the Google Sheet example for the One Branch report
    let structuredSheet = null;
    if (selected === 'one' && oneBranchData) {
      // Overall evaluation: ممتاز | متوسط | ضعيف from generalRate.percentages
      const percentages = oneBranchData?.generalRate?.percentages || {};
      const overallEvaluation = [
        { category: 'ممتاز', percent: normalizePercent(percentages.excellent) },
        { category: 'متوسط', percent: normalizePercent(percentages.normal) },
        { category: 'ضعيف',  percent: normalizePercent(percentages.bad) },
      ];

      // Question types: إيجابي | متوسط | سلبي using reviewStats counts and percentages
      const rs = oneBranchData?.reviewStats || {};
      const positive = Number(rs.mission_positive || 0);
      const neutral = Number(rs.mission_neutral || 0);
      const negative = Number(rs.mission_negative || 0);
      const totalMissions = Number(rs.total_missions || positive + neutral + negative || 0);
      const pct = (n) => totalMissions > 0 ? (n / totalMissions) : 0;
      const questionTypes = [
        { type: 'إيجابي', count: positive, percent: pct(positive) },
        { type: 'متوسط', count: neutral,  percent: pct(neutral) },
        { type: 'سلبي',   count: negative, percent: pct(negative) },
      ];

      // Monthly department scores: months as rows, steps as columns
      const steps = oneBranchData?.stepMonthlyTrend?.steps || [];
      const allMonths = [...new Set(steps.flatMap(s => (s.chart || []).map(it => it.month)))];
      const stepNames = steps.map(s => s.step_name);
      const monthlyDepartmentScores = allMonths.map(month => {
        const row = { month };
        steps.forEach(s => {
          const found = (s.chart || []).find(it => it.month === month);
          row[s.step_name] = found ? safeNum(found.average_rating) : 0;
        });
        return row;
      });

      // Department averages: from stepAverageStats.chart (label, value)
      const avgChart = oneBranchData?.stepAverageStats?.chart || [];
      const departmentAveragesForBranch = avgChart.map(item => ({
        department: item.label,
        performancePercent: normalizePercent(item.value),
      }));

      // Improvement percentage over time
      const branchImprovementTrend = (oneBranchData?.branchImprovementTrend?.chart || []).map(item => ({
        month: item.month,
        value: normalizePercent(item.value),
      }));

      // Rate of development in each section (previous vs current month)
      const stepDevelopmentComparison = (oneBranchData?.stepDevelopmentTrend?.chart || []).map(item => ({
        label: item.label,
        first: normalizePercent(item.first),
        second: normalizePercent(item.second),
      }));

      // Department development rate over time
      const stepProgressOverTime = (oneBranchData?.stepProgressOverTime?.charts || []).map(step => ({
        name: step.name || step.label,
        data: (step.data || []).map(d => ({ month: d.month, value: safeNum(d.value) })),
      }));

      structuredSheet = buildBranchReportSheet({
        title: t("text.One_Branch_Report") || "أكسيل فرع واحد",
        overallEvaluation,
        questionTypes,
        monthlyDepartmentScores: reshapeMonthlyForAoa(monthlyDepartmentScores, stepNames),
        departmentAveragesForBranch,
        branchImprovementTrend,
        stepDevelopmentComparison,
        stepProgressOverTime,
      });
    } else if (selected === 'more' && moreThanBranchData) {
      // Map multi-branch datasets
      const topBranchesByStepRating = moreThanBranchData.topBranchesByStepRating || [];
      const questionStatsPerBranch = moreThanBranchData.questionStatsPerBranch || null;

      // Prefer dataset with average_rating if present; otherwise fall back to topBranchesByStepRating
      const overallEvaluationPerBranch =
        (moreThanBranchData.topBranchesByStepRating || []).map(b => ({
          branch_name: b.branch_name,
          average_rating: b.average_rating != null ? b.average_rating : b.percentage
        }));

      const branchesImprovementTrend = moreThanBranchData.branchImprovementTrend || [];
      const stepMonthlyTrendPerBranch = moreThanBranchData.stepMonthlyTrendPerBranch || [];
      const averageRatingPerStep = moreThanBranchData.averageRatingPerStep || [];
      const monthlyBranchRatingsFromSteps = moreThanBranchData.monthlyBranchRatingsFromSteps || [];
      const stepImprovementPerBranch = moreThanBranchData.stepImprovementPerBranch || [];
      const stepStatsGroupedByStep = moreThanBranchData.stepStatsGroupedByStep || [];

      structuredSheet = buildMultiBranchReportSheet({
        title: t("text.More_than_Branch_Report") || 'تقرير أكثر من فرع',
        topBranchesByStepRating,
        questionStatsPerBranch,
        overallEvaluationPerBranch,
        branchesImprovementTrend,
        stepMonthlyTrendPerBranch,
        averageRatingPerStep,
        monthlyBranchRatingsFromSteps,
        stepImprovementPerBranch,
        stepStatsGroupedByStep,
      });
    } else if (selected === 'qr' && qrCodeData) {
      // QR report reuses multi-branch structure but with QR-scoped data
      const topBranchesByStepRating = qrCodeData.topBranchesByStepRating || [];
      const questionStatsPerBranch = qrCodeData.questionStatsPerBranch || null;
      const overallEvaluationPerBranch =
        (qrCodeData.topBranchesByStepRating || []).map(b => ({
          branch_name: b.branch_name,
          average_rating: b.average_rating != null ? b.average_rating : b.percentage
        }));
      const branchesImprovementTrend = qrCodeData.branchImprovementTrend || [];
      const stepMonthlyTrendPerBranch = qrCodeData.stepMonthlyTrendPerBranch || [];
      const averageRatingPerStep = qrCodeData.averageRatingPerStep || [];
      const monthlyBranchRatingsFromSteps = qrCodeData.monthlyBranchRatingsFromSteps || [];
      const stepImprovementPerBranch = qrCodeData.stepImprovementPerBranch || [];
      const stepStatsGroupedByStep = qrCodeData.stepStatsGroupedByStep || [];

      structuredSheet = buildMultiBranchReportSheet({
        title: t("text.QR_Codes_Report") || 'تقرير أكواد QR',
        topBranchesByStepRating,
        questionStatsPerBranch,
        overallEvaluationPerBranch,
        branchesImprovementTrend,
        stepMonthlyTrendPerBranch,
        averageRatingPerStep,
        monthlyBranchRatingsFromSteps,
        stepImprovementPerBranch,
        stepStatsGroupedByStep,
      });
    }

    await exportToExcel({
      filename: `${reportName || 'report'}.xlsx`,
      sheets: [
        { name: 'Info', data: infoSheet },
        ...(structuredSheet ? [{ name: 'Report', data: structuredSheet }] : []),
      ],
    });
  };

  // Utilities for Excel shaping
  function normalizePercent(value) {
    if (value == null || Number.isNaN(Number(value))) return null;
    const num = Number(value);
    // Accept 0..1 or 0..100
    return num > 1 ? num / 100 : num;
  }

  function safeNum(n) {
    if (n == null || Number.isNaN(Number(n))) return 0;
    return Number(n);
  }

  // Convert monthlyDepartmentScores objects into the format expected by buildBranchReportSheet:
  // We pass AOA directly later, but here we prepare object list compatible with helper’s AOA builder.
  function reshapeMonthlyForAoa(rows, stepNames) {
    // The helper expects AOA-like rows when fed as monthlyDepartmentScores; we’ll pass rows as-is
    // and the helper will render as month + columns. Here, we keep as objects; the helper handles it.
    // However, our helper expects AOA; so we convert to array-of-objects that it will map.
    // To keep compatibility, we’ll return rows with keys: month + each step name.
    return rows.map(r => r);
  }
  const handleStepsIdsChangeFromQrBranches = (newStepsIds) => {
    setStepsIdsFromQrBranches(newStepsIds)
  }
  const handleStepsIdsChangeFromMoreThanBranch = (newStepsIds) => {
    setStepsIdsFromMoreThanBranch(newStepsIds)
  }

  // Custom handler for more than branch selection
  const handleMoreThanBranchSelection = (newSelectedBranches) => {
    // If deselecting all (empty array), select only the first branch
    if (newSelectedBranches.length === 0 && branches.length > 0) {
      setSelectedBranches([branches[0].id]);
    } else {
      setSelectedBranches(newSelectedBranches);
    }
  }
  // Custom handler for QR branch selection
  const handleQrBranchSelection = (newSelectedBranches) => {
    if (newSelectedBranches.length === 0 && branches.length > 0) {
      setSelectedQrBranches([branches[0].id]);
    } else {
      setSelectedQrBranches(newSelectedBranches);
    }
  }
  
  // Handle print functionality
  const handlePrint = async (note = '') => {
    let reportRef = null;
    let reportName = '';
    
    switch(selected) {
      case 'one':
        reportRef = oneBranchReportRef;
        // Get selected branch name
        const selectedBranchData = branches.find(branch => branch.id === selectedBranch);
        reportName = selectedBranchData ? selectedBranchData.name : t("text.One_Branch_Report");
        break;
      case 'more':
        reportRef = moreThanBranchReportRef;
        // Get selected branches names
        const selectedBranchesData = branches.filter(branch => selectedBranches.includes(branch.id));
        reportName = selectedBranchesData.length > 0 
          ? selectedBranchesData.map(branch => branch.name).join(' - ')
          : t("text.More_than_Branch_Report");
        break;
      case 'qr':
        reportRef = qrCodesReportRef;
        // Use selected branches names for QR report
        const selectedQrBranchesData = branches.filter(branch => selectedQrBranches.includes(branch.id));
        reportName = selectedQrBranchesData.length > 0 
          ? selectedQrBranchesData.map(branch => branch.name).join(' - ')
          : t("text.QR_Codes_Report");
        break;
      default:
        return;
    }
    
    if (reportRef && reportRef.current) {
      try {
        // Show loading
        Swal.fire({
          title: t("text.Generating_PDF"),
          text: t("text.Please_wait"),
          allowOutsideClick: false,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
        });
        
        // No need to wait here anymore as we handle it in generateReportPdf
        
        // Format date range for display
        const formattedDateRange = `${format(dateRange.startDate, 'dd/MM/yyyy', { locale: i18n.language === 'ar' ? ar : undefined })} - ${format(dateRange.endDate, 'dd/MM/yyyy', { locale: i18n.language === 'ar' ? ar : undefined })}`;
        
        // Generate PDF with note
        await generateReportPdf(reportRef, reportName, i18n.language === 'ar', formattedDateRange, note);
        
        // Close loading and show success
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: t("text.Success"),
          text: t("text.PDF_generated_successfully"),
          showConfirmButton: true,
          confirmButtonText: t("text.Ok"),
          confirmButtonColor: '#3085d6'
        });
      } catch (error) {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: t("text.Error"),
          text: t("text.Failed_to_generate_PDF"),
          showConfirmButton: true,
          confirmButtonText: t("text.Ok"),
          confirmButtonColor: '#d33'
        });
      }
    }
  }
  useEffect(()=>{
    dispatch(getBranches())
    dispatch(getSteps())
    dispatch(getQrCodeBranches())
  },[])
  
  useEffect(()=>{
    if (getBranchesData?.status) {
      setBranches(getBranchesData?.data?.branches)
      // Set the first branch as default  and selectedBranch
      if (getBranchesData?.data?.branches && getBranchesData?.data?.branches?.length > 0 ) {
        const firstBranchId = getBranchesData?.data?.branches[0]?.id;
        setSelectedBranch(firstBranchId);
        // Set all branches as selected by default
        const allBranchIds = getBranchesData?.data?.branches.map(branch => branch.id);
        setSelectedBranches(allBranchIds)
      }
    }
  },[getBranchesData])

  useEffect(()=>{
    if (getStepsData?.status) {
      setAllSteps(getStepsData?.data?.steps)
    }
  },[getStepsData])

  useEffect(()=>{
    if (getQrCodeBranchesData?.status) {
   
      // Transform the API response to match the CustomSelect format
      const transformedQrCodes = getQrCodeBranchesData?.data?.QrCodes?.map(qrCode => ({
        value: qrCode.id,
        label: qrCode.name
      })) || [];
      setQrCodes(transformedQrCodes)
      
      // Set the first QR code as default if no QR code is selected
      if (transformedQrCodes.length > 0 ) {
        
        setSelectedQRCode(transformedQrCodes[0].value)
      }
    }
  },[getQrCodeBranchesData])



  useEffect(()=>{
    if (oneBranchReportData?.status) {
      setOneBranchData(oneBranchReportData.data)
    }
  },[oneBranchReportData])

  useEffect(()=>{
    if (moreThanBranchReportData?.status) {
      setMoreThanBranchData(moreThanBranchReportData.data)
    }
  },[moreThanBranchReportData])

  useEffect(()=>{
    if (qrCodeReportData?.status) {
      setQrCodeData(qrCodeReportData.data)
    }
  },[qrCodeReportData])

  // Separate initialization effect - only runs when data is loaded
  useEffect(() => {
    if (getBranchesData?.status && branches.length > 0) {
      if (selectedBranch === '') {
        setSelectedBranch(branches[0]?.id);
      }
      // For more than branch, always select all branches by default
      if (selectedBranches.length === 0) {
        const allBranchIds = branches.map(branch => branch.id);
        setSelectedBranches(allBranchIds);
      }
      // For QR branches, select all by default
      if (selectedQrBranches.length === 0) {
        const allBranchIds = branches.map(branch => branch.id);
        setSelectedQrBranches(allBranchIds);
      }
    }
  }, [getBranchesData?.status, branches, selectedBranch, selectedBranches, selectedQrBranches]);

  useEffect(() => {
    if (getQrCodeBranchesData?.status && qrCodes.length > 0) {
      if (selectedQRCode === '') {
        setSelectedQRCode(qrCodes[0]?.value);
      }
    }
  }, [getQrCodeBranchesData?.status, qrCodes, selectedQRCode]);

  // Separate effect for API calls - only runs when we have valid data
  useEffect(() => {
    if (selectedBranch && allSteps.length > 0) {
      dispatch(oneBranchReport({
        branch_id: selectedBranch,
        from_date: format(dateRange.startDate, 'yyyy-MM-dd'),
        to_date: format(dateRange.endDate, 'yyyy-MM-dd'),
        step_ids: stepsIdsFromOneBranch.length > 0 ? stepsIdsFromOneBranch : [allSteps[0]?.id],
      }));
    }
  }, [selectedBranch, stepsIdsFromOneBranch, dateRange, allSteps, dispatch]);

  useEffect(() => {
    if (selectedBranches.length > 0 && allSteps.length > 0) {
      dispatch(moreThanBranchReport({
        branch_ids: selectedBranches,
        from_date: format(dateRange.startDate, 'yyyy-MM-dd'),
        to_date: format(dateRange.endDate, 'yyyy-MM-dd'),
        step_ids: stepsIdsFromMoreThanBranch.length > 0 ? stepsIdsFromMoreThanBranch : [allSteps[0]?.id],
      }));
    }
  }, [selectedBranches, stepsIdsFromMoreThanBranch, dateRange, allSteps, dispatch]);

  useEffect(() => {
    if (selectedQrBranches.length > 0 && allSteps.length > 0) {
      dispatch(qrCodeReport({
        from_date: format(dateRange.startDate, 'yyyy-MM-dd'),
        to_date: format(dateRange.endDate, 'yyyy-MM-dd'),
        branch_ids: selectedQrBranches,
        step_ids: stepsIdsFromQrBranches.length > 0 ? stepsIdsFromQrBranches : [allSteps[0]?.id],
      }));
    }
  }, [selectedQrBranches, stepsIdsFromQrBranches, dateRange, allSteps, dispatch]);

  
  
  // useEffect(()=>{
  //   console.log("selectedBranch",selectedBranch)
  // },[selectedBranch])
  // useEffect(()=>{
  //   console.log("selectedBranches",selectedBranches)
  // },[selectedBranches])
  // useEffect(()=>{
  //   console.log("dateRange",dateRange)
  // },[dateRange])
  return (
    <>
    {getBranchesDataLoading || oneBranchReportLoading || moreThanBranchReportLoading || qrCodeReportLoading || getStepsDataLoading || getQrCodeBranchesLoading ? <Loading/> : null}
    <div className='w-full'>
      <ReportHeader
        selected={selected}
        onSelect={setSelected}
        branches={branches}
        qrCodes={qrCodes}
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
        selectedBranches={selectedBranches}
        setSelectedBranches={handleMoreThanBranchSelection}
        selectedQrBranches={selectedQrBranches}
        setSelectedQrBranches={handleQrBranchSelection}
        selectedQRCode={selectedQRCode}
        setSelectedQRCode={setSelectedQRCode}
        dateRange={dateRange}
        setDateRange={setDateRange}
        onPrint={handlePrint}
        onExportExcel={handleExportExcel}
      />
      <div 
        ref={oneBranchReportRef} 
        className="report-content-wrapper"
        style={{ display: selected === 'one' ? 'block' : 'none' }}
      >
        <OneBranchReport oneBranchData={oneBranchData} onStepsIdsChangeFromOneBranch={handleStepsIdsChangeFromOneBranch} allSteps={allSteps} />
      </div>
      <div 
        ref={moreThanBranchReportRef} 
        className="report-content-wrapper"
        style={{ display: selected === 'more' ? 'block' : 'none' }}
      >
        <MoreThanBranchReport moreThanBranchData={moreThanBranchData} onStepsIdsChangeFromMoreThanBranch={handleStepsIdsChangeFromMoreThanBranch} allSteps={allSteps} />
      </div>
      <div 
        ref={qrCodesReportRef} 
        className="report-content-wrapper"
        style={{ display: selected === 'qr' ? 'block' : 'none' }}
      >
        <QrMoreThanBranchReport moreThanBranchData={qrCodeData} onStepsIdsChangeFromMoreThanBranch={handleStepsIdsChangeFromQrBranches} allSteps={allSteps} selectedQrBranches={selectedQrBranches} />
      </div>
    </div>
    </>
  )
}

export default Reports