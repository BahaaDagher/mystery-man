import React, { useState } from 'react'
import QrCodes from './qr-codes/QrCodes'
import Responses from './responses/Responses'
import HeaderTabs from './HeaderTabs'

const QrCodesParent = () => {
  const [activeTab, setActiveTab] = useState('qr-codes');

  return (
    <div className="w-full flex flex-col gap-4">
      <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>
        {activeTab === 'qr-codes' ? <QrCodes /> : <Responses />}
      </div>
    </div>
  )
}

export default QrCodesParent