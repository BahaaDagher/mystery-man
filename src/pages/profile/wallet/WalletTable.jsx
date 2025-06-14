import React, { useState } from "react";

const data = [
  {
    id: 1,
    details: "add balance",
    status: "SUCCESS",
    method: "MasterCard",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 2,
    details: "add balance",
    status: "FAILED",
    method: "Visa",
    amountBefore: "214 SAR",
    amount: "00",
    date: "Oct. 18, 2024",
  },
  {
    id: 3,
    details: "renew package",
    status: "SUCCESS",
    method: "MasterCard",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 4,
    details: "add balance",
    status: "FAILED",
    method: "Visa",
    amountBefore: "214 SAR",
    amount: "00",
    date: "Oct. 18, 2024",
  },
  {
    id: 5,
    details: "renew package",
    status: "SUCCESS",
    method: "MasterCard",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 6,
    details: "renew package",
    status: "PENDING",
    method: "Visa",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 7,
    details: "renew package",
    status: "SUCCESS",
    method: "MasterCard",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 8,
    details: "add balance",
    status: "FAILED",
    method: "Visa",
    amountBefore: "214 SAR",
    amount: "00",
    date: "Oct. 18, 2024",
  },
  {
    id: 9,
    details: "add balance",
    status: "SUCCESS",
    method: "MasterCard",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 10,
    details: "add balance",
    status: "FAILED",
    method: "Visa",
    amountBefore: "214 SAR",
    amount: "00",
    date: "Oct. 18, 2024",
  },
  {
    id: 11,
    details: "renew package",
    status: "SUCCESS",
    method: "MasterCard",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 12,
    details: "add balance",
    status: "FAILED",
    method: "Visa",
    amountBefore: "214 SAR",
    amount: "00",
    date: "Oct. 18, 2024",
  },
  {
    id: 13,
    details: "renew package",
    status: "SUCCESS",
    method: "MasterCard",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 14,
    details: "renew package",
    status: "PENDING",
    method: "Visa",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 15,
    details: "renew package",
    status: "SUCCESS",
    method: "MasterCard",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 16,
    details: "add balance",
    status: "FAILED",
    method: "Visa",
    amountBefore: "214 SAR",
    amount: "00",
    date: "Oct. 18, 2024",
  },
  {
    id: 252,
    details: "add balance",
    status: "SUCCESS",
    method: "MasterCard",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 17,
    details: "add balance",
    status: "FAILED",
    method: "Visa",
    amountBefore: "214 SAR",
    amount: "00",
    date: "Oct. 18, 2024",
  },
  {
    id: 18,
    details: "renew package",
    status: "SUCCESS",
    method: "MasterCard",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 19,
    details: "add balance",
    status: "FAILED",
    method: "Visa",
    amountBefore: "214 SAR",
    amount: "00",
    date: "Oct. 18, 2024",
  },
  {
    id: 20,
    details: "renew package",
    status: "SUCCESS",
    method: "MasterCard",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 21,
    details: "renew package",
    status: "PENDING",
    method: "Visa",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 22,
    details: "renew package",
    status: "SUCCESS",
    method: "MasterCard",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 23,
    details: "add balance",
    status: "FAILED",
    method: "Visa",
    amountBefore: "214 SAR",
    amount: "00",
    date: "Oct. 18, 2024",
  },
  {
    id: 252,
    details: "add balance",
    status: "SUCCESS",
    method: "MasterCard",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 252,
    details: "add balance",
    status: "FAILED",
    method: "Visa",
    amountBefore: "214 SAR",
    amount: "00",
    date: "Oct. 18, 2024",
  },
  {
    id: 252,
    details: "renew package",
    status: "SUCCESS",
    method: "MasterCard",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 252,
    details: "add balance",
    status: "FAILED",
    method: "Visa",
    amountBefore: "214 SAR",
    amount: "00",
    date: "Oct. 18, 2024",
  },
  {
    id: 252,
    details: "renew package",
    status: "SUCCESS",
    method: "MasterCard",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 252,
    details: "renew package",
    status: "PENDING",
    method: "Visa",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 252,
    details: "renew package",
    status: "SUCCESS",
    method: "MasterCard",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 252,
    details: "add balance",
    status: "FAILED",
    method: "Visa",
    amountBefore: "214 SAR",
    amount: "00",
    date: "Oct. 18, 2024",
  },
  {
    id: 252,
    details: "add balance",
    status: "SUCCESS",
    method: "MasterCard",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 252,
    details: "add balance",
    status: "FAILED",
    method: "Visa",
    amountBefore: "214 SAR",
    amount: "00",
    date: "Oct. 18, 2024",
  },
  {
    id: 252,
    details: "renew package",
    status: "SUCCESS",
    method: "MasterCard",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 252,
    details: "add balance",
    status: "FAILED",
    method: "Visa",
    amountBefore: "214 SAR",
    amount: "00",
    date: "Oct. 18, 2024",
  },
  {
    id: 252,
    details: "renew package",
    status: "SUCCESS",
    method: "MasterCard",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 252,
    details: "renew package",
    status: "PENDING",
    method: "Visa",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 252,
    details: "renew package",
    status: "SUCCESS",
    method: "MasterCard",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 252,
    details: "add balance",
    status: "FAILED",
    method: "Visa",
    amountBefore: "214 SAR",
    amount: "00",
    date: "Oct. 18, 2024",
  },
  {
    id: 252,
    details: "add balance",
    status: "SUCCESS",
    method: "MasterCard",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 252,
    details: "add balance",
    status: "FAILED",
    method: "Visa",
    amountBefore: "214 SAR",
    amount: "00",
    date: "Oct. 18, 2024",
  },
  {
    id: 252,
    details: "renew package",
    status: "SUCCESS",
    method: "MasterCard",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 252,
    details: "add balance",
    status: "FAILED",
    method: "Visa",
    amountBefore: "214 SAR",
    amount: "00",
    date: "Oct. 18, 2024",
  },
  {
    id: 252,
    details: "renew package",
    status: "SUCCESS",
    method: "MasterCard",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 46,
    details: "renew package",
    status: "PENDING",
    method: "Visa",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 47,
    details: "renew package",
    status: "SUCCESS",
    method: "MasterCard",
    amountBefore: "214 SAR",
    amount: "52 SAR",
    date: "Oct. 18, 2024",
  },
  {
    id: 48,
    details: "add balance",
    status: "FAILED",
    method: "Visa",
    amountBefore: "214 SAR",
    amount: "00",
    date: "Oct. 18, 2024",
  },
  
];

