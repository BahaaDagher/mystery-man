import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';

const statusClass = {
  SUCCESS: "bg-lightSuccess text-success",
  FAILED: "bg-lightFailed text-failed",
  PENDING: "bg-gray3 text-black",
};

const WalletTable = ({ transactions = [] }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  const paginatedData = transactions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Format amount with currency
  const formatAmount = (amount, currency) => {
    return `${amount} ${currency}`;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Function to download table as Excel
  const downloadExcel = () => {
    // Prepare data for Excel
    const data = transactions.map(row => {
      const statusText = row.status === 'SUCCESS' ? t('text.success') : 
                        row.status === 'FAILED' ? t('text.failed') : 
                        row.status === 'PENDING' ? t('text.pending_status') : row.status;
      
      return {
        [t('text.transaction_id')]: row.id,
        [t('text.transaction_status')]: statusText,
        [t('text.transaction_amount')]: formatAmount(row.amount, row.currency),
        [t('text.balance_before')]: formatAmount(row.balanceBefore, row.currency),
        [t('text.balance_after')]: formatAmount(row.balanceAfter, row.currency),
        [t('text.operation_type')]: row.type_text,
        [t('text.transaction_date')]: formatDate(row.date)
      };
    });

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    
    // Set column widths
    ws['!cols'] = [
      { wch: 15 }, // ID column
      { wch: 15 }, // Status column
      { wch: 15 }, // Amount column
      { wch: 15 }, // Balance Before column
      { wch: 15 }, // Balance After column
      { wch: 15 }, // Type column
      { wch: 15 }  // Date column
    ];
    
    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Wallet Transactions');
    
    // Download Excel file
    XLSX.writeFile(wb, `wallet_transactions_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <>
      {/* Button to download table by Excel sheet */}
      {transactions.length > 0 && (
        <div className="flex justify-end mb-4">
          <button 
            onClick={downloadExcel}
            className="border-0 px-4 py-2 bg-gold text-white rounded-lg  transition-colors"
          >
            {t('text.download_excel')}
          </button>
        </div>
      )}

      <div className="rounded-[10px] bg-white p-4  w-full overflow-x-auto">
        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-500 text-lg font-medium mb-2">{t('text.no_transactions_found')}</div>
            <div className="text-gray-400 text-sm">{t('text.no_transactions_message')}</div>
          </div>
        ) : (
          <>
            <table className="min-w-full text-sm text-gray-700">
              <thead>
                <tr className=" text-[14px] text-gray4 ">
                  <th className="p-3">{t('text.transaction_id')}</th>
                  <th className="p-3">{t('text.transaction_status')}</th>
                  <th className="p-3">{t('text.transaction_amount')}</th>
                  <th className="p-3">{t('text.balance_before')}</th>
                  <th className="p-3">{t('text.balance_after')}</th>
                  <th className="p-3">{t('text.operation_type')}</th>
                  <th className="p-3">{t('text.transaction_date')}</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, idx) => (
                  <tr
                  key={idx}
                  className={`odd:bg-lightGray ${row.status === 'FAILED' ? 'opacity-50' : ''}`}
                  >
                    <td className="p-3 font-bold">{row.id}</td>
                    <td className="p-3" >
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-semibold ${statusClass[row.status]}`}
                      >
                        {row.status === 'SUCCESS' ? t('text.success') : 
                        row.status === 'FAILED' ? t('text.failed') : 
                        row.status === 'PENDING' ? t('text.pending_status') : row.status}
                      </span>
                    </td>
                    <td className={`p-3  text-[16px] font-[700] ${row.status === 'FAILED' ? 'text-gray2' : row.type === 1 ? 'text-success' : row.type === 2 ? 'text-danger' : 'text-success'}`} >{formatAmount(row.amount, row.currency)}</td>
                    <td className="p-3 text-gray text-[16px] font-[700]">{formatAmount(row.balanceBefore, row.currency)}</td>
                    <td className="p-3 text-gray text-[16px] font-[700]">{formatAmount(row.balanceAfter, row.currency)}</td>
                    <td className={`p-3 text-[16px] font-[700] ${row.type === 1 ? 'text-success' : row.type === 2 ? 'text-danger' : ''}`}>{row.type_text}</td>
                    <td className="p-3">{formatDate(row.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          {/* Pagination */}
              <div className="flex justify-center items-center gap-2 mt-4">
                  <div
                      className="px-[10px] py-[6px] rounded-full bg-gray3 cursor-pointer"
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  >
                      &lt;
                  </div>

                  {(() => {
                      const pages = [];
                      const maxVisible = 5;

                      if (totalPages <= maxVisible) {
                      for (let i = 1; i <= totalPages; i++) {
                          pages.push(i);
                      }
                      } else {
                      if (currentPage < 4) {
                          pages.push(1, 2, 3, 4, '...');
                      } else if (currentPage > totalPages - 3) {
                          pages.push(1,'...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
                      } else {
                          pages.push(1,'...', currentPage - 1, currentPage, currentPage + 1, '...');
                      }
                      }

                      // Always add the last page if not already visible
                      if (totalPages > maxVisible && pages[pages.length - 1] !== totalPages) {
                      pages.push(totalPages);
                      }

                      return pages.map((p, i) =>
                      p === '...' ? (
                          <span key={i} className="px-3 py-1 text-gray-400">...</span>
                      ) : (
                          <div
                              key={i}
                              onClick={() => setCurrentPage(p)}
                              className={`px-[10px] py-[6px] rounded-full cursor-pointer ${
                                  currentPage === p ? "bg-main text-white" : "bg-gray3"
                              }`}
                              >
                              {p}
                          </div>
                      )
                      );
                  })()}

                  <div
                      className="px-[10px] py-[6px] rounded-full bg-gray3 cursor-pointer"
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  >
                      &gt;
                  </div>
              </div>
          </>
        )}
      </div>
    </>
  );
};

export default WalletTable;
