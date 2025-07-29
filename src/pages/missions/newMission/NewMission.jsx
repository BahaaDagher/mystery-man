import React, { useEffect, useState } from 'react'
import { SmallContainer } from '../../../components/SmallContainer'
import { SubmitButton } from '../../../components/SubmitButton'
import styled from '@emotion/styled';
import { Colors } from '../../../Theme';
import { useDispatch, useSelector } from 'react-redux';
import { getBranches } from '../../../store/slices/branchSlice';
import { MenuItem, Select } from '@mui/material';
import { use } from 'i18next';
import { FlexCenter } from '../../../components/FlexCenter';
import { FlexSpaceBetween } from '../../../components/FlexSpaceBetween';
import FinishedData from './FinishedData';
import { getQuestionnaire, setCurrentQuestioneir, setCurrentQuestioneirID } from '../../../store/slices/questionierSlice';
import QuestionnaireData from './QuestionnaireData';
import Quiz from './Quiz';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

const Container = styled(SmallContainer)(({ theme }) => ({
  
}));
const Parent = styled(SmallContainer)(({ theme }) => ({
  display : "flex" , 
  padding : "0" ,
  justifyContent : "space-between" , 
  [theme.breakpoints.down('850')]: {
    flexDirection : "column-reverse" ,
    alignItems : "flex-start" ,

  }
}));
const Place = styled("div")(({ theme }) => ({
  marginBottom : "10px" ,
  display : "flex" ,
}));
const MainData = styled("div")(({ theme }) => ({
  width : "70%" ,
  padding : "15px" , 
  borderRadius: "10px",
  backgroundColor: "#fff",
  margin : theme.direction == "ltr" ? "0 10px 0 0" : "0 0 0 10px" ,
  [theme.breakpoints.down('850')]: {
    width : "100%" ,

  }
}));
const TitleDiv = styled("div")(({ theme }) => ({
}));
const Title = styled("div")(({ theme }) => ({
  fontSize: "18px",
  marginBottom: "5px",
}));
const Input = styled("input")(({ theme }) => ({
  width : "100%" , 
  height: '68px', 
  padding: '15px',
  borderRadius: '10px',
  border: `1px solid ${Colors.input}`,
  outline: 'none', 
  fontSize : "16px",
  "&.small" : {
    width : "425px" , 
    maxWidth:'100%', 
    height: '48px', 
  }, 
  "&.notes" : {
    width : "100%" , 
    height : "124px"
  }
  
}));
const Divider = styled("div")(({ theme }) => ({
  height: "1px",
  backgroundColor: Colors.input,
  margin: "20px 0",
  width : "100%"
}));
const Selectt = styled(Select)(({ theme }) => ({
  width : "425px" , 
  height: '48px', 
  maxWidth:'100%', 
  outline: 'none',
  border: `1px solid ${Colors.input}`,
  borderRadius: '10px',
  "&:hover" : {
    border: `1px solid ${Colors.input}`,
  },
  fontFamily : "Cairo" ,
}));
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
   
  direction : theme.direction
}));

const DateInput = styled("input")(({ theme }) => ({
  width: '100%',
  height: '48px',
  padding: '15px',
  borderRadius: '10px',
  border: `1px solid ${Colors.input}`, 
  color : Colors.input,
  fontSize: '16px',
  [theme.breakpoints.down('500')]: {
    width: '100%',
  }
}));
const TimeInput = styled("input")(({ theme }) => ({
  width: '148px',
  height: '48px',
  top: '454px',
  padding: '15px',
  borderRadius: '10px',
  border: `1px solid ${Colors.input}`, 
  color : Colors.input,
  gap: '8px',
  fontSize: '16px',
}));

const DateTime = styled("div")(({ theme }) => ({
  display : "flex" , 
  justifyContent : "space-between" , 
  alignItems : "center" ,     
  [theme.breakpoints.down('600')]: {
    flexDirection : "column" ,
    alignItems : "flex-start" ,
  } 
  
}));
const DateDiv = styled("div")(({ theme }) => ({
  width: "425px" , 
  height: "80px" ,
  borderRadius: "10px" , 
  border: "1px" ,
  [theme.breakpoints.down('900')]: {
    width: "50%" , 
  }, 
  [theme.breakpoints.down('500')]: {
    width: '100%',
  }
}));

