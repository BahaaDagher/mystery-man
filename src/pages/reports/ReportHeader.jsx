import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import DateRangePickerComponent from "../../components/DateRangePickerComponent";
import PrintIcon from '../../assets/icons/PrintIcon.svg';
import CustomSelect from '../../components/CustomSelect';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ReportHeader = ({ selected, onSelect, branches, qrCodes, selectedBranch, setSelectedBranch, selectedBranches, setSelectedBranches, selectedQRCode, setSelectedQRCode, dateRange, setDateRange, onPrint }) => {
  const { t } = useTranslation();
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState('');

  const handlePrintClick = (event) => {
    setShowNoteModal(true);
  };

  const handlePrintWithNote = () => {
    setShowNoteModal(false);
    // Pass the note as HTML content
    onPrint(noteText);
    setNoteText(''); // Reset note
  };

  const handleCancelPrint = () => {
    setShowNoteModal(false);
    setNoteText('');
  };

  // Close modal when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNoteModal && !event.target.closest('.note-modal')) {
        handleCancelPrint();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNoteModal]);
  return (
    <div className="flex justify-between items-center w-full mb-4 flex-col gap-2 md:flex-row md:gap-0 ">
      <div className="flex gap-4 ">
        <div
          className={`flex justify-center items-center cursor-pointer px-8 py-4 rounded-[10px] text-[16px] font-medium leading-[21.28px] tracking-[0.02em] ${
            selected === "one" ? "bg-main text-[#fff] " : "bg-white text-black5"
          }`}
          onClick={() => onSelect("one")}
        >
          {t("text.One_Branch")}
        </div>
        <div
          className={`flex justify-center items-center cursor-pointer px-8 py-4 rounded-[10px] text-[16px] font-medium leading-[21.28px] tracking-[0.02em] ${
            selected === "more"
              ? "bg-main text-[#fff] "
              : "bg-white text-black5"
          }`}
          onClick={() => onSelect("more")}
        >
          {t("text.More_than_Branch")}
        </div>
        {/* <div
          className={`flex justify-center items-center cursor-pointer px-8 py-4 rounded-[10px] text-[16px] font-medium leading-[21.28px] tracking-[0.02em] ${
            selected === "qr" ? "bg-main text-[#fff] " : "bg-white text-black5"
          }`}
          onClick={() => onSelect("qr")}
        >
          {t("text.QR_codes")}
        </div> */}
      </div>
      <div className="flex justify-center items-center gap-2">
        <div className=" lg:min-w-[220px]">
          {selected === 'one' && (
            <CustomSelect
              options={branches}
              value={selectedBranch}
              onChange={setSelectedBranch}
              multiple={false}
              placeholder={t("text.Select_branch")}
            />
          )}
          {selected === 'more' && (
            <CustomSelect
              options={branches}
              value={selectedBranches}
              onChange={setSelectedBranches}
              multiple={true}
              placeholder={t("text.Select_branches")}
            />
          )}
          {selected === 'qr' && (
            <CustomSelect
              options={qrCodes}
              value={selectedQRCode}
              onChange={setSelectedQRCode}
              multiple={false}
              placeholder={t("text.Select_QR_codes")}
            />
          )}
        </div>
        <DateRangePickerComponent onDateChange={setDateRange} />
        <div 
          className='bg-main p-[8px] rounded-[5px] cursor-pointer flex items-center justify-center hover:opacity-80 transition-opacity' 
          onClick={handlePrintClick}
        > 
          <img src={PrintIcon} alt=""  />
        </div>
      </div>

      {/* Note Modal */}
      {showNoteModal && (
        <>
          {/* Backdrop */}
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999,
            }}
            onClick={handleCancelPrint}
          />
          
          {/* Modal */}
          <div 
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#fff',
              border: 'none',
              borderRadius: '16px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
              zIndex: 1000,
              width: '90%',
              maxWidth: '500px',
              padding: '30px'
            }}
            className="note-modal"
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {t("text.Add_Note_Before_Print")}
              </h3>
              <ReactQuill
                value={noteText}
                onChange={setNoteText}
                placeholder={t("text.Enter_note_optional")}
                className="w-full"
                style={{ height: '120px' }}
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'color': [] }], // Add color picker
                    ['clean']
                  ]
                }}
                formats={[
                  'header',
                  'bold', 'italic', 'underline', 'strike',
                  'list', 'bullet',
                  'color' // Add color format
                ]}
              />
              <div style={{ marginTop: '150px' }}></div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancelPrint}
                className="border-0 px-6 py-3 bg-gray text-white rounded-lg  transition-colors font-medium"
              >
                {t("text.Cancel")}
              </button>
              <button
                onClick={handlePrintWithNote}
                className="border-0 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
              >
                <img src={PrintIcon} alt="" className="w-4 h-4" />
                {t("text.Print_with_Note")}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportHeader;
