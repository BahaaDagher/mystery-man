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
  questions.forEach((question,i) => {
    if(question.type=='SingleChoice' || question.type=='multiChoice')questionsComponents.push(<Choices questionData={question} index={i}/>)
    else if(question.type=='yesOrNo')questionsComponents.push(  <YesOrNo questionData={question} index={i}/>)
    else if(question.type=='rating')questionsComponents.push(  <RatingQuestion questionData={question} index={i}/>)
    else if(question.type=='open')questionsComponents.push(  <OpenQuestion questionData={question} index={i}/>)
    else if(question.type=='uploadImages')questionsComponents.push(  <UploadImages questionData={question} index={i}/>)
    else if(question.type=='headLine')questionsComponents.push(  <HeadLine questionData={question} index={i}/>)
    
  })
   
  return (
    <>
    {
      questionsComponents.map((el)=> el)
    }

    </>
  )
}
