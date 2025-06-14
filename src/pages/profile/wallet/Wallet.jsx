import React from 'react'
import WalletStatistics from './WalletStatistics'
import WalletTable from './WalletTable'

const Wallet = () => {
  return (
    <div>
        <WalletStatistics currentBalance={325} totalBalance={2125} pending={150}/>
        <WalletTable/>
    </div>
  )
}

export default Wallet