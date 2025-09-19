import React, { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import ReportHeader from './ReportHeader'
import OneBranchReport from './one-branch-report/OneBranchReport'
import MoreThanBranchReport from './more-than-branch-report/MoreThanBranchReport'
import QrCodesReport from './qr-codes-report/QrCodesReport'
import { useDispatch, useSelector } from 'react-redux'
import { getBranches } from '../../store/slices/branchSlice'
import { getQrCodeBranches } from '../../store/slices/QrCode'
import Loading from '../../components/Loading'
import { format, startOfMonth } from 'date-fns'
import { moreThanBranchReport, oneBranchReport, qrCodeReport } from '../../store/slices/reportSlice'
import Swal from 'sweetalert2'
import { getSteps } from '../../store/slices/stepSlice'
import { de, ar } from 'date-fns/locale';
import { generateReportPdf } from '../../utils/generateReportPdf';

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
    startDate: startOfMonth(new Date()),
      endDate: new Date(),
  });
  const [stepsIdsFromOneBranch, setStepsIdsFromOneBranch] = useState([]);
  const [stepsIdsFromMoreThanBranch, setStepsIdsFromMoreThanBranch] = useState([]);
  
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
  const handleStepsIdsChangeFromMoreThanBranch = (newStepsIds) => {
    setStepsIdsFromMoreThanBranch(newStepsIds)
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
        // Get selected QR code name
        const selectedQrData = qrCodes.find(qr => qr.value == selectedQRCode);
        console.log("selectedQrData",qrCodes);
        reportName = selectedQrData ? selectedQrData.label : t("text.QR_Codes_Report");
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
        setSelectedBranches([firstBranchId])
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

  useEffect(()=>{
    if (selectedBranch === '') {
      setSelectedBranch(getBranchesData?.data?.branches[0]?.id)
    }
    if (selectedBranches.length === 0) {
      setSelectedBranches([getBranchesData?.data?.branches[0]?.id])
    }
    if (selectedQRCode === '') {
      setSelectedQRCode(qrCodes[0]?.value)
    }
    // oneBranchReport
    dispatch(oneBranchReport({
      branch_id: selectedBranch,
      from_date: format(dateRange.startDate, 'yyyy-MM-dd'),
      to_date: format(dateRange.endDate, 'yyyy-MM-dd'),
      step_ids: stepsIdsFromOneBranch.length > 0 ? stepsIdsFromOneBranch : [allSteps[0]?.id], // Use stepsIds if available, otherwise default to [1]
    }))
    // moreThanBranchReport
    dispatch(moreThanBranchReport({
      branch_ids: selectedBranches,
      from_date: format(dateRange.startDate, 'yyyy-MM-dd'),
      to_date: format(dateRange.endDate, 'yyyy-MM-dd'),
      step_ids: stepsIdsFromMoreThanBranch.length > 0 ? stepsIdsFromMoreThanBranch : [allSteps[0]?.id], // Use stepsIds if available, otherwise default to [1]
    }))
    // qrCodeReport
    dispatch(qrCodeReport({
      from_date: format(dateRange.startDate, 'yyyy-MM-dd'),
      to_date: format(dateRange.endDate, 'yyyy-MM-dd'),
      qr_code_id: selectedQRCode, // Use selected QR code
    }))
    
    
  },[ selectedBranch, selectedBranches, selectedQRCode, stepsIdsFromOneBranch , stepsIdsFromMoreThanBranch , dateRange   ])

  
  
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
        setSelectedBranches={setSelectedBranches}
        selectedQRCode={selectedQRCode}
        setSelectedQRCode={setSelectedQRCode}
        dateRange={dateRange}
        setDateRange={setDateRange}
        onPrint={handlePrint}
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
        <QrCodesReport qrCodeData={qrCodeData} />
      </div>
    </div>
    </>
  )
}

export default Reports