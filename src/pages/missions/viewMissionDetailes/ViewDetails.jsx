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
import PrintingDiv from './PrintingDiv';
import { useTranslation } from 'react-i18next';
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
    backgroundColor : Colors.green ,
    borderRadius : "10px 0 10px 0 " , 
    width:"100%" , 
    margin : "0 auto" ,
    "&:hover" : {
        backgroundColor : Colors.hoverGreen ,
    }
}));

const QuestionsAnswers = styled("div")(({ theme }) => ({
    fontSize: "30px", 
    color : Colors.second , 
    marginBottom : "20px" ,
    textAlign : "center" ,
}));

const ViewDetails = ({missionDetails}) => {
    
    const [questionsData ,setQuestionsData ] = useState([]) 
    const [missionAnswer ,setMissionAnswer ] = useState()
    
    const CompletedMissionAnswer = useSelector(state => state.missionData.CompletedMissionAnswer) 

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getCompletedMissionAnswer(missionDetails.id))
    },[])

    useEffect(()=>{
        console.log("cccccccCompletedMissionAnswer" , CompletedMissionAnswer );
        if (CompletedMissionAnswer.data) {
            setMissionAnswer(CompletedMissionAnswer.data.questions)
            const arr =[]
            CompletedMissionAnswer.data.questions.steps.forEach((step)=>{
                step.questions.forEach((question)=>{
                    arr.push(question)
                })
            })
            setQuestionsData(arr)
        }
    },[CompletedMissionAnswer])



    useEffect(()=>{
        console.log("missionAnswerrrrrrrr" ,missionAnswer );
    }, [missionAnswer])

    const [showPrint , setShowPrint] = useState(false)

    const handleShowPrint = ()=>{
        setShowPrint(true)
    }
    const {t} = useTranslation()
  return (
    <>
        <SmallContainer>
            
            <Parent >
                {/* <div>{questionsData[0].name}</div> */}
                <InformationDiv missionDetails = {missionDetails} />

                <QuestionsAnswers>{t("text.Questions_Answers")}</QuestionsAnswers>
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
            
            {
                !showPrint ? <SubmitButton onClick = {handleShowPrint}>{t("text.show_Report")}</SubmitButton> : null 
            }
            {showPrint ?
                <>
                    <ReactToPrint 
                        trigger={ () => <PrintButton  >{t("text.Print_Report")}</PrintButton> }
                        content={ () => document.getElementById('divToPrint') }
                    />
                    <PrintingDiv missionDetails = {missionDetails} missionAnswer = {missionAnswer} /> 
                </>
                 : 
                null
            }
            
            

        </SmallContainer>
    </>
  )
}

export default ViewDetails