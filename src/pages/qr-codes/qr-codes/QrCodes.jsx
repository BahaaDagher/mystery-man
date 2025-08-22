import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { getQrCodeBranches } from '../../../store/slices/QrCode'
import QrCodesCart from './QrCodesCart'
import Loading from '../../../components/Loading'

const ApiData = [
  {
    name: 'Branch Name 1',
    responses: 223,
    address: 'King Khalid Rd, Al Sanaiyyah, Al Duwadimi 17436, Saudi Arabia',
  },
  {
    name: 'Branch Name 2',
    responses: 98,
    address: 'King Khalid Rd, Al Sanaiyyah, Al Duwadimi 17436, Saudi Arabia',
  },
  {
    name: 'Branch Name 3',
    responses: 55,
    address: 'King Khalid Rd, Al Sanaiyyah, Al Duwadimi 17436, Saudi Arabia',
  },
  {
    name: 'Branch Name 1',
    responses: 223,
    address: 'King Khalid Rd, Al Sanaiyyah, Al Duwadimi 17436, Saudi Arabia',
  },
  {
    name: 'Branch Name 2',
    responses: 98,
    address: 'King Khalid Rd, Al Sanaiyyah, Al Duwadimi 17436, Saudi Arabia',
  },
  {
    name: 'Branch Name 3',
    responses: 55,
    address: 'King Khalid Rd, Al Sanaiyyah, Al Duwadimi 17436, Saudi Arabia',
  },
  {
    name: 'Branch Name 3',
    responses: 55,
    address: 'King Khalid Rd, Al Sanaiyyah, Al Duwadimi 17436, Saudi Arabia',
  },
]

const QrCodes = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  // Get QR code branches data
  const qrCodeBranchesData = useSelector(state => state.qrCodeData.qrCodeBranchesData);
  const qrCodeBranchesLoading = useSelector(state => state.qrCodeData.qrCodeBranchesLoading);

  // Local state with status-checked data
  const [qrCodes, setQrCodes] = useState([]);

  // Function to refresh QR codes data
  const refreshQrCodes = () => {
    dispatch(getQrCodeBranches());
  };

  useEffect(() => {
    refreshQrCodes();
  }, [dispatch]);

  useEffect(() => {
    if (qrCodeBranchesData && typeof qrCodeBranchesData === 'object') {
      if (qrCodeBranchesData.status === true) {
        setQrCodes(qrCodeBranchesData?.data?.QrCodes || []);
      } else {
        setQrCodes([]);
      }
    }
  }, [qrCodeBranchesData]);

  if (qrCodeBranchesLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-wrap gap-4 w-full">
      {qrCodes.map((item) => (
        <div key={item.id} className="w-full lg:w-[49%]">
          <QrCodesCart item={item} onDeleteSuccess={refreshQrCodes} />
        </div>
      ))}
    </div>
  )
}

export default QrCodes