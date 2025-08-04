import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { getBranches } from '../../../store/slices/branchSlice'
import { getQrCodeBranchResponses } from '../../../store/slices/QrCode'
import CustomSelect from '../../../components/CustomSelect'
import { useTranslation } from 'react-i18next'
import viewIcon from '../../../assets/icons/ShowIcon.svg'
import Loading from '../../../components/Loading'
import { Colors } from '../../../Theme'

const ITEMS_PER_PAGE = 5

const Responses = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedBranch, setSelectedBranch] = useState('')
  const [branches, setBranches] = useState([])
  const [responses, setResponses] = useState([])

  // Redux selectors
  const getBranchesData = useSelector(state => state.branchData.getBranchesData)
  const getBranchesDataLoading = useSelector(state => state.branchData.getBranchesDataLoading)
  const qrCodeBranchResponsesData = useSelector(state => state.qrCodeData.qrCodeBranchResponsesData)
  const qrCodeBranchResponsesLoading = useSelector(state => state.qrCodeData.qrCodeBranchResponsesLoading)

  // Fetch branches on component mount
  useEffect(() => {
    dispatch(getBranches())
  }, [dispatch])

  // Transform branches data when loaded
  useEffect(() => {
    if (getBranchesData?.status) {
      const transformedBranches = getBranchesData?.data?.branches?.map(branch => ({
        value: branch.id,
        label: branch.name
      })) || []
      setBranches(transformedBranches)
    }
  }, [getBranchesData])

  // Fetch responses when branch selection changes
  useEffect(() => {
    if (selectedBranch) {
      dispatch(getQrCodeBranchResponses(selectedBranch))
    } else {
      dispatch(getQrCodeBranchResponses()) // Get all responses
    }
  }, [selectedBranch, dispatch])

  // Transform responses data when loaded
  useEffect(() => {
    if (qrCodeBranchResponsesData?.status) {
      setResponses(qrCodeBranchResponsesData?.data?.responces || [])
    }
  }, [qrCodeBranchResponsesData])

  // Reset function to clear branch selection
  const handleReset = () => {
    setSelectedBranch('')
  }

  const pageCount = Math.ceil(responses.length / ITEMS_PER_PAGE)
  const handlePageClick = (data) => {
    setCurrentPage(data.selected)
  }

  const offset = currentPage * ITEMS_PER_PAGE
  const currentItems = responses.slice(offset, offset + ITEMS_PER_PAGE)

  return (
    <div className="bg-[#f5f7fa] rounded-xl p-5 w-full">
      {/* Branch Selection */}
      <div className="mb-6 flex items-center gap-4">
        <div className="min-w-[220px]">
          <CustomSelect
            options={branches}
            value={selectedBranch}
            onChange={setSelectedBranch}
            multiple={false}
            placeholder={t("text.Select_branch")}
          />
        </div>
      </div>

      {/* Loading State */}
      {(getBranchesDataLoading || qrCodeBranchResponsesLoading) && (
        <Loading />
      )}

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl p-4">
        <table className="min-w-full">
          <thead>
            <tr className="text-[#7D8592] text-[16px] font-medium">
              <th className="py-3 px-4">Id</th>
              <th className="py-3 px-4">QR Code Name</th>
              <th className="py-3 px-4">Branch Name</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Percentage Score</th>
              {/* <th className="py-3 px-4 text-center"></th> */}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, idx) => (
              <tr key={idx} className={`rounded-[10px] ${idx % 2 === 0 ? 'bg-white' : 'bg-gray3'} `}>
                <td className="py-3 px-4 font-medium text-[16px]">{item.id}</td>
                <td className="py-3 px-4 font-medium text-[16px]">{item.name}</td>
                <td className="py-3 px-4 font-medium text-[16px]">{item.branch_name}</td>
                <td className="py-3 px-4 font-medium text-[16px]">1-8-2025</td>
                <td className="py-3 px-4 font-medium text-[16px]">{item.percentage_score}</td>
                {/* <td className="py-3 px-4 flex items-center justify-center gap-4">
                  <div className="cursor-pointer"><img src={viewIcon} alt="view"  /></div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {responses.length > 0 && (
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
            pageClassName={"rounded-full bg-white w-8 h-8 text-[#222] cursor-pointer flex items-center justify-center"}
            activeClassName={"text-white"}
            activeLinkClassName={`rounded-full  w-full h-full bg-main text-white flex items-center justify-center`}
            previousClassName={"rounded-full bg-white px-3 py-1 text-[#222] cursor-pointer"}
            nextClassName={"rounded-full bg-white px-3 py-1 text-[#222] cursor-pointer"}
            breakClassName={"px-2"}
            forcePage={currentPage}
            activeLinkStyle={{ backgroundColor: Colors.main }}
          />
        </div>
      )}
    </div>
  )
}

export default Responses
