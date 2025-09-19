import React, { useEffect, useState } from 'react'
import { Colors } from '../../../../Theme'
import { Flex } from '../../../../components/Flex'
import {FlexCenter} from "../../../../components/FlexCenter"
import styled from '@emotion/styled';
import { FlexSpaceBetween } from '../../../../components/FlexSpaceBetween';
import { SmallContainer } from '../../../../components/SmallContainer';
import { SubmitButton } from '../../../../components/SubmitButton';
import health from "../../../../assets/icons/health.svg"
import { Box } from '@mui/material';
import QuestionnaireSettings from './QuestionnaireSettings';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionnaire, setCurrentQuestioneir, setCurrentQuestioneirID, setNewQuestioneir } from '../../../../store/slices/questionierSlice';
import { storeQrCodeQuestionnaire } from '../../../../store/slices/QrCode';
import { getBranches } from '../../../../store/slices/branchSlice';
import { use } from 'i18next';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const MainContent = styled(FlexSpaceBetween)(({ theme }) => ({
  [theme.breakpoints.down('800')]: {
    flexDirection : "column-reverse" ,
    gap : "20px" ,
  },
}));

const CreateQuestionnaire = styled("div")(({ theme }) => ({
  display : "flex" ,
  alignItems : "center" ,
  justifyContent : "center" ,
  width : '100%'
}));
const PreviousQuestionnaires = styled(Flex)(({ theme }) => ({
  flexDirection : "column" , 
  width : "425px" , 
  maxHeight : "500px" ,
  overflowY : "auto" , 
  borderRadius : "10px" ,
  backgroundColor : "#fff" , 
  [theme.breakpoints.down('800')]: {
    width : "96%" ,
    height : "200px" , 
    margin : "0 auto" ,
  },
  overflowX : "hidden" , 

}));
const PreviousQuestionnaire = styled(FlexSpaceBetween)(({ theme }) => ({
  borderRadius : "10px" ,
  padding : "10px" ,
  width : "96%" ,
  alignItems : "center" ,
  marginBottom : "10px" ,
  backgroundColor : Colors.bg  ,
  margin : "5px auto" ,
  cursor:'pointer',
  transition : "all 0.3s ease-in-out" , 
  
  "&:hover":{
    background:Colors.input , 
  } ,
  "&.active":{
    background:Colors.input , 
  } ,
  
}));
const QuestionnaireName = styled("div")(({ theme }) => ({
  fontSize : "20px" ,
}));
const QuestionnaireLengthDiv = styled(FlexSpaceBetween)(({ theme }) => ({
  backgroundColor : Colors.lightMain ,
  width : "75px" , 
  height : "40px" ,
  borderRadius : "10px" ,
  padding: "0 10px" ,
  alignItems : "center" , 
}));

const SpanQ = styled("span")(({ theme }) => ({
  fontSize : "32px" , 
  color : Colors.main
  
}));

const SpanNum = styled("span")(({ theme }) => ({
  fontSize : "20px"
}));


const Divider = styled("div")(({ theme }) => ({
  width : "100%" ,
  height : "1px" ,
  backgroundColor : Colors.grayDC ,
  margin : "10px 0"
}));

const NewQuestionnaire = styled(SubmitButton)(({ theme }) => ({
  padding : "20px", 
  margin : "10px  auto" , 
  textAlign : "center" ,
  fontSize : "18px" ,
}));


