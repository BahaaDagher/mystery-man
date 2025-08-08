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
  const totalBalance = transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
  const pending = 0 // Since API doesn't provide pending status, defaulting to 0
  const currentBalance = walletBalance

  // Map transactions to expected format for WalletTable

  
  
  
  const mappedTransactions = transactions.map(transaction => ({
    id: transaction.id,
    status: 'SUCCESS', // Default to SUCCESS since API doesn't provide status
    amount: transaction.amount,
    balanceBefore: transaction.balance_before,
    balanceAfter: transaction.balance_after,
    currency: 'SAR',
    date: transaction.created_at
  }))

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
          <WalletTable transactions={mappedTransactions} />
        </>
      )}
    </div>
  )
}

export default Wallet