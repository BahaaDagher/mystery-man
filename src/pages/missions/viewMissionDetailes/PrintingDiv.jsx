import React, { useEffect, useState } from 'react'
import { Colors } from '../../../Theme';
import styled from '@emotion/styled';
import { FlexSpaceBetween } from '../../../components/FlexSpaceBetween';
import { FlexCenter } from '../../../components/FlexCenter';
import logo from "../../../assets/images/BlueLogo.png"
import logoPic from "../../../assets/icons/logoPic.svg"
import { Flex } from '../../../components/Flex';
import test from "../../../assets/images/test.png"
import { Box, Rating, hexToRgb } from '@mui/material';
import { useTranslation } from 'react-i18next';
import badScale from "../../../assets/images/badScale.svg"
import goodScale from "../../../assets/images/goodScale.svg"
import normalScale from "../../../assets/images/normalScale.svg"
import excellentScale from "../../../assets/images/excellentScale.svg"
import four from "../../../assets/images/4.png" 


const PrintDiv = styled("div")(({ theme }) => ({
    padding : "30px 50px" , 
    backgroundColor : "#fff", 
    minWidth : "800px" , 
    overflow : "auto" ,
    direction : theme.direction , 
    // height : "100vh" , 
    // display : "flex" ,
    
    // display : "none" ,
    // border : `1px solid ${Colors.main}` ,
}));
const MainInformation = styled("div")(({ theme }) => ({
    display : "flex" ,
    flexDirection : "column" ,
    alignItems : "center" ,
    // justifyContent : "center" ,
    minHeight : "1000px" , 

}));

const LogoName = styled("img")(({ theme }) => ({
    marginBottom : "20px" ,
    width : "250px" ,
}));
const BasicInfo = styled(FlexSpaceBetween)(({ theme }) => ({
    width : "100%" , 
    borderBottom : `3px solid ${Colors.main}` ,
    borderRadius : "10px" ,
    padding : "10px" ,
}));
const CompanyInfo = styled("div")(({ theme }) => ({

}));
const VisitorInfo = styled("div")(({ theme }) => ({

}));

const Tab = styled(Flex)(({ theme }) => ({
}));
const TabTitle = styled("div")(({ theme }) => ({
    fontWeight : "bold" ,
}));
const TabAnswer = styled("div")(({ theme }) => ({
    margin : theme.direction === "rtl" ? "0 10px 0 0" : "0 0 0 10px" ,
}));

const Section = styled("div")(({ theme }) => ({
    // backgroundColor : Colors.main ,
    color : Colors.main ,
    fontWeight : "bold" , 
    margin : "30px 0 20px 0" ,  
    // width : "100%" ,
    borderBottom : `3px solid ${Colors.main}` ,
    borderRadius : "10px" , 
    padding : "5px" ,
    textAlign : "center" , 
    fontSize: "20px" ,
}));

const OverallPerformance = styled(FlexSpaceBetween)(({ theme }) => ({
    alignItems : "center" ,
    width : "100%" , 
}));
const LogoContainer = styled("div")(({ theme }) => ({
    
}));
const LogoPic = styled("img")(({ theme }) => ({
    
}));
const PerformanceContainer = styled("div")(({ theme }) => ({
    display : "flex" , 
    flexDirection : "column" ,
    alignItems : "center" ,
    justifyContent : "center" ,
    height : "250px" , 
    width : "50%" , 
    marginBottom : "20px" ,
}));
const ScaleDiv = styled("div")(({ theme }) => ({
    // marginBottom  : "20px" ,
}));
const PerformanceRate = styled(Flex)(({ theme }) => ({
    alignItems : "center" ,
    width : "100%" ,
    justifyContent : "center" ,
    

}));
const YourPerformance = styled("div")(({ theme }) => ({
    // border : `2px solid ${Colors.main}` ,
    padding : "5px 10px" ,
    borderRadius : "5px" , 
    fontWeight : "bold" , 

}));
const Rate = styled("div")(({ theme }) => ({
    color : Colors.main ,
    fontWeight : "bold" , 
    margin : "0 10px" , 
}));

