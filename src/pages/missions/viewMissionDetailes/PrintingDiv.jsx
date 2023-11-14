import React, { useEffect, useState } from 'react'
import { Colors } from '../../../Theme';
import styled from '@emotion/styled';
import { FlexSpaceBetween } from '../../../components/FlexSpaceBetween';
import { FlexCenter } from '../../../components/FlexCenter';
import logo from "../../../assets/images/logo.svg"
import logoPic from "../../../assets/icons/logoPic.svg"
import { Flex } from '../../../components/Flex';
import test from "../../../assets/images/test.png"
import { Box, Rating } from '@mui/material';
import { useTranslation } from 'react-i18next';
import badScale from "../../../assets/images/badScale.svg"
import goodScale from "../../../assets/images/goodScale.svg"
import normalScale from "../../../assets/images/normalScale.svg"
import excellentScale from "../../../assets/images/excellentScale.svg"


const PrintDiv = styled("div")(({ theme }) => ({
    padding : "20px" , 
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
    // width : "300px" ,
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
    marginLeft : "10px" ,
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
    margin : "20px auto" , 

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
    // padding : "20px" , 
    marginBottom  : "20px" ,
    width : "100%" , 
    textAlign : "center" ,
    // height : "135px" ,
}));

const Notes = styled("div")(({ theme }) => ({
    color : Colors.second , 
    fontSize : "18px" ,
    fontWeight : "600" 
}));



