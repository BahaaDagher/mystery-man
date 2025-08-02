import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HeaderTabs = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();
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
          {t("text.Qr_Codes")}
        </div>
        <div
          onClick={() => setActiveTab('responses')}
          className={`rounded-xl px-6 py-3 font-medium text-base transition-all cursor-pointer ${activeTab === 'responses' ? 'bg-main text-white ' : 'bg-white text-[#222]'} `}
        >
          {t("text.Responses")}
        </div>
      </div>
      {activeTab === 'qr-codes' && (
        <div
          className="bg-black text-white rounded-xl px-6 py-3 font-medium text-base transition-all cursor-pointer "
          onClick={() => newQrCodePage()}
        >
          <span className="text-lg font-bold">+</span> {t("text.New_Qr_Code")}
        </div>
      )}
    </div>
  )
}

export default HeaderTabs