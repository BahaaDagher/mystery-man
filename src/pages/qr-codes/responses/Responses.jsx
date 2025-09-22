import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { getBranches } from '../../../store/slices/branchSlice'
import { getQrCodeBranchResponses, getResponseDetails } from '../../../store/slices/QrCode'
import CustomSelect from '../../../components/CustomSelect'
import { useTranslation } from 'react-i18next'
import viewIcon from '../../../assets/icons/ShowIcon.svg'
import excel from '../../../assets/icons/excel.svg'
import Loading from '../../../components/Loading'
import { Colors } from '../../../Theme'
import QuestionsModal from './QuestionsModal'
import DateRangePickerComponent from '../../../components/DateRangePickerComponent'
import { format, startOfMonth } from 'date-fns'
import * as XLSX from 'xlsx'

const ITEMS_PER_PAGE = 5

const Responses = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedBranch, setSelectedBranch] = useState('')
  const [branches, setBranches] = useState([])
  const [responses, setResponses] = useState([])
  const [showQuestionsModal, setShowQuestionsModal] = useState(false)
  const [selectedResponseData, setSelectedResponseData] = useState(null)
  const [dateRange, setDateRange] = useState({
      startDate: startOfMonth(new Date()),
        endDate: new Date(),
  });

  useEffect(()=>{
    console.log("dateRange::::" , dateRange)
  }, dateRange)

  // Redux selectors
  const getBranchesData = useSelector(state => state.branchData.getBranchesData)
  const getBranchesDataLoading = useSelector(state => state.branchData.getBranchesDataLoading)
  const qrCodeBranchResponsesData = useSelector(state => state.qrCodeData.qrCodeBranchResponsesData)
  const qrCodeBranchResponsesLoading = useSelector(state => state.qrCodeData.qrCodeBranchResponsesLoading)
  const responseDetailsData = useSelector(state => state.qrCodeData.responseDetailsData)
  const responseDetailsLoading = useSelector(state => state.qrCodeData.responseDetailsLoading)

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

  // Fetch responses when branch selection or date range changes
  useEffect(() => {
    const values = {};
    
    // Always include dates if available
    if (dateRange.startDate) {
      values.from_date = format(dateRange.startDate, 'yyyy-MM-dd') // Format as YYYY-MM-DD
    }
    if (dateRange.endDate) {
      values.to_date = format(dateRange.endDate, 'yyyy-MM-dd') // Format as YYYY-MM-DD
    }
    
    // Include branch if selected
    if (selectedBranch) {
      values.branch_id = selectedBranch;
    }
    
    // Always call the API with available parameters
    dispatch(getQrCodeBranchResponses(values));
  }, [selectedBranch, dateRange, dispatch]);

  // Transform responses data when loaded
  useEffect(() => {
    if (qrCodeBranchResponsesData?.status) {
      setResponses(qrCodeBranchResponsesData?.data?.responces || [])
    }
  }, [qrCodeBranchResponsesData])

  // Set response details data when loaded
  useEffect(() => {
    if (responseDetailsData?.status) {
      setSelectedResponseData(responseDetailsData?.data?.responses)
    }
  }, [responseDetailsData])

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

  // Handle view questions click
  const handleViewQuestions = (item) => {
    dispatch(getResponseDetails(item.id))
    setShowQuestionsModal(true)
  }

  // Handle close modal
  const handleCloseModal = () => {
    setShowQuestionsModal(false)
    setSelectedResponseData(null)
  }

  // Helper function to get selected choice title for SingleChoice and multiChoice questions
  const getChoiceTitle = (question, answerId) => {
    if (!question.choices || question.choices.length === 0) return answerId;
    
    if (question.type === 'SingleChoice') {
      const choice = question.choices.find(choice => choice.id.toString() === answerId);
      return choice ? choice.title : answerId;
    } else if (question.type === 'multiChoice') {
      const answerIds = answerId.split(',');
      const selectedChoices = answerIds.map(id => {
        const choice = question.choices.find(choice => choice.id.toString() === id);
        return choice ? choice.title : id;
      });
      return selectedChoices.join(', ');
    }
    
    return answerId;
  };

  // Helper function to format answer based on question type
  const formatAnswer = (question) => {
    if (!question.answer) return '';
    
    switch (question.type) {
      case 'SingleChoice':
      case 'multiChoice':
        return getChoiceTitle(question, question.answer);
      case 'yesOrNo':
        return question.answer === 'yes' ? t('text.yes') || 'Yes' : question.answer === 'no' ? t('text.no') || 'No' : question.answer;
      case 'rating':
        return `${question.answer}/5`;
      case 'uploadImages':
        return question.choices && question.choices.length > 0 ? `${question.choices.length} image(s)` : 'No images';
      case 'open':
      case 'headLine':
      default:
        return question.answer;
    }
  };

  // Helper function to format question title and answer for display in cell
  const formatQuestionAndAnswer = (question) => {
    const answer = formatAnswer(question);
    return `• ${question.title}: ${answer}`;
  };

  // Helper function to get the maximum number of questions in any single response
  const getMaxQuestionsCount = () => {
    let maxQuestions = 0;
    
    currentItems.forEach(item => {
      if (item.questions && item.questions.steps) {
        let questionCount = 0;
        item.questions.steps.forEach(step => {
          if (step.questions) {
            questionCount += step.questions.length;
          }
        });
        maxQuestions = Math.max(maxQuestions, questionCount);
      }
    });
    
    return maxQuestions;
  };

  // Helper function to get all questions from a single response in order
  const getQuestionsFromResponse = (item) => {
    const questions = [];
    
    if (item.questions && item.questions.steps) {
      item.questions.steps.forEach(step => {
        if (step.questions) {
          step.questions.forEach(question => {
            questions.push({
              stepName: step.name,
              question: question
            });
          });
        }
      });
    }
    
    return questions;
  };

  // Handle Excel export
  const handleExportExcel = () => {
    // Get the maximum number of questions to create column headers
    const maxQuestions = getMaxQuestionsCount();
    
    // Prepare data for Excel export
    debugger;
    const exportData = currentItems.map((item, index) => {
      // Start with basic information
      const rowData = {
        '#': offset + index + 1,
        [t('text.qr_code_name')]: item.qr_code_name,
        [t('text.branch_name')]: item.branch_name,
        [t('text.date')]: item.date,
        [t('text.percentage_score')]: `${item.percentage_score}%`
      };

      // Get all questions from this response in order
      const responseQuestions = getQuestionsFromResponse(item);
      
      // Add each question to its corresponding column (السؤال 1, السؤال 2, etc.)
      for (let i = 0; i < maxQuestions; i++) {
        const columnHeader = `${t('text.question') || 'السؤال'} ${i + 1}`;
        
        if (i < responseQuestions.length) {
          const questionData = responseQuestions[i];
          rowData[columnHeader] = formatQuestionAndAnswer(questionData.question);
        } else {
          rowData[columnHeader] = ''; // Empty cell if this response has fewer questions
        }
      }

      return rowData;
    });
    
    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);
    
    // Set column widths for better readability
    const colWidths = [
      { wch: 5 },   // #
      { wch: 20 },  // QR Code Name
      { wch: 20 },  // Branch Name
      { wch: 20 },  // Date
      { wch: 15 },  // Percentage Score
    ];
    
    // Add width for question columns
    for (let i = 0; i < maxQuestions; i++) {
      colWidths.push({ wch: 40 }); // Width for each question column
    }
    
    ws['!cols'] = colWidths;
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, t('text.QR_Responses'));
    
    // Generate filename with current date
    const currentDate = format(new Date(), 'yyyy-MM-dd');
    const filename = `QR_Responses_${currentDate}.xlsx`;
    
    // Save file
    XLSX.writeFile(wb, filename);
  };

  return (
    <div className="bg-[#f5f7fa] rounded-xl p-5 w-full">
      {/* Branch Selection and Export */}
      <div className="mb-6 flex items-center gap-4 justify-between">
          <div className="min-w-[220px]">
            <CustomSelect
              options={branches}
              value={selectedBranch}
              onChange={setSelectedBranch}
              multiple={false}
              placeholder={t("text.Select_branch")}
            />
          </div>
          <div className='min-w-[220px] flex gap-2 items-center '>
            <DateRangePickerComponent onDateChange={setDateRange}/>
            <div className='cursor-pointer bg-gold p-[10px] text-white rounded' onClick={handleExportExcel}>
              {t("text.Download")}
            </div>
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
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">{t('text.qr_code_name')}</th>
              <th className="py-3 px-4">{t('text.branch_name')}</th>
              <th className="py-3 px-4">{t('text.date')}</th>
              <th className="py-3 px-4">{t('text.percentage_score')}</th>
              <th className="py-3 px-4 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, idx) => (
              <tr key={idx} className={`rounded-[10px] ${idx % 2 === 0 ? 'bg-white' : 'bg-gray3'} `}>
                <td className="py-3 px-4 font-medium text-[16px]">{offset + idx + 1}</td>
                <td className="py-3 px-4 font-medium text-[16px]">{item.qr_code_name}</td>
                <td className="py-3 px-4 font-medium text-[16px]">{item.branch_name}</td>
                <td className="py-3 px-4 font-medium text-[16px]">{item.date}</td>
                <td className="py-3 px-4 font-medium text-[16px]">{item.percentage_score}%</td>
                <td className="py-3 px-4 flex items-center justify-center gap-4">
                  <div className="cursor-pointer" onClick={() => handleViewQuestions(item)}>
                    <img src={viewIcon} alt="view" />
                  </div>
                </td>
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
            pageClassName={"rounded-full bg-white w-8 h-8 text-[#222] cursor-pointer flex items-center justify-center hover:bg-gray-100"}
            activeClassName={"text-white"}
            activeLinkClassName={`rounded-full w-full h-full bg-main text-white flex items-center justify-center`}
            previousClassName={"rounded-full bg-white px-3 py-1 text-[#222] cursor-pointer hover:bg-gray-100"}
            nextClassName={"rounded-full bg-white px-3 py-1 text-[#222] cursor-pointer hover:bg-gray-100"}
            breakClassName={"px-2"}
            forcePage={currentPage}
            activeLinkStyle={{ backgroundColor: Colors.main }}
            pageLinkClassName={"w-full h-full flex items-center justify-center"}
            previousLinkClassName={"w-full h-full flex items-center justify-center"}
            nextLinkClassName={"w-full h-full flex items-center justify-center"}
          />
        </div>
      )}

      {/* Questions Modal */}
      <QuestionsModal
        isOpen={showQuestionsModal}
        onClose={handleCloseModal}
        responseData={selectedResponseData}
        loading={responseDetailsLoading}
      />
    </div>
  )
}

export default Responses
