import React from "react";
import { useTranslation } from 'react-i18next';
import DateRangePickerComponent from "../../components/DateRangePickerComponent";
import PrintIcon from '../../assets/icons/PrintIcon.svg';
import CustomSelect from '../../components/CustomSelect';

const ReportHeader = ({ selected, onSelect, branches, qrCodes, selectedBranch, setSelectedBranch, selectedBranches, setSelectedBranches, selectedQRCodes, setSelectedQRCodes, dateRange, setDateRange }) => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-between items-center w-full mb-4">
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
        <div
          className={`flex justify-center items-center cursor-pointer px-8 py-4 rounded-[10px] text-[16px] font-medium leading-[21.28px] tracking-[0.02em] ${
            selected === "qr" ? "bg-main text-[#fff] " : "bg-white text-black5"
          }`}
          onClick={() => onSelect("qr")}
        >
          {t("text.QR_codes")}
        </div>
      </div>
      <div className="flex justify-center items-center gap-2">
        <div className="min-w-[220px]">
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
              value={selectedQRCodes}
              onChange={setSelectedQRCodes}
              multiple={true}
              placeholder={t("text.Select_QR_codes")}
            />
          )}
        </div>
        <DateRangePickerComponent onDateChange={setDateRange} />
        <div className='bg-main p-[8px] rounded-[5px] cursor-pointer flex items-center justify-center '> 
          <img src={PrintIcon} alt=""  />
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;
