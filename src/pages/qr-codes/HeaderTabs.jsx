import React from 'react'
import { useNavigate } from 'react-router-dom';

const HeaderTabs = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate() ; 
  const newQrCodePage = () => {
    navigate("/userDashboard/qr-codes/new-qr-code")
  }
  return (
    <div className="flex items-center justify-between  w-full">
      <div className="flex gap-4">
        <div
          onClick={() => setActiveTab('qr-codes')}
          className={`rounded-xl px-6 py-3 font-medium text-base transition-all cursor-pointer ${activeTab === 'qr-codes' ? 'bg-main text-white ' : 'bg-white text-[#222]'} `}
        >
          Qr Codes
        </div>
        <div
          onClick={() => setActiveTab('responses')}
          className={`rounded-xl px-6 py-3 font-medium text-base transition-all cursor-pointer ${activeTab === 'responses' ? 'bg-main text-white ' : 'bg-white text-[#222]'} `}
        >
          Responses
        </div>
      </div>
      {activeTab === 'qr-codes' && (
        <div
          className="bg-black text-white rounded-xl px-6 py-3 font-medium text-base transition-all cursor-pointer "
          onClick={() => newQrCodePage()}
        >
          <span className="text-lg font-bold">+</span> New Qr Code
        </div>
      )}
    </div>
  )
}

export default HeaderTabs