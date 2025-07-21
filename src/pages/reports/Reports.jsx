import React, { useEffect, useState } from 'react'
import ReportHeader from './ReportHeader'
import OneBranchReport from './one-branch-report/OneBranchReport'
import MoreThanBranchReport from './more-than-branch-report/MoreThanBranchReport'
import QrCodesReport from './qr-codes-report/QrCodesReport'
import { useDispatch, useSelector } from 'react-redux'
import { getBranches } from '../../store/slices/branchSlice'
import Loading from '../../components/Loading'
import { format, startOfMonth } from 'date-fns'
import { oneBranchReport } from '../../store/slices/reportSlice'

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
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [selectedQRCodes, setSelectedQRCodes] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: startOfMonth(new Date()),
      endDate: new Date(),
  });
  const [stepsIds, setStepsIds] = useState([]);
  
  // branches data
  const getBranchesData = useSelector(state => state.branchData.getBranchesData) ;
  const getBranchesDataLoading = useSelector(state => state.branchData.getBranchesDataLoading) ;

  // onBranchReport data
  const oneBranchReportData = useSelector(state => state.reportData.oneBranchReportData) ;
  const oneBranchReportLoading = useSelector(state => state.reportData.oneBranchReportLoading) ;
  const [oneBranchData , setOneBranchData] = useState({})

  const handleStepsIdsChange = (newStepsIds) => {
    setStepsIds(newStepsIds)
  }

  useEffect(()=>{
    if (getBranchesData?.status) {
      setBranches(getBranchesData?.data?.branches)
      setSelectedBranches([getBranchesData?.data?.branches[0]?.id])
      // Set the first branch as default  and selectedBranch
      if (getBranchesData.data.branches && getBranchesData.data.branches.length > 0 && branches.length === 0) {
        const firstBranchId = getBranchesData.data.branches[0].id;
        setSelectedBranch(firstBranchId);
        setSelectedBranches([firstBranchId])
      }
      if (selectedBranch === '') {
        setSelectedBranch(getBranchesData?.data?.branches[0]?.id)
      }
      if (selectedBranches.length === 0) {
        setSelectedBranches([getBranchesData?.data?.branches[0]?.id])
      }
    }
  },[getBranchesData])

  useEffect(()=>{
    if (oneBranchReportData?.status) {
      setOneBranchData(oneBranchReportData.data)
    }
  },[oneBranchReportData])

  useEffect(()=>{
    if (selected === 'one') {
      dispatch(oneBranchReport({
        branch_id: selectedBranch,
        from_date: format(dateRange.startDate, 'yyyy-MM-dd'),
        to_date: format(dateRange.endDate, 'yyyy-MM-dd'),
        step_ids: stepsIds.length > 0 ? stepsIds : [1], // Use stepsIds if available, otherwise default to [1]
      }))
    }
    dispatch(getBranches())
  },[ , selectedBranch, stepsIds  , dateRange ])
  
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
    {getBranchesDataLoading || oneBranchReportLoading? <Loading/> : null}
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
      {selected === 'one' && <OneBranchReport oneBranchData={oneBranchData} onStepsIdsChange={handleStepsIdsChange} />}
      {selected === 'more' && <MoreThanBranchReport />}
      {selected === 'qr' && <QrCodesReport />}
    </div>
    </>
  )
}

export default Reports