const TimeDiv = styled("div")(({ theme }) => ({
  display : "flex" , 
  [theme.breakpoints.down('500')]: {
    flexDirection : "column" , 
    alignItems : "flex-start" ,
  }
}));
const FromToTimeDiv = styled("div")(({ theme }) => ({
  margin : "0 20px" ,
  [theme.breakpoints.down('600')]: {
    margin : theme.direction == "ltr" ? "0 20px 0 0" : "0 0  0 20px" ,
  }
}));
// voucher 
const VoucherDiv = styled("div")(({ theme }) => ({
  display : "flex" , 
  [theme.breakpoints.down('500')]: {
    flexDirection : "column" , 
    alignItems : "flex-start" ,
  }
}));
const CheckDiv = styled("div")(({ theme }) => ({
  display : "flex" , 
  alignItems : "center" , 
  justifyContent : "center" ,
  margin : theme.direction == "ltr" ? "0 20px 0 0" : "0 0  0 20px" ,
  [theme.breakpoints.down('500')]: {
    margin : "0 0 15px 0" ,
  }
}));
const CheckInput = styled("input")(({ theme }) => ({
  width : "18px" , 
  height : "18px" ,
  accentColor: Colors.main , 
  margin : theme.direction == "ltr" ? "0 20px 0 0" : "0 0  0 20px" ,
}));
const CheckLabel = styled("label")(({ theme }) => ({

}));
const VoucherInput = styled("input")(({ theme }) => ({
  width: '85px',
  height: '44px',
  padding: '10px 15px',
  borderRadius: '10px',
  border: `1px solid ${Colors.input}`,
  fontSize: '16px',
  outline: 'none',
}));
// notes 
const NotesText = styled("textarea")(({ theme }) => ({
  height : "124px" , 
  padding: '10px',
  resize: 'none',
  width: '100%',
  borderRadius: '10px',
  border: `1px solid ${Colors.input}`,
  fontSize : "16px",
  outline: 'none', 
}));

// submit button
const SubmitButton2 = styled(SubmitButton)(({ theme }) => ({
  width: '170px',
}));

