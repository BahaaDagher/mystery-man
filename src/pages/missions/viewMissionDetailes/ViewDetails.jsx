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

const Parent = styled("div")(({ theme }) => ({
    width: "98%",
    
}));
const Continer = styled("div")(({ theme }) => ({
    borderRadius: "10px",
    padding : "10px 20px" , 
    marginBottom  : "20px" ,
    backgroundColor: "#fff",


}));
const ViewDetails = () => {
    const location = useLocation();
    // git id 
    const pathnameSegments = location.pathname
    let id = "" 
    for (var i = pathnameSegments.length - 1; i > 0; i--) {
        if (pathnameSegments[i] == "/") {
            break;
        }
        id += pathnameSegments[i];
    }
    id = Array.from(id).reverse().join("");
    console.log("id", id)
    // const questions = [
    //     {
    //         "id": 132,
    //         "title": "Is the car good?",
    //         "answer": {
    //             "title": "Bad"
    //         },
    //         "type": "SingleChoice",
    //         "rate": null
    //     },
    //     {
    //         "id": 141,
    //         "title": "wefefwef",
    //         "answer": [
    //             {
    //                 "title": "ewfwefe"
    //             },
    //             {
    //                 "title": "ewfewfefefwefefwefwefweffewff"
    //             }
    //         ],
    //         "type": "multiChoice",
    //         "rate": null
    //     },
    //     {
    //         "id": 133,
    //         "title": "Do you like the color?",
    //         "answer": null,
    //         "type": "yesOrNo",
    //         "rate": null
    //     },
    //     {
    //         "id": 134,
    //         "title": "Rate the car",
    //         "answer": "3",
    //         "type": "rating",
    //         "rate": "3"
    //     } ,
    //     {
    //         "id": 135,
    //         "title": "Talk about the car",
    //         "answer": "زوزنزن",
    //         "type": "open",
    //         "rate": null
    //     } , 
    //     {
    //         "id": 136,
    //         "title": "A picture of the car",
    //         "answer": [
    //             "http://mystery.cloudy.mohamedmansi.com/Admin/images/questions/1698708865_questions.jpg"
    //         ],
    //         "type": "uploadImages",
    //         "rate": null
    //     },
    //     {
    //         "id": 137,
    //         "title": "Focus on the workers and their style",
    //         "answer": null,
    //         "type": "headLine",
    //         "rate": null
    //     }
    // ]
    
    const [questionsData ,setQuestionsData ] = useState([]) 

    const CompletedMissionAnswer = useSelector(state => state.missionData.CompletedMissionAnswer) 
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getCompletedMissionAnswer(id))
        
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

  return (
    <>
        <SmallContainer>
            <Parent>
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
        </SmallContainer>
    </>
  )
}

export default ViewDetails