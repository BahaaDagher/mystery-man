import React, { useState } from 'react'
import ReportHeader from './ReportHeader'
import OneBranchReport from './one-branch-report/OneBranchReport'
import MoreThanBranchReport from './more-than-branch-report/MoreThanBranchReport'
import QrCodesReport from './qr-codes-report/QrCodesReport'

// Mock data simulating API response
const branches = [
  { value: 'branch1', label: 'Branch 1' },
  { value: 'branch2', label: 'Branch 2' },
  { value: 'branch3', label: 'Branch 3' },
];
const qrCodes = [
  { value: 'qr1', label: 'QR Code 1' },
  { value: 'qr2', label: 'QR Code 2' },
  { value: 'qr3', label: 'QR Code 3' },
];

const Reports = () => {
  const [selected, setSelected] = useState('qr');
  const [selectedBranch, setSelectedBranch] = useState(branches[0]?.value || '');
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [selectedQRCodes, setSelectedQRCodes] = useState([]);
  return (
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
      />
      {selected === 'one' && <OneBranchReport />}
      {selected === 'more' && <MoreThanBranchReport />}
      {selected === 'qr' && <QrCodesReport />}
    </div>
  )
}

export default Reports