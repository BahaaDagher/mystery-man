import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { Colors } from '../../../Theme';
import RequiredOptional from './RequiredOptional';
import QuestionInput from './QuestionInput';
import grayDelete from '../../../assets/icons/grayDelete.svg'
import DeleteIcon from './DeleteIcon';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestionDetails } from '../../../store/slices/questionierSlice';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';


const Parent = styled("div")(({ theme }) => ({
  backgroundColor : "#fff" ,
  padding : "20px" ,
  margin : "15px 0 " ,
  borderRadius : "10px" ,
  position : "relative" , 
}));

const AnswerInput = styled("input")(({ theme }) => ({
  backgroundColor : "transparent" ,
  width : "80%" ,
  border: "1px solid transparent" , 
  borderBottom: `1px solid ${Colors.input}` , 
  outline : "none" ,
  "::placeholder": {
    color: Colors.gray_l
  },
  margin : "0 10px" ,
}));
const AddAnswerDiv = styled("div")(({ theme }) => ({
  display : "flex" ,
  alignItems : "center" ,
  width : "100%" ,
  margin : "20px 0" ,
}));
const AddButton = styled("div")(({ theme }) => ({
  backgroundColor : Colors.main ,
  display : "inline" ,
  padding : "5px 10px" ,
  borderRadius : "10px" ,
  color : "#fff" ,
  cursor : "pointer" ,
  marginRight : theme.direction == "ltr" ? "10px" : "0" ,
  marginLeft : theme.direction == "rtl" ? "10px" : "0" ,
  transition : "all .3s ease-in-out" ,
  "&:hover" : {
    backgroundColor : Colors.hoverMain ,
  },
  textAlign : "center" ,
  // width : "50px" , 
}));
const AnswerContainer = styled("div")(({ theme }) => ({
  display : "flex" ,
  alignItems : "center" ,
  width : "80%" ,
  [theme.breakpoints.down('1500')]: {
    width : "100%" ,
  },
}));


const Choices = ({questionData,index ,setIsApplyFocus}) => {
  const {t} = useTranslation();
  const [radio,  setRadio] = useState(questionData.required);
  const [question, setQuestion] = useState(questionData.title);
  const [answers, setAnswers] = useState(questionData.options); 
  const [newAnswer, setNewAnswer] = useState({title:'',rate:''});
  const questionieres = useSelector((state) => state.questioneirData.questionieres);
  const currentQuestioneir = useSelector((state) => state.questioneirData.currentQuestioneir);
  const currentStep = useSelector((state) => state.questioneirData.currentStep);
  const dispatch = useDispatch() ; 
  useEffect(()=>{
    const data ={
      type:questionData.type,
      title:question,
     
    }
    dispatch(setQuestionDetails({index:index ,data:data}))
  },[question])
  useEffect(()=>{
    const data ={
      type:questionData.type,
      required:radio,
     
    }
    dispatch(setQuestionDetails({index:index ,data:data}))
  },[radio])
  useEffect(()=>{
    const data ={
      type:questionData.type,
      options:answers
    }
    dispatch(setQuestionDetails({index:index ,data:data}))
  },[answers])

  useEffect(() => {
    setAnswers(questionData.options || []);
  }, [questionData.options]);

  const handleUpdateAnswer = (answerIndex, field, value) => {
    setAnswers((prev) =>
      prev.map((item, i) =>
        i === answerIndex ? { ...item, [field]: value } : item
      )
    );
  };

  const handleAddAnswer = () => {
    if (newAnswer.title.trim() === '') {
      Swal.fire({
        icon: 'error',
        text: t("text.Please_enter_a_new_answer"),
      })
      return;
    }
    if (newAnswer.rate === '' || newAnswer.rate === null || newAnswer.rate === undefined) {
      Swal.fire({
        icon: 'error',
        text: t("text.Please_enter_a_new_answer_rate"),
      })
      return;
    }
    const rateValue = Number(newAnswer.rate);
    if (Number.isNaN(rateValue) || rateValue < 0 || rateValue > 100) {
      Swal.fire({
        icon: 'error',
        text: t("text.Rating_must_be_between_0_and_100"),
      })
      return;
    }

    setAnswers((prev) => [...prev, { title: newAnswer.title.trim(), rate: newAnswer.rate }]);
    setNewAnswer({ title: '', rate: '' });
  };

  const handleDeleteAnswer = (answerIndex) => {
    setAnswers((prev) => prev.filter((_, i) => i !== answerIndex));
  };
  return (
    <>
      <Parent>
      <DeleteIcon index={index} setIsApplyFocus={setIsApplyFocus}/>
        <RequiredOptional radio={questionData} setRadio= {setRadio} />
        <QuestionInput question= {questionData} setQuestion= {setQuestion}/>
          <div>
            {answers.map((answer, answerIndex) => (
              <div key={answerIndex}>
                <AnswerContainer>
                  <img src={grayDelete} onClick={() => handleDeleteAnswer(answerIndex)} style={{ cursor: "pointer" }} alt="" />
                  <AnswerInput
                    type="text"
                    placeholder={t("text.EnterAnewAnswer")}
                    value={answer.title || ''}
                    onChange={(e) => handleUpdateAnswer(answerIndex, 'title', e.target.value)}
                  />
                  <AnswerInput
                    type="number"
                    min="0"
                    max="100"
                    placeholder={t("text.RatingOfAnswerBetween0100")}
                    value={answer.rate ?? ''}
                    onChange={(e) => handleUpdateAnswer(answerIndex, 'rate', e.target.value)}
                  />
                </AnswerContainer>
              </div>
            ))}
            <AddAnswerDiv>
              <AddButton onClick={handleAddAnswer}>{t("text.Add")} </AddButton>
              <AnswerInput
                type="text"
                placeholder={t("text.EnterAnewAnswer")}
                value={newAnswer.title}
                onChange={(e) => setNewAnswer({title:e.target.value ,rate:newAnswer.rate})}
              />
              <AnswerInput
                type="number"
                placeholder={t("text.RatingOfAnswerBetween0100")}
                value={newAnswer.rate}
                onChange={(e) => setNewAnswer({title:newAnswer.title, rate:e.target.value })
                } 
              />
            </AddAnswerDiv>
          </div>
      </Parent>
    </>
  )
}

export default Choices