const NewMission = () => {
  //title
  const [title , setTitle] = useState('');
  // focus 
  const [focus , setFocus] = useState('');
  
  // branches 
  const [currentBranches , setCurrentBranches] = useState ([])
  const getBranchesData = useSelector(state => state.branchData.getBranchesData) ;
  useEffect(()=>{
    
    if (getBranchesData.status) {
      setCurrentBranches(getBranchesData.data.branches)
    }
  },[getBranchesData])
  const dispatch = useDispatch() ;

  useEffect(() => {
    dispatch(getBranches())
    dispatch(getQuestionnaire())
  }, [])

  const [selectedBranch, setSelectedBranch] = useState('');
  const handleSelectedBranch = (event) => {
    setSelectedBranch(event.target.value);
  };
  // date and time 
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const [date, setDate] = useState('');
  const [time1, setTime1] = useState('');

  // voucher 
  const [voucherChecked ,  setVoucherChecked] = useState(false);
  const [voucherValue ,  setVoucherValue] = useState('');

  // questionnaires

  const questionieres = useSelector(state => state.questioneirData.questionieres) ;
  const [selectedQuestioniere , setSelectedQuestioniere] = useState(-1);

  const CurrentQuestioneir = useSelector(state => state.questioneirData.CurrentQuestioneir) ;

  const handleSelectedQuestionnaire = (event) => {
    setSelectedQuestioniere(event.target.value);
    dispatch(setCurrentQuestioneir(event.target.value))
  };


  // notes 
  const [notes ,  setNotes] = useState('');

  const {t} = useTranslation() ; 

  
  
  const removeSpaces = (str) => {
    let i = 0 ; 
    while (str[i]==' ') {
      str = str.replace(' ' , '')
      i++ ; 
    }
    return str ;
  }
  const handleTitle  = (e) => {
    let title = removeSpaces(e.target.value)
    setTitle(title)
  }
  const handleFocus  = (e) => {
    let focus = removeSpaces(e.target.value)
    setFocus(focus)
  }
  const handleVoucher  = (e) => {
    let voucher = e.target.value
    if (!isNaN(voucher)) setVoucherValue(voucher)
  }

  const [currentStep, setCurrentStep] = useState('form'); // 'form', 'quiz', 'questionnaire'
  const [quizData, setQuizData] = useState([]);
  const getProfileData = useSelector(state => state.profileData.getProfileData)

  const [wallet , setWallet] = useState(0)

  useEffect(() => {
    if (getProfileData.status) {
      setWallet(getProfileData.data.user.wallet)
    }
  } , [getProfileData])
  const handleNext = () => {
      if (title && focus && selectedBranch && date && time1  && selectedQuestioniere>-1) {
        if(voucherValue <= wallet){
          setCurrentStep('quiz')
        }
        else{
          Swal.fire({
            icon: 'error',
            text: t("text.You_dont_have_enough_money_to_create_a_new_mission"),
          })
        }
      }
      else {
        Swal.fire({
          icon: 'error',
          text: t("text.please_fill_all_the_fields"),
        })
    }
  }

  const handleQuizDataChange = (data) => {
    setQuizData(data);
  }

  const handleQuizNext = () => {
    setCurrentStep('questionnaire')
  }

  const handleQuizPrev = () => {
    setCurrentStep('form')
  }

  const handleQuestionnairePrev = () => {
    setCurrentStep('quiz')
  }

  

  
  return (
    <>
    <SmallContainer>
      <Place>
        <span> {t("text.missions")} / </span>
        <span style = {{color : Colors.main}}>{t("text.New_Mission")} </span>
      </Place>
            <Parent>
        {currentStep === 'form' && (
          <MainData>
            <TitleDiv>
                <Title>{t("text.Title")}</Title>
                <Input 
                  placeholder={t("text.type_here")} 
                  value={title}
                  onChange={handleTitle}
                />
            </TitleDiv>
            <Divider/>
            <TitleDiv>
                <Title>{t("text.type_what_you_want_him_her_to_focus_on")}</Title>
                <Input 
                  placeholder={t("text.type_here")} 
                  className='small'
                  value={focus}
                  onChange={handleFocus}
                />
            </TitleDiv>
            <Divider/>
            <TitleDiv>
                <Title>{t("text.Branch")}</Title>
                <Selectt
                  value={selectedBranch}
                  onChange={handleSelectedBranch}
                >
                  {currentBranches.map((branch, index) => (
                    <StyledMenuItem key={index} value={branch.id}>
                      {branch.name}
                    </StyledMenuItem>
                  ))}
              </Selectt>
            </TitleDiv>
            <Divider/>
            {/* date time section  */}
            <DateTime>
              <DateDiv>
              <Title>{t("text.Date")}</Title>   
                <DateInput type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
              </DateDiv>
              <TimeDiv>
                <FromToTimeDiv>
                  <Title>{t("text.from")}</Title>   
                  <TimeInput type="time" value={time1} onChange={(e)=>setTime1(e.target.value)} />
                </FromToTimeDiv>   
                {/* <FromToTimeDiv>
                  <Title>{t("text.to")}</Title>  
                  <TimeInput type="time" value={time2} onChange={(e)=>setTime2(e.target.value)} />
                </FromToTimeDiv>     */}
              </TimeDiv>
            </DateTime>
            <Divider/>
              <VoucherDiv>
                <CheckDiv>
                  <CheckInput
                      id='voucher'
                      type="checkbox"
                      checked={voucherChecked}
                      onChange={(e)=>setVoucherChecked(e.target.checked)}
                  />
                  <CheckLabel htmlFor='voucher'>{t("text.Include_Purchase_voucher")}</CheckLabel>
                </CheckDiv>
                {voucherChecked &&
                  <VoucherInput 
                    placeholder= {"00 " + t("text.SAR")} 
                    type = "text"
                    value={voucherValue}
                    onChange={handleVoucher}

                  />
                }
              </VoucherDiv>
            <Divider/>
            <TitleDiv>
                <Title>{t("text.Notes")}</Title>
                <NotesText 
                  placeholder={t("text.type_here")} 
                  value={notes}
                  onChange={(e)=>setNotes(e.target.value)}
                />
            </TitleDiv>
            <TitleDiv>
                <Title>{t("text.questionnaires")}</Title>
                <Selectt
                  value={selectedQuestioniere}
                  onChange={handleSelectedQuestionnaire}
                >
                  {questionieres.map((questioniere, index) => (
                    <StyledMenuItem key={index} value={index}>
                      {questioniere.title}
                    </StyledMenuItem>
                  ))}
              </Selectt>
            </TitleDiv>
            <SubmitButton2 onClick={handleNext}>{t("text.Next")}</SubmitButton2>
          </MainData>
        )}

        {currentStep === 'quiz' && (
          <Quiz 
            onNext={handleQuizNext}
            onPrev={handleQuizPrev}
            initialData={quizData}
            onQuizDataChange={handleQuizDataChange}
          />
        )}

        {currentStep === 'questionnaire' && (
          <QuestionnaireData 
            onPrev={handleQuestionnairePrev}
          />
        )}

        <FinishedData
          missionTitle={title}
          missionFocus={focus}
          missionSelectedBranch={selectedBranch}
          missionDate={date}
          missionTime1={time1}
          missionVoucherChecked={voucherChecked}
          missionVoucherValue={voucherValue}
          missionNotes={notes}
          missionSelectedQuestioniere={selectedQuestioniere}
          quizData={quizData}
        />
      </Parent>
    </SmallContainer>
    </>
  )
}

export default NewMission