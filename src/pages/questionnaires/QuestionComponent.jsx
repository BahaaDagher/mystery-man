import React from 'react'
import MultiChoice from './questions/MultiChoice';
import Choices from './questions/Choices';
import YesOrNo from './questions/YesOrNo';
import RatingQuestion from './questions/RatingQuestion';
import OpenQuestion from './questions/OpenQuestion';
import UploadImages from './questions/UploadImages';
import HeadLine from './questions/HeadLine';
export default function QuestionComponent({questions}) {
  console.log(questions);
  const questionsComponents =[]
  questions.forEach(question => {
    if(question.type=='SingleChoice' || question.type=='multiChoice')questionsComponents.push(<Choices/>)
    else if(question.type=='yesOrNo')questionsComponents.push(  <YesOrNo/>)
    else if(question.type=='rating')questionsComponents.push(  <RatingQuestion/>)
    else if(question.type=='open')questionsComponents.push(  <OpenQuestion/>)
    else if(question.type=='uploadImages')questionsComponents.push(  <UploadImages/>)
    else if(question.type=='headLine')questionsComponents.push(  <HeadLine/>)
    
  })
   
  return (
    <>
    {
      questionsComponents.map((el)=> el)
    }

    </>
  )
}