const statusClass = {
  SUCCESS: "bg-lightSuccess text-success",
  FAILED: "bg-lightFailed text-failed",
  PENDING: "bg-gray3 text-black",
};

const WalletTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="rounded-[10px] bg-white p-4  w-full overflow-x-auto">
      <table className="min-w-full text-sm text-gray-700">
        <thead>
          <tr className="text-left text-[14px] text-gray4 ">
            <th className="p-3">ID</th>
            <th className="p-3">Details</th>
            <th className="p-3">Status</th>
            <th className="p-3">Payment Method</th>
            <th className="p-3">Amount Before</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, idx) => (
             <tr
             key={idx}
             className={`odd:bg-lightGray ${row.status === 'FAILED' ? 'opacity-50' : ''}`}
            >
              <td className="p-3 font-bold">{row.id}</td>
              <td className="p-3">{row.details}</td>
              <td className="p-3" >
                <span
                  className={`px-2 py-1 rounded-md text-xs font-semibold ${statusClass[row.status]}`}
                >
                  {row.status}
                </span>
              </td>
              <td className="p-3 flex items-center gap-1">
                <img
                  src={row.method === "MasterCard" ? "https://img.icons8.com/color/24/mastercard-logo.png" : "https://img.icons8.com/color/24/visa.png"}
                  alt="Payment Method"
                />
                <span className="text-xs text-gray-600">{row.method}</span>
              </td>
              <td className="p-3 text-gray text-[16px] font-[700]">{row.amountBefore}</td>
              <td className={`p-3  text-[16px] font-[700] ${row.status === 'FAILED' ? 'text-gray2' : 'text-success'}`} >{row.amount}</td>
              <td className="p-3">{row.date}</td>
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

    </div>
  );
};

export default WalletTable;
