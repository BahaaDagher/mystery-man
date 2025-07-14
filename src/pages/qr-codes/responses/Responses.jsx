import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import editIcon2 from '../../../assets/icons/editIcon2.svg'
import deleteIcon2 from '../../../assets/icons/deleteIcon2.svg'

const ApiData = [
  { id: 1, qrCodeName: 'QR Code 1', date: 'Oct. 18, 2024', rate: 4.5 },
  { id: 2, qrCodeName: 'QR Code 2', date: 'Oct. 18, 2024', rate: 3.8 },
  { id: 3, qrCodeName: 'QR Code 3', date: 'Oct. 18, 2024', rate: 4.2 },
  { id: 4, qrCodeName: 'QR Code 4', date: 'Oct. 18, 2024', rate: 4.0 },
  { id: 5, qrCodeName: 'QR Code 5', date: 'Oct. 18, 2024', rate: 3.5 },
  { id: 6, qrCodeName: 'QR Code 6', date: 'Oct. 18, 2024', rate: 4.7 },
  { id: 7, qrCodeName: 'QR Code 7', date: 'Oct. 18, 2024', rate: 4.1 },
  { id: 8, qrCodeName: 'QR Code 8', date: 'Oct. 18, 2024', rate: 3.9 },
  { id: 9, qrCodeName: 'QR Code 9', date: 'Oct. 18, 2024', rate: 4.3 },
  { id: 10, qrCodeName: 'QR Code 10', date: 'Oct. 18, 2024', rate: 4.6 },
  { id: 11, qrCodeName: 'QR Code 11', date: 'Oct. 18, 2024', rate: 3.7 },
  { id: 12, qrCodeName: 'QR Code 12', date: 'Oct. 18, 2024', rate: 4.4 },
  { id: 13, qrCodeName: 'QR Code 13', date: 'Oct. 18, 2024', rate: 4.8 },
  { id: 14, qrCodeName: 'QR Code 14', date: 'Oct. 18, 2024', rate: 3.6 },
  { id: 15, qrCodeName: 'QR Code 15', date: 'Oct. 18, 2024', rate: 4.9 },
  { id: 16, qrCodeName: 'QR Code 16', date: 'Oct. 18, 2024', rate: 4.0 },
  { id: 17, qrCodeName: 'QR Code 17', date: 'Oct. 18, 2024', rate: 3.4 },
  { id: 18, qrCodeName: 'QR Code 18', date: 'Oct. 18, 2024', rate: 4.2 },
]

const ITEMS_PER_PAGE = 5

const Responses = () => {
  const [currentPage, setCurrentPage] = useState(0)

  const pageCount = Math.ceil(ApiData.length / ITEMS_PER_PAGE)
  const handlePageClick = (data) => {
    setCurrentPage(data.selected)
  }

  const offset = currentPage * ITEMS_PER_PAGE
  const currentItems = ApiData.slice(offset, offset + ITEMS_PER_PAGE)

  return (
    <div className="bg-[#f5f7fa] rounded-xl p-5 w-full">
      <div className="overflow-x-auto bg-white rounded-xl p-4">
        <table className="min-w-full">
          <thead>
            <tr className="text-[#7D8592] text-[16px] font-medium">
              <th className="py-3 px-4">Id</th>
              <th className="py-3 px-4">QR Code Name</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Rate</th>
              <th className="py-3 px-4 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, idx) => (
              <tr key={idx} className={`rounded-[10px] ${idx % 2 === 0 ? 'bg-white' : 'bg-gray3'} `}>
                <td className="py-3 px-4 font-medium text-[16px]">{item.id}</td>
                <td className="py-3 px-4 font-medium text-[16px]">{item.qrCodeName}</td>
                <td className="py-3 px-4 font-medium text-[16px]">{item.date}</td>
                <td className="py-3 px-4 font-medium text-[16px]">{item.rate}</td>
                <td className="py-3 px-4 flex items-center justify-center gap-4">
                  <div className="cursor-pointer"><img src={editIcon2} alt="edit"  /></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-6">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={10}
          onPageChange={handlePageClick}
          containerClassName={"flex items-center space-x-2"}
          pageClassName={"rounded-full bg-white px-3 py-1 text-[#222] cursor-pointer"}
          activeClassName={"bg-main text-white"}
          previousClassName={"rounded-full bg-white px-3 py-1 text-[#222] cursor-pointer"}
          nextClassName={"rounded-full bg-white px-3 py-1 text-[#222] cursor-pointer"}
          breakClassName={"px-2"}
          forcePage={currentPage}
        />
      </div>
    </div>
  )
}

export default Responses