const SummaryDiv = styled("div")(({ theme }) => ({
    width : "100%"
}));
const StepSummary = styled(FlexSpaceBetween)(({ theme }) => ({
    alignItems : "center" ,
    marginBottom : "8px" , 
}));
const StepName = styled("div")(({ theme }) => ({
    fontWeight :"bold" , 
}));
const StepRate = styled("div")(({ theme }) => ({
    width : "70%" ,
    // backgroundColor : "#3734ca42" ,
    border : `2px solid ${Colors.main}` ,
    fontWeight : "bold" ,
}));
const PercentageDiv = styled("div")(({ theme }) => ({
    // width : "92.5%" , 
    textAlign: "right"  , 
    backgroundColor :   "#3734ca42",
}));
const Percentage = styled("div")(({ theme }) => ({
    paddingRight : "5px" ,
    textAlign: "right" ,  
    fontSize : "15px" ,
}));

/////////////////////////// step tables //////////////////////////////

const StepsDetails = styled("div")(({ theme }) => ({
    minHeight : "1000px" ,      
    width : "100%" ,
    margin : "40px auto" , 

}));
const HeaderTable = styled("table")(({ theme }) => ({
    border : `2px solid ${Colors.green}` ,
    width : "100%" , 
}));
const Tr = styled("tr")(({ theme }) => ({

}));
const Td = styled("td")(({ theme }) => ({
    border : `2px solid ${Colors.main}` ,
    padding : "0 10px" , 
    
}));
const TdCenter = styled("td")(({ theme }) => ({
    padding : "0 10px" , 
    border : `2px solid ${Colors.main}` ,
    textAlign : "center" ,
    width : "200px" , 
}));
const StepTable = styled("table")(({ theme }) => ({
    border : `2px solid ${Colors.main}` ,
    width : "100%" , 
    marginBottom : "30px" , 
}));
const PaddingDiv = styled("div")(({ theme }) => ({
    paddingLeft : "10px" , 

}));
const Divider = styled("div")(({ theme }) => ({
    width : "100%" ,
    height : "1px" ,
    backgroundColor : Colors.green ,
    margin : "10px 0" ,
    
}));

const PicsDiv = styled("div")(({ theme }) => ({
    minHeight : "1000px" , 
    flexDirection : "column" ,
}));


const RateContainer = styled("div")(({ theme }) => ({
    borderRadius: "10px",
    marginBottom  : "20px" ,
    width : "100%" , 
    textAlign : "center" ,
}));

const Notes = styled("div")(({ theme }) => ({
    color : Colors.second , 
    fontSize : "18px" ,
    fontWeight : "600" 
}));

const Header = styled("div")(({ theme }) => ({

}));
const FirstLine = styled("div")(({ theme }) => ({

}));
const LogoDiv = styled("div")(({ theme }) => ({

}));
const Image = styled("img")(({ theme }) => ({
    width :"100px" , 
}));

const SecondLine = styled(FlexSpaceBetween)(({ theme }) => ({
    margin : "50px 0" ,
    alignItems : "center" ,
    direction : theme.direction
}));
const DataDiv = styled("div")(({ theme }) => ({

}));
const PhotoDiv = styled("div")(({ theme }) => ({
    width : "150px" , 
    height : "150px" , 
    borderRadius : "50%" , 
    overflow : "hidden" , 
    border : `3px solid ${Colors.gold}` ,
    display : "flex" , 
    justifyContent : "center" , 
    alignItems : "center" ,
    backgroundColor : Colors.main , 
    boxShadow : "0 0 10px 0px #00000042" , 
}));
const EmployeeImage = styled("img")(({ theme }) => ({
    width : "100%" ,
}));

const AllRating = styled("div")(({ theme }) => ({
    backgroundColor : Colors.lightGray ,
    padding  :"85px 50px" , 
    direction : "ltr" , 
    // 
}));
const Graph = styled("div")(({ theme }) => ({
    position : "relative" ,
    width :"100%" ,
    height : "px" ,
    border : `1px solid ${Colors.main2}` ,
    borderTop : "none" ,
    borderRight : "none" ,
    // padding : "30px" , 


}));

const BarContainer = styled("div")(({ theme }) => ({
    // border : `1px solid red` ,
    height : "91%" , 
    position : "absolute" ,
    width : "100%" , 
    // left : "5%" , 
    bottom :"12px" , 
    display : "flex" ,
    // justifyContent : "space-between" ,
     
}));
const BarParent = styled("div")(({ theme }) => ({
    position :"relative" , 
    margin : "0 20px" ,
    // border : "1px solid green" , 
    width : "60px" , 
    left : "0" , 
    bottom : 0 , 
}));

