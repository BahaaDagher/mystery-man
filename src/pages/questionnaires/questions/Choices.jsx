import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { Colors } from '../../../Theme';
import RequiredOptional from './RequiredOptional';
import QuestionInput from './QuestionInput';
import grayDelete from '../../../assets/icons/grayDelete.svg'
import DeleteIcon from './DeleteIcon';
import { useDispatch, useSelector } from 'react-redux';
import { handleDeleteQuestion, setQuestionDetails } from '../../../store/slices/questionierSlice';


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
  width : "50px" , 
}));
const AnswerContainer = styled("div")(({ theme }) => ({
  display : "flex" ,
  alignItems : "center" ,
  width : "80%" ,
  [theme.breakpoints.down('1500')]: {
    width : "100%" ,
  },
}));
const Answer = styled("div")(({ theme }) => ({
  padding : "5px" ,
  width : "80%" ,
  margin : "0 10px" ,
  fontSize : "20px" ,
  color : Colors.gray ,
  [theme.breakpoints.down('1500')]: {
    width : "100%" ,
  },
  [theme.breakpoints.down('800')]: {
    flexDirection : "column" ,
    alignItems : "flex-start" ,
  },
}));

const Choices = ({questionData,index}) => {
  const [radio,  setRadio] = useState(questionData.required);
  const [question, setQuestion] = useState(questionData.title);
  const [answers, setAnswers] = useState(questionData.options); 
  const [newAnswer, setNewAnswer] = useState('');
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

  const handleAddAnswer = () => {
    if (newAnswer.trim() !== '') {
      console.log("newAnswer",newAnswer);
      const currentAns =questionData.options
      setAnswers([...currentAns, newAnswer]);
      setNewAnswer('');
    }
  };
  const handleDeleteAnswer = (index) => {
    const updatedAnswers = [...questionData.options];
    updatedAnswers.splice(index, 1);
    setAnswers(updatedAnswers);
  };

  return (
    <>
      <Parent>
        <DeleteIcon index={index} />
        <RequiredOptional radio={questionData} setRadio= {setRadio} />
        <QuestionInput question= {questionData} setQuestion= {setQuestion}/>
          <div>
            {questionData.options.map((answer, index) => (
              <div key={index}>
                <AnswerContainer>
                  <img src = {grayDelete} onClick={() => handleDeleteAnswer(index)} style = {{cursor : "pointer"}}/>
                  <Answer>{answer}</Answer>
                </AnswerContainer>
              </div>
            ))}
            <AddAnswerDiv>
              <AddButton onClick={handleAddAnswer}>Add </AddButton>
              <AnswerInput
                type="text"
                placeholder="Enter a new answer"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
            </AddAnswerDiv>
          </div>
      </Parent>
    </>
  )
}

export default Choices