import React, { useEffect, useState } from 'react'
import InformationDiv from '../viewMissionDetailes/InformationDiv'
import styled from '@emotion/styled';
import { Colors } from '../../../Theme';
import { useDispatch, useSelector } from 'react-redux';
import SingleChoices from './components/SingleChoices';
import MultiChoice from './components/MultiChoice';
import YesOrNo from './components/YesOrNo';
import RatingQuestion from './components/RatingQuestion';
import Open from './components/Open';
import UploadImages from './components/UploadImages';
import HeadLine from './components/HeadLine';
import { getQuestionsMissions } from '../../../store/slices/missionSlice';


const Continer = styled("div")(({ theme }) => ({
  borderRadius: "10px",
  padding : "10px 20px" , 
  marginBottom  : "20px" ,
  backgroundColor: "#fff",
}));

const QuestionsAnswers = styled("div")(({ theme }) => ({
  fontSize: "30px", 
  color : Colors.second , 
  marginBottom : "20px" ,
  textAlign : "center" ,
}));

const NotCompletedDetails = ({missionDetails}) => {

  const [questionsData ,setQuestionsData ] = useState([]) 
    
  const questionsMissionsData = useSelector(state => state.missionData.questionsMissionsData) 

  const dispatch = useDispatch()
  useEffect(()=>{
      dispatch(getQuestionsMissions(missionDetails.id))
  },[])

  useEffect(()=>{
      if (questionsMissionsData.data) {
        console.log(questionsMissionsData.data);
          const arr =[]
          questionsMissionsData.data.question.steps.forEach((step)=>{
              step.questions.forEach((question)=>{
                  arr.push(question)
              })

          })
          setQuestionsData(arr)
      }
  },[questionsMissionsData])

  return (
    <div>

      <InformationDiv missionDetails={missionDetails}></InformationDiv>
      <QuestionsAnswers>Questions </QuestionsAnswers>
                {questionsData.map((question , index)=>{
                    if (question.type === "SingleChoice") {
                        return (
                            <Continer key = {index}>
                                <SingleChoices num = {index + 1} question = {question} />
                            </Continer>
                        )
                    }else if (question.type === "multiChoice") {
                        return (
                            <Continer key = {index}>
                                <MultiChoice num = {index + 1} question = {question} />
                            </Continer>
                        )
                    }else if (question.type === "yesOrNo") {
                        return (
                            <Continer key = {index}>
                                <YesOrNo num = {index + 1} question = {question} />
                            </Continer>
                        )
                    }else if (question.type === "rating") {
                        return (
                            <Continer key = {index}>
                                <RatingQuestion num = {index + 1} question = {question} />
                            </Continer>
                        )
                    }else if (question.type === "open") {
                        return (
                            <Continer key = {index}>
                                <Open num = {index + 1} question = {question} />
                            </Continer>
                        )
                    }else if (question.type === "uploadImages") {
                        return (
                            <Continer key = {index}>
                                <UploadImages num = {index + 1} question = {question} />
                            </Continer>
                        )
                    }else if (question.type === "headLine") {
                        return (
                            <Continer key = {index}>
                                <HeadLine num = {index + 1} question = {question} />
                            </Continer>
                        )
                    }
                })}
    </div>
  )
}

export default NotCompletedDetails