const Bar = styled("div")(({ theme }) => ({
    position : "absolute" ,
    width : "16px" , 
    height : "50%" , 
    bottom : "0" , 
    background: "#F59C34" , 
    transform: 'skewY(-15deg)',
    '&::after': {
        content: "''",
        width: '16px',
        height: '6px',
        background: "rgb(253,199,12)" , 
        background: "linear-gradient(354deg, rgba(253,199,12,1) 22%, rgba(245,156,52,1) 65%)" , 
        position: 'absolute',
        top: '-6px',
        left: '-5px',
        transform: 'skewX(60deg)',
    },
    '&::before': {
        content: "''",
        width: '10px',
        height: '100%',
        // background : "red" , 
        background: "rgb(253,199,12)" , 
        background: "linear-gradient(354deg, rgba(253,199,12,1) 22%, rgba(245,156,52,1) 65%)" , 
        position: 'absolute',
        left: "-10px" , 
        top: "-3px" , 
        bottom: '5px',
        transform: 'skewY(30deg)',
    },
    
}));

const BarTitleContainer = styled("div")(({ theme }) => ({
    position : "absolute" , 
    top : "314px" , 
    left : "-24px" ,
    // border : `1px solid ${Colors.main}` , 
}));
const BarTitle = styled("div")(({ theme }) => ({
    position : "relative" , 
    fontWeight : "bold" , 
    // whiteSpace: "nowrap" , 
    '&::before': {
        content: "''",
        position: 'absolute',
        width: '10px',
        height: '10px',
        background: Colors.main,
        top: '-16px',
        left: '19px',
        // transform : "translateX(-50%)" ,
        borderRadius: '50%',
    },


}));
const UL = styled("div")(({ theme }) => ({
    // border : "1px solid red"  ,
    display : "flex" ,
    flexDirection : "column" ,
    justifyContent : "space-between" ,
    alignItems : "center" ,
    width : "20px"  ,
    position : "relative" , 
    // top : "-10px" , 
    left : "-30px"  , 
    // width : "500px" , 
    // height : "100%"  ,
}));
const LI = styled("div")(({ theme }) => ({
    position : "relative" , 
    height : "29px" , 
    // borderBottom : `1px solid ${Colors.main}` ,
    fontSize :"12px"  ,
    fontWeight : "bold" ,
}));

const GeneralRating = styled("div")(({ theme }) => ({
    display : "flex" ,
    // flexDirection : "column" ,
    justifyContent : "space-between" ,
    alignItems : "center" ,
    fontSize :"20px" , 
    marginBottom : "20px" ,

}));
const RatingTitle = styled("div")(({ theme }) => ({
    fontWeight : "bold" , 
    fontSize : "18px" , 
}));
const RatingPercentage = styled("div")(({ theme }) => ({
    position :"relative" , 
    width : "150px" , 
    height : "150px" , 
    borderRadius : "50%" ,
    display : "flex" ,
    justifyContent : "center" ,
    alignItems : "center" ,
    background :"rgb(255,255,255)" , 
    background :"linear-gradient(180deg, rgba(255,255,255,1) 60%, rgba(190,190,190,1) 100%)" , 
    // boxShadow: "0px 0px 7px 8px rgba(0,0,0,.2)" , 
   
}));

const Percentage1 = styled("div")(({ theme }) => ({
    background: "rgb(80,72,156)" , 
    background: "linear-gradient(180deg, rgba(80,72,156,1) 0%, rgba(159,72,246,1) 43%)", 
    color : "#fff" , 
    width : "60%" , 
    height : "60%" , 
    borderRadius : "50%" , 
    display : "flex" , 
    justifyContent : "center" , 
    alignItems : "center" , 
    zIndex :"2" , 
    position :"relative" , 
    boxShadow: "0px -2px 9px 6px rgba(0,0,0,.2)" , 
    fontWeight : "bold" , 
    
}));

const RatingScore = styled("div")(({ theme }) => ({
    backgroundColor : "#50489C" , 
    fontWeight : "bold" , 
    color : "#fff" , 
    width : "130px" , 
    height : "40px" , 
    display :"flex" , 
    justifyContent : "center" , 
    alignItems : "center" , 
    borderRadius :"10px" , 
}));
const StepBar = styled("div")(({ theme }) => ({
    background: "rgb(80,72,156)" , 
    background: "linear-gradient(270deg, rgba(80,72,156,1) 21%, rgba(159,72,246,1) 100%) ", 
    display :"flex" , 
    color : "#fff" , 
    justifyContent : "space-between" , 
    padding : "5px 20px" , 
}));
const StepTitle = styled("div")(({ theme }) => ({
}));
const StepPercentage = styled("div")(({ theme }) => ({
}));

const StepQuestions = styled("div")(({ theme }) => ({
    padding : "0 30px" , 
}));
const StepQuestionAnswer = styled("div")(({ theme }) => ({
    margin : "20px 0"
}));
const StepQuestion = styled("div")(({ theme }) => ({
    fontWeight :"bold" , 
}));
const StepAnswer = styled("div")(({ theme }) => ({
}));
const YesOrNoAnswer = styled("div")(({ theme }) => ({
    width : "70px" , 
    background: "rgb(253,199,12)" , 
    background: "linear-gradient(270deg, rgba(253,199,12,1) 21%, rgba(245,156,52,1) 100%)" , 
    fontWeight : "bold" , 
    display : "flex" , 
    justifyContent :"center" , 
    alignItems : "center" , 
}));
const ChoiceAnswer = styled(FlexCenter)(({ theme }) => ({
    border : `1px solid ${Colors.gold}` ,
    padding :"5px" , 
    flexDirection : "column" ,
}));
const OpenAnswer = styled("div")(({ theme }) => ({
    width : "100%" , 
    padding : "10px" , 
    border : `1px solid ${Colors.gold}` ,
    marginTop :"10px"  , 
}));
const ImageAnswer = styled(FlexCenter)(({ theme }) => ({
    width : "60%" , 
    padding : "10px" , 
    border : `1px solid ${Colors.gold}` ,
    margin :"auto" , 
    marginTop :"10px"  , 
}));



