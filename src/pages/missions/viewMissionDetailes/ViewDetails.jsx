import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { SmallContainer } from '../../../components/SmallContainer';
import SingleChoices from './components/SingleChoices';
import styled from '@emotion/styled';
import MultiChoice from './components/MultiChoice';
import { getCompletedMissionAnswer } from '../../../store/slices/missionSlice';
import YesOrNo from './components/YesOrNo';
import Open from './components/Open';
import UploadImages from './components/UploadImages';
import HeadLine from './components/HeadLine';
import RatingQuestion from './components/RatingQuestion';
import { SubmitButton } from '../../../components/SubmitButton';
import InformationDiv from './InformationDiv';
import ReactToPrint from 'react-to-print';
import { Colors } from '../../../Theme';
const Parent = styled("div")(({ theme }) => ({
    width: "100%",
    
}));
const Continer = styled("div")(({ theme }) => ({
    borderRadius: "10px",
    padding : "10px 20px" , 
    marginBottom  : "20px" ,
    backgroundColor: "#fff",
}));



const PrintButton = styled(SubmitButton)(({ theme }) => ({
    width:"90%" , 
    margin : "0 auto" ,

}));
const QuestionsAnswers = styled("div")(({ theme }) => ({
    fontSize: "30px", 
    color : Colors.second , 
    marginBottom : "20px" ,
    textAlign : "center" ,
}));

const ViewDetails = ({missionDetails}) => {
    const location = useLocation();
    
    const [questionsData ,setQuestionsData ] = useState([]) 

    const CompletedMissionAnswer = useSelector(state => state.missionData.CompletedMissionAnswer) 
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getCompletedMissionAnswer(missionDetails.id))
    },[])
    useEffect(()=>{
        console.log(CompletedMissionAnswer ,"CompletedMissionAnswer");
        if (CompletedMissionAnswer.data) {
            const arr =[]
            CompletedMissionAnswer.data.questions.steps.forEach((step)=>{
                step.questions.forEach((question)=>{
                    arr.push(question)
                })

            })
            setQuestionsData(arr)
        }
    },[CompletedMissionAnswer])

    // mission details 
    // const missionDetails = useSelector(state => state.missionData.missionDetails)
    useEffect(()=>{
        console.log(missionDetails ,"missionDetails");
    },[missionDetails])

    const handlePrint = () => {
        const printContents = document.getElementById('divToPrint').innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        // Restore the original content
        document.body.innerHTML = originalContents;
    };
  return (
    <>
        <SmallContainer>
            
            <Parent id="divToPrint" >
                <InformationDiv missionDetails = {missionDetails} />

                <QuestionsAnswers>Questions Answers</QuestionsAnswers>
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
            </Parent>
            <ReactToPrint
                trigger={ () => <PrintButton>Print</PrintButton> }
                content={ () => document.getElementById('divToPrint') }
            />
        </SmallContainer>
    </>
  )
}

export default ViewDetails