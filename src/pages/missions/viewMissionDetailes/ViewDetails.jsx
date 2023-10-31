import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

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
    const questions = [
        {
            "id": 132,
            "title": "Is the car good?",
            "answer": {
                "title": "Bad"
            },
            "type": "SingleChoice",
            "rate": null
        },
        {
            "id": 133,
            "title": "Do you like the color?",
            "answer": null,
            "type": "yesOrNo",
            "rate": null
        },
        {
            "id": 134,
            "title": "Rate the car",
            "answer": "3",
            "type": "rating",
            "rate": "3"
        } ,
        {
            "id": 135,
            "title": "Talk about the car",
            "answer": "زوزنزن",
            "type": "open",
            "rate": null
        } , 
        {
            "id": 136,
            "title": "A picture of the car",
            "answer": [
                "http://mystery.cloudy.mohamedmansi.com/Admin/images/questions/1698708865_questions.jpg"
            ],
            "type": "uploadImages",
            "rate": null
        },
        {
            "id": 137,
            "title": "Focus on the workers and their style",
            "answer": null,
            "type": "headLine",
            "rate": null
        }
    ]
    const [questionsData ,setQuestionsData ] = useState(questions) 
  return (
    <>
        <h1>ViewDetails</h1>
    </>
  )
}

export default ViewDetails