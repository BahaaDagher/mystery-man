import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWalletTransactions } from '../../../store/slices/profileSlice'
import WalletStatistics from './WalletStatistics'
import WalletTable from './WalletTable'
import Loading from '../../../components/Loading'

const Wallet = () => {
  const dispatch = useDispatch()

  // Redux selectors
  const walletTransactionsData = useSelector(state => state.profileData.getWalletTransactionsData)
  const walletTransactionsLoading = useSelector(state => state.profileData.getWalletTransactionsLoading)

  // Fetch wallet transactions on component mount
  useEffect(() => {
    dispatch(getWalletTransactions())
  }, [])

  // Extract data from API response
  const walletBalance = walletTransactionsData?.data?.wallet_balance || 0
  const transactions = walletTransactionsData?.data?.transactions || []

  // Calculate statistics
  const totalBalance = 0
  const pending = 0
  const currentBalance = walletBalance

  return (
    <div>
      {walletTransactionsLoading ? (
        <Loading />
      ) : (
        <>
          <WalletStatistics 
            currentBalance={currentBalance} 
            totalBalance={totalBalance} 
            pending={pending}
          />
          <WalletTable transactions={transactions} />
        </>
      )}
    </div>
  )
}

export default Wallet