const QrCodeQuestionnaires = () => {
  const [pressCreateQuestionnaire , setPressCreateQuestionnaire] = useState(false)
  const [ isAddNew , setIsAddNew ] = useState(true)
  const [selectedBranch, setSelectedBranch] = useState('')
  const [branches, setBranches] = useState([])
  const [count, setCount] = useState('')
  const [change, setChange] = useState(false)

  const dispatch = useDispatch() ;
  const navigate = useNavigate(); 

  // Get branches data
  const getBranchesData = useSelector(state => state.branchData.getBranchesData);
  const getBranchesDataLoading = useSelector(state => state.branchData.getBranchesDataLoading);

  // Get QR code questionnaire store data
  const qrCodeQuestionnaireStoreData = useSelector(state => state.qrCodeData.qrCodeQuestionnaireStoreData);
  const qrCodeQuestionnaireStoreLoading = useSelector(state => state.qrCodeData.qrCodeQuestionnaireStoreLoading);

  const handleStoreQrCodeQuestionnaire = () => {
    if (!selectedBranch) {
      Swal.fire('Error', t("text.Please_select_a_branch"), 'error');
      return;
    }

    if (!count || count <= 0) {
      Swal.fire('Error', t("text.Please_enter_a_valid_count"), 'error');
      return;
    }

    const currentQuestionnaire = questionieres[currentQuestioneir];
    if (!currentQuestionnaire || !currentQuestionnaire.title) {
      Swal.fire(t("text.Error"), t("text.Please_enter_a_questionnaire_title"), 'error');
      return;
    }

    const data = {
      name: currentQuestionnaire.title,
      branch_id: selectedBranch,
      count: parseInt(count),
      questions: currentQuestionnaire.steps
    };

    dispatch(storeQrCodeQuestionnaire(data));
    setChange(true)
  }

  const questionieres = useSelector((state) => state.questioneirData.questionieres);
  const currentQuestioneir = useSelector((state) => state.questioneirData.currentQuestioneir);
  
  const numberOFQuestioners = (item)=>{ 
    let count = 0 ;
    item.steps.map((step)=>{
      count += step.questions.length
    })
    return count
  }
  
  useEffect(() => {
    dispatch(setNewQuestioneir())
    dispatch(getBranches())
  }, [])

  useEffect(() => {
    if (getBranchesData?.status) {
      setBranches(getBranchesData?.data?.branches || []);
      if (getBranchesData?.data?.branches?.length > 0 && !selectedBranch) {
        setSelectedBranch(getBranchesData?.data?.branches[0]?.id);
      }
    }
  }, [getBranchesData])

  useEffect(() => {
    debugger;
    console.log("qrCodeQuestionnaireStoreData" , qrCodeQuestionnaireStoreData)
    if (change){

      if (qrCodeQuestionnaireStoreData?.message==200) {
        Swal.fire('Success',  t("text.QR_Code_Questionnaire_saved_successfully"), 'success')
        .then((result) => {
          if (result.isConfirmed) {
            navigate("/userDashboard/qr-codes")
          }
        });
      }
      else if (qrCodeQuestionnaireStoreData?.status==false) {
        Swal.fire({
          icon: 'error',
          text: qrCodeQuestionnaireStoreData.message
        })
      }
              else {
          Swal.fire('Error', t("text.please_add_at_least_a_step_to_the_qr_code"), 'error');
        }
    }
  }, [qrCodeQuestionnaireStoreData])





  const [active , setActive] = useState(0)
  const {t} = useTranslation() ; 
  return (
    <>
      <SmallContainer >
        {/* <div style = {{color : Colors.gray_l , marginBottom : "20px"}}>{t("text.questionnaires")} </div> */}
        <div className="flex items-center gap-2 mb-4">
          <div className="font-normal text-[14px] leading-[14px] tracking-[0.28px] text-gray_l">
            {" "}
            {t("text.Qr_Codes")} /
          </div>
          <div className="font-normal text-[14px] leading-[14px] tracking-[0.28px] text-main">
            {" "}
            {t("text.New_Qr_Code")}
          </div>
        </div>

        {/* Branch and Count Selection */}
        <div className="mb-4 flex gap-4">
          {/* Branch Selection */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("text.Select_Branch")}
            </label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={getBranchesDataLoading}
            >
              <option value="">{t("text.Select_a_branch")}</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>

          {/* Count Input */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("text.Count")}
            </label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              placeholder={t("text.Enter_count")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
            />
          </div>
        </div>

        <MainContent>
          {pressCreateQuestionnaire == true 
            ? 
            <div>
          
            </div>
            :
            <QuestionnaireSettings 
              isAddNew={isAddNew}
              onStoreQrCodeQuestionnaire={handleStoreQrCodeQuestionnaire}
              qrCodeQuestionnaireStoreLoading={qrCodeQuestionnaireStoreLoading}
            />           
          
          }

           {/* doesn't need it  */}
            {/* <PreviousQuestionnaires style = {{padding : "10px"}}>
              <CreateQuestionnaire>
                <Box style = {{width : "100%"}}>
                  <NewQuestionnaire  onClick = {()=>{handleAddNewQuestionnaire()}}>{t("text.Create_New_Questionnaire")} </NewQuestionnaire>
                </Box>
              </CreateQuestionnaire>
              <Divider/>
              <FlexCenter style = {{fontSize : "20px"}}>{t("text.Saved_Questioners")}</FlexCenter>
              <Divider/>
              {
                questionieres?.map((item , index)=>{
                return (
                  !item.isAdmin ? 
                  
                  <>
                    <PreviousQuestionnaire className = {active == index ? "active" : ""}
                    onClick={()=> {handleQuestionierChange(item.id ,index)  ; setActive(index) }} >

                      <QuestionnaireName>{item.title}</QuestionnaireName>
                      <QuestionnaireLengthDiv>
                        <SpanQ>Q</SpanQ>
                        <SpanNum>
                          {numberOFQuestioners(item)}
                        </SpanNum>
                      </QuestionnaireLengthDiv>
                    </PreviousQuestionnaire>

                  </>
                  
                  :''
                )
                })
              
              }

              <Divider/>
              <FlexCenter style = {{fontSize : "20px"}}>{t("text.Saved_admin_Questioners")}</FlexCenter>
              <Divider/>
              {
                questionieres?.map((item , index)=>{
                return (
                  item.isAdmin ?
                  <>
                    <PreviousQuestionnaire className = {active == index ? "active" : ""}
                    onClick={()=> {handleQuestionierChange(item.id ,index)  ; setActive(index) }} >

                      <QuestionnaireName>{item.title}</QuestionnaireName>
                      <QuestionnaireLengthDiv>
                        <SpanQ>Q</SpanQ>
                        <SpanNum>
                          {numberOFQuestioners(item)}
                        </SpanNum>
                      </QuestionnaireLengthDiv>
                    </PreviousQuestionnaire>

                  </>
                  :''
                )
                })
              
              }

              
            </PreviousQuestionnaires> */}
        </MainContent>
      </SmallContainer>
    </>
  )
}

export default QrCodeQuestionnaires