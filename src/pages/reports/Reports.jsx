import React, { useEffect, useState } from 'react'
import ReportHeader from './ReportHeader'
import OneBranchReport from './one-branch-report/OneBranchReport'
import MoreThanBranchReport from './more-than-branch-report/MoreThanBranchReport'
import QrCodesReport from './qr-codes-report/QrCodesReport'
import { useDispatch, useSelector } from 'react-redux'
import { getBranches } from '../../store/slices/branchSlice'
import Loading from '../../components/Loading'
import { format, startOfMonth } from 'date-fns'
import { moreThanBranchReport, oneBranchReport } from '../../store/slices/reportSlice'
import Swal from 'sweetalert2'
import { getSteps } from '../../store/slices/stepSlice'

const qrCodes = [
  { value: 'qr1', label: 'QR Code 1' },
  { value: 'qr2', label: 'QR Code 2' },
  { value: 'qr3', label: 'QR Code 3' },
];

const Reports = () => {
  const [selected, setSelected] = useState('one');
  const dispatch = useDispatch() ;

  const [branches , setBranches] = useState ([])

  const [selectedBranch, setSelectedBranch] = useState('');
  const [allSteps , setAllSteps] = useState([])
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [selectedQRCodes, setSelectedQRCodes] = useState([]);
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


  // onBranchReport data
  const oneBranchReportData = useSelector(state => state.reportData.oneBranchReportData) ;
  const oneBranchReportLoading = useSelector(state => state.reportData.oneBranchReportLoading) ;

  // moreThanBranchReport data
  const moreThanBranchReportData = useSelector(state => state.reportData.moreThanBranchReportData) ;
  const moreThanBranchReportLoading = useSelector(state => state.reportData.moreThanBranchReportLoading) ;


  const [oneBranchData , setOneBranchData] = useState({})
  const [moreThanBranchData , setMoreThanBranchData] = useState({})

  const handleStepsIdsChangeFromOneBranch = (newStepsIds) => {
    setStepsIdsFromOneBranch(newStepsIds)
  }
  const handleStepsIdsChangeFromMoreThanBranch = (newStepsIds) => {
    setStepsIdsFromMoreThanBranch(newStepsIds)
  }
  useEffect(()=>{
    dispatch(getBranches())
    dispatch(getSteps())
  },[])
  
  useEffect(()=>{
    if (getBranchesData?.status) {
      setBranches(getBranchesData?.data?.branches)
      // Set the first branch as default  and selectedBranch
      if (getBranchesData?.data?.branches && getBranchesData?.data?.branches?.length > 0 && branches.length === 0) {
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
    if (selectedBranch === '') {
      setSelectedBranch(getBranchesData?.data?.branches[0]?.id)
    }
    if (selectedBranches.length === 0) {
      setSelectedBranches([getBranchesData?.data?.branches[0]?.id])
    }
    // oneBranchReport
    dispatch(oneBranchReport({
      branch_id: selectedBranch,
      from_date: format(dateRange.startDate, 'yyyy-MM-dd'),
      to_date: format(dateRange.endDate, 'yyyy-MM-dd'),
      step_ids: stepsIdsFromOneBranch.length > 0 ? stepsIdsFromOneBranch : [1], // Use stepsIds if available, otherwise default to [1]
    }))
    // moreThanBranchReport
    dispatch(moreThanBranchReport({
      branch_ids: [1,3],
      from_date: format(dateRange.startDate, 'yyyy-MM-dd'),
      to_date: format(dateRange.endDate, 'yyyy-MM-dd'),
      step_ids: stepsIdsFromMoreThanBranch.length > 0 ? stepsIdsFromMoreThanBranch : [1], // Use stepsIds if available, otherwise default to [1]
    }))
    
    
  },[ selectedBranch, selectedBranches, stepsIdsFromOneBranch , stepsIdsFromMoreThanBranch , dateRange   ])

  
  
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
    {getBranchesDataLoading || oneBranchReportLoading || moreThanBranchReportLoading || getStepsDataLoading ? <Loading/> : null}
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
        selectedQRCodes={selectedQRCodes}
        setSelectedQRCodes={setSelectedQRCodes}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      {selected === 'one' && <OneBranchReport oneBranchData={oneBranchData} onStepsIdsChangeFromOneBranch={handleStepsIdsChangeFromOneBranch} allSteps={allSteps} />}
      {selected === 'more' && <MoreThanBranchReport moreThanBranchData={moreThanBranchData} onStepsIdsChangeFromMoreThanBranch={handleStepsIdsChangeFromMoreThanBranch} allSteps={allSteps} />}
      {selected === 'qr' && <QrCodesReport />}
    </div>
    </>
  )
}

export default Reports