const PrintingDiv = ({missionDetails , missionAnswer}) => {


    const convert = (str)=>{
        str = str.replace(",", ".") 
        return str+"%" 
    }
    const removeQum = (str)=>{
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
        if (convert("11,5")<100) console.log ("convert(11,5)<100")
        else console.log (convert("11,5"))
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


    
    const {t} = useTranslation() ;
  return (

    <PrintDiv id="divToPrint">
        <MainInformation>
            <LogoName src = {logo}/>
            <BasicInfo>
                <CompanyInfo>

                    <Tab>
                        <TabTitle>Company Name:</TabTitle>
                        <TabAnswer>{missionDetails.companyName}</TabAnswer>
                    </Tab>
                    <Tab>
                        <TabTitle>Mission Date:</TabTitle>
                        <TabAnswer>{missionDetails.date}</TabAnswer>
                    </Tab>
                    <Tab>
                        <TabTitle>Mission Time:</TabTitle>
                        <TabAnswer>  {missionDetails.from} - {missionDetails.to}</TabAnswer>
                    </Tab>
                    <Tab>
                        <TabTitle>Branch Address:</TabTitle>
                        <TabAnswer>{missionDetails.branch}</TabAnswer>
                    </Tab>
                </CompanyInfo>
                <VisitorInfo>
                    <Tab>
                        <TabTitle>Visitor Name:</TabTitle>
                        <TabAnswer>{employee.name}</TabAnswer>
                    </Tab>
                    <Tab>
                        <TabTitle>Visitor Gender:</TabTitle>
                        <TabAnswer>{employee.gender}</TabAnswer>
                    </Tab>
                    <Tab>
                        <TabTitle>Visitor phone:</TabTitle>
                        <TabAnswer>{employee.phone}</TabAnswer>
                    </Tab>
                    <Tab>
                        <TabTitle>Visitor email:</TabTitle>
                        <TabAnswer>{employee.email}</TabAnswer>
                    </Tab>
                </VisitorInfo>
            </BasicInfo>

            <Section>{t("text.OVERALL_PERFORMANCE")}</Section>

            <OverallPerformance>
                <LogoContainer>
                    <RateContainer>
                        <Rating name="half-rating" defaultValue={missionDetails.visitorGeneralRate}  readOnly style = {{direction : "ltr" , fontSize : "50px"}} precision={0.5}/>
                        <Notes> {missionDetails.generalNote} </Notes>
                    </RateContainer>
                    <PerformanceRate>
                        <YourPerformance> {t("text.visitor_Rating")} </YourPerformance>
                        <Rate>{missionDetails.visitorGeneralRate * 20 } %</Rate>
                    </PerformanceRate>
                </LogoContainer>
                <PerformanceContainer>
                    <ScaleDiv>
                        {
                            removeQum(missionAnswer?.rate)>=85 ? <img src = {excellentScale} style = {{ width  : "300px"}}/> :
                            removeQum(missionAnswer?.rate)>=75 ? <img src = {goodScale} style = {{ width  : "300px"}}/> :
                            removeQum(missionAnswer?.rate)>=50 ? <img src = {normalScale} style = {{ width  : "300px"}}/> :
                            <img src = {badScale} style = {{ width  : "300px"}}/> 
                            
                        }
                        
                    </ScaleDiv>
                    <PerformanceRate>
                        <YourPerformance> {t("text.YOUR_PERFORMANCE")} </YourPerformance>
                        <Rate>{convert(missionAnswer?.rate)} </Rate>
                    </PerformanceRate>
                </PerformanceContainer>
            </OverallPerformance>
            <Section>{t("text.SECTION_SUMMARY")} </Section>
            <SummaryDiv>
                {missionAnswer?.steps.map((step , index) => {
                    return (
                        <>
                        <StepSummary key = {index}>
                            <StepName>{step.name}</StepName>
                            <StepRate>
                                <PercentageDiv style = {{width : convert(step.rate)}}>
                                    <Percentage>{convert(step.rate)}</Percentage>
                                </PercentageDiv>
                            </StepRate>
                        </StepSummary>
                        
                        </>
                    )
                    } 
                )}
            </SummaryDiv>
        </MainInformation>

        <StepsDetails>
            {/* <HeaderTable>
                <Tr style = {{backgroundColor :"#3734ca42"}}>
                    <Td style = {{ fontWeight : "bold", fontSize : "20px" , }}>{t("text.OVERALL_PERFORMANCE")}</Td>
                    <TdCenter style = {{ fontSize : "25px" , fontWeight : "bold" }}>{missionAnswer?.rate} %</TdCenter>
                </Tr>
            </HeaderTable> */}
            {missionAnswer?.steps?.map((step , index) => {
                return (
                    <>
                        
                        <StepTable key = {index}>
                            <Tr >
                                <Td style = {{fontWeight : "bold" , backgroundColor : "#3734ca42" }} >{step.name}</Td>
                                <TdCenter style = {{ fontWeight : "bold" ,backgroundColor : "#3734ca42" }}>{convert(step.rate)}</TdCenter>
                            </Tr>
                            {step.questions?.map((question , index) => {

                                if (question.type !== "uploadImages" && question.type !== "headLine" && question.type !== "open") {
                                    return (
                                        <Tr key = {index}>
                                        <Td >{question.title}</Td>
                                        { question.type !== "multiChoice" ?
                                            <TdCenter>{question.answer}</TdCenter> : 
                                            <TdCenter>
                                                {question.answer.map((answer , index) => {
                                                    return (
                                                        <div key = {index}>{answer}</div>
                                                    )
                                                })}
                                            </TdCenter>
                                        }
                                    </Tr>
                                    )
                                }
                                
                            }
                            )}
                            {/* {comments[index]?.length>0 ? 
                                <>
                                <div style = {{fontWeight : "bold" , paddingLeft : "10px"}}>{t("text.Comments")}</div>
                                    {comments[index].map((comment , index) => {
                                        return (
                                            <>

                                            <Box >
                                                <PaddingDiv key = {index}>{comment.title}  </PaddingDiv>
                                                <PaddingDiv key = {index}> {comment.answer}</PaddingDiv>
                                                <Divider/>
                                            </Box>
                                            </>
                                        )
                                    })}
                                </>
                            : null} */}
                        </StepTable>

                    </>
                )
                }
            )}
        </StepsDetails>
        <Box>
            { pics.map((pic , index) => {
                return (
                    <PicsDiv key = {index}>
                        {/* <div>{pic.title}</div> */}
                        <img src = {pic.answer} style = {{height : "85%" , width : "70%"}}/>
                    </PicsDiv>
                )
            })
            }
        </Box>
    </PrintDiv>
  )
}

export default PrintingDiv