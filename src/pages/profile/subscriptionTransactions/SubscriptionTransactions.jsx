import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSubscriptions } from '../../../store/slices/profileSlice'
import Loading from '../../../components/Loading'
import { useTranslation } from 'react-i18next'
import * as XLSX from 'xlsx'

const SubscriptionTransactions = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 5

  // Redux selectors
  const subscriptionsData = useSelector(state => state.profileData.getSubscriptionsData)
  const subscriptionsLoading = useSelector(state => state.profileData.getSubscriptionsLoading)

  // Fetch subscriptions on component mount
  useEffect(() => {
    dispatch(getSubscriptions())
  }, [dispatch])

  // Extract data from API response
  const subscriptions = subscriptionsData?.data?.subscriptions || []
  
  // Pagination
  const totalPages = Math.ceil(subscriptions.length / rowsPerPage)
  const paginatedData = subscriptions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  // Function to download table as Excel
  const downloadExcel = () => {
    // Prepare data for Excel
    const data = subscriptions.map(subscription => ({
      [t('text.ID')]: subscription.id,
      [t('text.Count')]: subscription.count,
      [t('text.Type')]: subscription.type_text,
      [t('text.start_date')]: subscription.start_date,
      [t('text.end_date')]: subscription.end_date,
      [t('text.Status')]: subscription.is_active ? t('text.Active') : t('text.Inactive')
    }))

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(data)
    
    // Set column widths
    ws['!cols'] = [
      { wch: 10 }, // ID column
      { wch: 10 }, // Count column
      { wch: 20 }, // Type column
      { wch: 15 }, // Start Date column
      { wch: 15 }, // End Date column
      { wch: 10 }  // Status column
    ]
    
    // Create workbook
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Subscriptions')
    
    // Download Excel file
    XLSX.writeFile(wb, `subscriptions_${new Date().toISOString().slice(0, 10)}.xlsx`)
  }

  return (
    <div>
      {subscriptionsLoading ? (
        <Loading />
      ) : (
        <div className="rounded-[10px] bg-white p-4 w-full overflow-x-auto mt-4">
          {/* Download Excel Button */}
          {subscriptions.length > 0 && (
            <div className="flex justify-end mb-4">
              <button 
                onClick={downloadExcel}
                className="border-0 px-4 py-2 bg-gold text-white rounded-lg transition-colors"
              >
                {t('text.download_excel')}
              </button>
            </div>
          )}
          
          {subscriptions.length > 0 ? (
            <>
              <table className="min-w-full text-sm text-gray-700">
                <thead>
                  <tr className="text-[14px] text-gray4">
                    <th className="p-3">{t("text.ID")}</th>
                    <th className="p-3">{t("text.Count")}</th>
                    <th className="p-3">{t("text.Type")}</th>
                    <th className="p-3">{t("text.start_date")}</th>
                    <th className="p-3">{t("text.end_date")}</th>
                    <th className="p-3">{t("text.Status")}</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((subscription) => (
                    <tr 
                      key={subscription.id}
                      className="odd:bg-lightGray"
                    >
                      <td className="p-3 font-bold">{subscription.id}</td>
                      <td className="p-3">{subscription.count}</td>
                      <td className="p-3">{subscription.type_text}</td>
                      <td className="p-3">{subscription.start_date}</td>
                      <td className="p-3">{subscription.end_date}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                          subscription.is_active 
                            ? "bg-lightSuccess text-success" 
                            : "bg-lightFailed text-failed"
                        }`}>
                          {subscription.is_active ? t("text.Active") : t("text.Inactive")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-4">
                  <div
                    className="px-[10px] py-[6px] rounded-full bg-gray3 cursor-pointer"
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  >
                    &lt;
                  </div>
                  
                  {(() => {
                    const pages = []
                    const maxVisible = 5
                    
                    if (totalPages <= maxVisible) {
                      for (let i = 1; i <= totalPages; i++) {
                        pages.push(i)
                      }
                    } else {
                      if (currentPage < 4) {
                        pages.push(1, 2, 3, 4, '...')
                      } else if (currentPage > totalPages - 3) {
                        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
                      } else {
                        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...')
                      }
                    }
                    
                    if (totalPages > maxVisible && pages[pages.length - 1] !== totalPages) {
                      pages.push(totalPages)
                    }
                    
                    return pages.map((page, index) =>
                      page === '...' ? (
                        <span key={index} className="px-3 py-1 text-gray-400">
                          ...
                        </span>
                      ) : (
                        <div
                          key={index}
                          onClick={() => setCurrentPage(page)}
                          className={`px-[10px] py-[6px] rounded-full cursor-pointer ${
                            currentPage === page ? "bg-main text-white" : "bg-gray3"
                          }`}
                        >
                          {page}
                        </div>
                      )
                    )
                  })()}
                  
                  <div
                    className="px-[10px] py-[6px] rounded-full bg-gray3 cursor-pointer"
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  >
                    &gt;
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-500 text-lg font-medium mb-2">
                {t("text.No_subscriptions_found")}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SubscriptionTransactions