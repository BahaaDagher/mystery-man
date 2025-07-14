import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import editIcon2 from '../../../assets/icons/editIcon2.svg'
import deleteIcon2 from '../../../assets/icons/deleteIcon2.svg'

const ApiData = [
  { name: 'Branch 1', title: 'نظافة الخارج', DateAndTime: 'Oct. 18, 2024 - 02 : 30 PM' },
  { name: 'Branch 2', title: 'نظافة الخارج', DateAndTime: 'Oct. 18, 2024 - 02 : 30 PM' },
  { name: 'Branch 3', title: 'نظافة الخارج', DateAndTime: 'Oct. 18, 2024 - 02 : 30 PM' },
  { name: 'Branch 4', title: 'نظافة الخارج', DateAndTime: 'Oct. 18, 2024 - 02 : 30 PM' },
  { name: 'Branch 5', title: 'نظافة الخارج', DateAndTime: 'Oct. 18, 2024 - 02 : 30 PM' },
  { name: 'Branch 6', title: 'نظافة الخارج', DateAndTime: 'Oct. 18, 2024 - 02 : 30 PM' },
  { name: 'Branch 7', title: 'نظافة الخارج', DateAndTime: 'Oct. 18, 2024 - 02 : 30 PM' },
  { name: 'Branch 8', title: 'نظافة الخارج', DateAndTime: 'Oct. 18, 2024 - 02 : 30 PM' },
  { name: 'Branch 9', title: 'نظافة الخارج', DateAndTime: 'Oct. 18, 2024 - 02 : 30 PM' },
  { name: 'Branch 10', title: 'نظافة الخارج', DateAndTime: 'Oct. 18, 2024 - 02 : 30 PM' },
  { name: 'Branch 11', title: 'نظافة الخارج', DateAndTime: 'Oct. 18, 2024 - 02 : 30 PM' },
  { name: 'Branch 12', title: 'نظافة الخارج', DateAndTime: 'Oct. 18, 2024 - 02 : 30 PM' },
  { name: 'Branch 13', title: 'نظافة الخارج', DateAndTime: 'Oct. 18, 2024 - 02 : 30 PM' },
  { name: 'Branch 14', title: 'نظافة الخارج', DateAndTime: 'Oct. 18, 2024 - 02 : 30 PM' },
  { name: 'Branch 15', title: 'نظافة الخارج', DateAndTime: 'Oct. 18, 2024 - 02 : 30 PM' },
  { name: 'Branch 16', title: 'نظافة الخارج', DateAndTime: 'Oct. 18, 2024 - 02 : 30 PM' },
  { name: 'Branch 17', title: 'نظافة الخارج', DateAndTime: 'Oct. 18, 2024 - 02 : 30 PM' },
  { name: 'Branch 18', title: 'نظافة الخارج', DateAndTime: 'Oct. 18, 2024 - 02 : 30 PM' },
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
              <th className="py-3 px-4">Branch name</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Date and time</th>
              <th className="py-3 px-4 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, idx) => (
              <tr key={idx} className={`rounded-[10px] ${idx % 2 === 0 ? 'bg-white' : 'bg-gray3'} `}>
                <td className="py-3 px-4 font-medium text-[16px]">{item.name}</td>
                <td className="py-3 px-4 font-medium text-[16px]">{item.title}</td>
                <td className="py-3 px-4 font-medium text-[16px]">{item.DateAndTime}</td>
                <td className="py-3 px-4 flex items-center justify-center gap-4">
                  <div className="cursor-pointer"><img src={editIcon2} alt="edit"  /></div>
                  <div className="cursor-pointer"><img src={deleteIcon2} alt="delete"  /></div>
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