const PrintingDiv = ({missionDetails , missionAnswer}) => {


    const convert = (str)=>{
        str = String(str)
        str = str.replace(",", ".") 
        return str+"%" 
    }
    const removeQum = (str)=>{
        str = String(str)
        str = str.replace(",", ".") 
        return str 
    }
    const [comments , setComments] = useState([])
    const [pics , setPics] = useState([])



    const handleComments = (abj) => {
        console.log("abj" , abj);
        let arr  = comments 
        arr.push(abj)
        setComments(arr)
    }
    const handlePics = (o) => {
        let arr  = pics 
        arr.push(o)
        setPics(arr)
    }
    const [one , setOne] = useState(0)


    useEffect  (()=>{
        console.log("missionAnswer" , missionAnswer)
        if (one<2) {
            setOne(one+1)  
            missionAnswer?.steps.map ((step , index) => {
                    let arr = []
                    step.questions?.map((question , index) => {
                        if (question.type === "uploadImages") {
                            console.log ("ya open ... ") ; 
                            handlePics({title : question.title , answer : question.answer})
                        }
                        else if (question.type === "open") {
                            arr.push({title : question.title , answer : question.answer})
                        }
                    })
                    if (arr.length > 0) {
                        handleComments(arr)
                    }
                    else {
                        handleComments([])
                    }
            })
        }
    } ,[missionAnswer])


    
    const [employee , setEmployee] = useState({})
    useEffect(()=>{
        let employees = missionDetails.employee
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].status!= 0 && employees[i].status!= 3 ) {
                setEmployee(employees[i].user )
            }
        }
    }
    ,[missionDetails])



    useEffect(()=>{
        console.log("missionDetails" , missionDetails)
    }
    ,[employee])


    
    const {t} = useTranslation() ;
    const numbers = [100,90,80,70,60,50,40,30,20,10,0];
    return (
    <PrintDiv id="divToPrint">

        <Header>
            <FirstLine>
                <LogoDiv>
                    <Image src = {logo}/>
                </LogoDiv>
            </FirstLine>
            {/* image of employee is {employee.image} */}

            <SecondLine>
                <DataDiv>
                    <Tab>
                        <TabTitle>{t("text.VisitorName")}:</TabTitle>
                        <TabAnswer>{employee.name} </TabAnswer>
                    </Tab>
                    <Tab>
                        <TabTitle>{t("text.CompanyName")}:</TabTitle>
                        <TabAnswer>{missionDetails.companyName}</TabAnswer>
                    </Tab>
                    <Tab>
                        <TabTitle>{t("text.BranchAddress")}:</TabTitle>
                        <TabAnswer>{missionDetails.branch}</TabAnswer>
                    </Tab>
                </DataDiv>
                <PhotoDiv>
                {/* {employee.image} */}
                    <EmployeeImage src = {missionDetails.companyimage} alt = "company img"/>
                </PhotoDiv>
                <DataDiv>
                    <Tab>
                        <TabTitle>{t("text.MissionDate")}:</TabTitle>
                        <TabAnswer>{missionDetails.date}</TabAnswer>
                    </Tab>
                    <Tab>
                        <TabTitle>{t("text.MissionTime")}:</TabTitle>
                        <TabAnswer>  {missionDetails.from} - {missionDetails.to}</TabAnswer>
                    </Tab>
                </DataDiv>

            </SecondLine>

            <AllRating>
                
                <GeneralRating>
                    <RatingTitle>{t("text.General_Rating")} </RatingTitle>
                    <RatingPercentage>
                        <Percentage1>{convert(missionAnswer?.rate)}</Percentage1>
                    </RatingPercentage>
                    <RatingScore>
                        {
                            removeQum(missionAnswer?.rate)>=75 ? <div>{t("text.excellent")}</div> :
                            removeQum(missionAnswer?.rate)>=50 ? <div>{t("text.good")}</div> :
                            removeQum(missionAnswer?.rate)>=25 ? <div>{t("text.natural")}</div> :
                            <div>{t("text.bad")}</div>
                        }
                    </RatingScore>
                </GeneralRating>

                <Graph>
                    <BarContainer>
                        {missionAnswer?.steps?.map((step , index) => {
                            return (
                                <>

                                    <BarParent>
                                        <Bar style = {{height : convert(step.rate) }}/>
                                        <BarTitleContainer>
                                            <BarTitle> {step.name}   </BarTitle> 
                                        </BarTitleContainer>
                                        {/* {step.name}  */}
                                    </BarParent>
                                    
                                    
                                </>
                                    
                            )
                        }
                        )}
                    </BarContainer>
                    <UL>
                        {numbers.map((number, index) => (
                            <LI key={index}>
                                {number}
                            </LI>
                        ))}
                    </UL>
                </Graph>

            </AllRating>

        </Header>
        <StepsDetails>
            {missionAnswer?.steps?.map((step , index) => {
                return (
                    <>
                         {/* StepBar StepName  StepRate StepQuestions  StepQuestionAnswer */}
                        <div key = {index}>
                            <StepBar>
                                <StepTitle >{step.name}</StepTitle>
                                <StepPercentage >{convert(step.rate)}</StepPercentage>
                            </StepBar>
                            <StepQuestions>
                            {step.questions?.map((question , index) => 
                            {
                                if (question.type === "open" || question.type === "headLine" || question.type === "uploadImages") {
                                    return (
                                    
                                    <StepQuestionAnswer >
                                        <StepQuestion>{question.title} </StepQuestion>
                                        {
                                            question.type === "open" ?  <OpenAnswer>{question.answer?question.answer : "N/A"}</OpenAnswer> : 
                                            question.type === "uploadImages" ? question.answer ?  <ImageAnswer><img src = {question.answer} style = {{height : "50%" , width : "50%"}}/></ImageAnswer> : "N/A"
                                            :null
                                            
                                        }
                                    </StepQuestionAnswer>
                                    )  
                                }
                                else {
                                    return (
                                    
                                    <StepQuestionAnswer style = {{display :"flex"  , justifyContent :"space-between"  , alignItems :"center"}}>
                                        <StepQuestion>{question.title} </StepQuestion>
                                        {
                                            question.type === "yesOrNo" ?  <YesOrNoAnswer>{question.answer? t(`text.${question.answer}`) : "N/A"}</YesOrNoAnswer> : 
                                            question.type === "rating" ?   question.answer? <Rating name="half-rating" defaultValue={question.answer}  readOnly style = {{direction : "ltr" , fontSize : "20px"}} precision={0.5}/> : <p>N/A</p> :
                                            question.type === "SingleChoice" ?  <ChoiceAnswer>{question.answer?question.answer:"N/A"}</ChoiceAnswer> :
                                            question.type === "multiChoice" ? 
                                            <ChoiceAnswer>

                                                {   question.answer ?
                                                    question.answer.map((answer , index) => {
                                                        return (
                                                            <div key = {index}> - {answer}</div>
                                                        )
                                                })
                                                :"N/A"
                                                }
                                            </ChoiceAnswer> : null 
                                            
                                        }
                                        
                                        
                                        
                                    </StepQuestionAnswer>
                                    )  

                                }
                                
                                
                            }
                            )}
                            </StepQuestions>
                           
                        </div>

                    </>
                )
                }
            )}
        </StepsDetails>


        


        
    </PrintDiv>
  )
}

export default PrintingDiv