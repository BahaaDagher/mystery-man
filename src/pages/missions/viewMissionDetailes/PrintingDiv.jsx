import React, { useEffect, useState } from 'react'
import { Colors } from '../../../Theme';
import styled from '@emotion/styled';
import { FlexSpaceBetween } from '../../../components/FlexSpaceBetween';
import { FlexCenter } from '../../../components/FlexCenter';
import logo from "../../../assets/images/MaknonLogo2.svg"
import diamond from "../../../assets/icons/diamond.svg"
import grayLogo from "../../../assets/images/grayLogo.svg"
import { Flex } from '../../../components/Flex';
import test from "../../../assets/images/test.png"
import { Box, Rating, colors, hexToRgb } from '@mui/material';
import { useTranslation } from 'react-i18next';
import badScale from "../../../assets/images/badScale.svg"
import goodScale from "../../../assets/images/goodScale.svg"
import normalScale from "../../../assets/images/normalScale.svg"
import excellentScale from "../../../assets/images/excellentScale.svg"
import PieChartComponent from "../../../components/PieChartComponent";
import four from "../../../assets/images/4.png" 
import { useSelector } from 'react-redux';
import { getColorBasedOnPercentage } from '../../../utils/colorPercentageUtils';
import HorizontalBarChart from './HorizontalBarChart';
import DoughnutComponent from '../../../components/DoughnutComponent';


const PrintDiv = styled("div")(({ theme }) => ({
    padding : "30px 50px" , 
    backgroundColor : "#fff", 
    minWidth : "800px" , 
    overflow : "auto" ,
    direction : theme.direction , 
    "& *": {
        fontFamily: "'Tajawal', sans-serif !important",
    },
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
    flexDirection : "column" ,  
}));
const TabTitle = styled("div")(({ theme }) => ({
    fontWeight : "bold" ,
    color :Colors.main7 , 
    fontSize : "25px" ,
}));
const TabAnswer = styled("div")(({ theme }) => ({
    // margin : theme.direction === "rtl" ? "0 10px 0 0" : "0 0 0 10px" ,
    color :Colors.main7,
    fontSize : "18px" ,
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
    // width :"100px" , 
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
    // backgroundColor : Colors.lightGray ,
    // padding  :"85px 50px" , 
    // direction : "ltr" , 
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


const GeneralRating = styled("div")(({ theme }) => ({
    display : "flex" ,
    // flexDirection : "column" ,
    justifyContent : "space-between" ,
    alignItems : "center" ,
    fontSize :"20px" , 
    marginBottom : "20px" ,

}));
const RatingTitle = styled("div")(({ theme }) => ({
    fontSize : "70px" , 
    fontWeight : "700" ,
    color : Colors.main

}));
const RatingTitle2 = styled("div")(({ theme }) => ({
    fontSize : "45px" , 
    fontWeight : "700" ,
    color : Colors.main

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

const RatingScore = styled("div")(({ theme, bg }) => ({
    backgroundColor : bg || "#0f4ce8" , 
    fontWeight : "bold" , 
    color : "#fff" , 
    display :"flex" , 
    justifyContent : "center" , 
    alignItems : "center" , 
    fontSize : "50px" ,     
    padding : "0px 30px", 
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
const NotAnswer = styled(FlexCenter)(({ theme }) => ({
    border : `1px solid ${Colors.gold}` ,
    padding :"5px" , 
    flexDirection : "column" ,
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
    width : "45%" , 
    height:'50%',
    padding : "10px" , 
    border : `1px solid ${Colors.gold}` ,
    margin :"auto" , 
    marginTop :"10px"  , 
}));
const Divisor = styled("div")(({ theme }) => ({
    width : "100%" , 
    height:'2px',
    background : '#0000000D' , 
    margin :"auto" , 
    margin :"10px"  , 
}));
// const StepQuestions = styled("div")({
//   marginTop: "30px",
// });

const QuestionRow = styled("div")(({ index }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 20px",
  backgroundColor: index % 2 === 0 ? Colors.main9 : "#FFFFFF",
//   borderBottom: "1px solid #E0E0E0",
}));

const QuestionText = styled("div")({
  fontWeight: "600",
  fontSize: "18px",
  color: "#2C3E50",
  width: "60%",
});

const AnswerBox = styled("div")({
  fontWeight: "500",
  fontSize: '20px',
  color: Colors.main7,
  fontWeight: 700,
  minWidth: "150px",
});

/* headline */
const HeadLine = styled("div")({
  fontSize: "24px",
  fontWeight: "700",
  margin: "40px 0 20px 0",
  padding: "15px 20px",

//   textAlign: "center",
//   color: "#1F3A8A",
});

/* images */
const ImagesGrid = styled("div")({
  display: "flex",
  gap: "25px",
  flexWrap: "wrap",
  marginTop: "20px",
  justifyContent: "center",
});

const ImageFrame = styled("div")({
  backgroundColor: Colors.main8,
  padding: "10px",
  borderRadius: "6px",
  width: "30%",
  display: "flex",
  justifyContent: "center",
});

const StyledImage = styled("img")({
  width: "100%",
  height: "auto",
  objectFit: "cover",
  borderRadius: "4px",
});

const PrintingDiv = ({missionDetails , missionAnswer}) => {

    const profileData = useSelector((state) => state.profileData?.getProfileData);
    const rateValue = parseFloat(missionAnswer?.rate?.replace(',', '.') || 0);
    const rateColor = getColorBasedOnPercentage(rateValue, profileData);


    const convert = (str) => {
        if (!str) return "0%";   

        return str.toString().replace(",", ".") + "%";
    };
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
                <div className="w-[80%] flex flex gap-10 ">
                    <div className='flex flex-col  gap-10'>
                        <Tab>
                            <TabTitle>{t("text.VisitorName")}:</TabTitle>
                            <TabAnswer>{employee.name} </TabAnswer>
                        </Tab>
                        <Tab>
                            <TabTitle>{t("text.MissionDate")}:</TabTitle>
                            <TabAnswer>{missionDetails.date}</TabAnswer>
                        </Tab>
                    </div>  
                    <div className='flex flex-col gap-10'>
                        <Tab>
                            <TabTitle>{t("text.CompanyName")}:</TabTitle>
                            <TabAnswer>{missionDetails.companyName}</TabAnswer>
                        </Tab>
                        <Tab>
                            <TabTitle>{t("text.MissionTime")}:</TabTitle>
                            <TabAnswer >  <div dir="ltr">{missionDetails.from} - {missionDetails.to}</div></TabAnswer>
                        </Tab>
                    </div> 
                    <div className='flex flex-col gap-10'>
                        <Tab>
                            <TabTitle>{t("text.BranchAddress")}:</TabTitle>
                            <TabAnswer>{missionDetails.branch}</TabAnswer>
                        </Tab>
                    </div> 
                </div>
                <div className="w-[20%]">
                    <EmployeeImage src = {missionDetails.companyimage} alt = "company img"/>
                </div>
            </SecondLine>
            <Divisor/>
            <AllRating>
                <div className='flex gap-5 items-center mb-[50px]' >
                    <img src={diamond} alt="diamond" width={30} height={30}/>
                    <RatingTitle>{t("text.General_Rating")} </RatingTitle>
                    <img src={diamond} alt="diamond" width={30} height={30}/>
                </div>
                <div className="flex justify-around items-center">
                    <div className="relative ">
                        <PieChartComponent
                            chartData={{
                                labels: [t('text.Rate'), ''],
                                datasets: [
                                    {
                                        data: [
                                            parseFloat(missionAnswer?.rate?.replace(',', '.') || 0),
                                            100 - parseFloat(missionAnswer?.rate?.replace(',', '.') || 0)
                                        ],
                                        backgroundColor: [Colors.main, '#fff'],
                                        borderWidth: 0,
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    legend: { display: false },
                                    tooltip: { enabled: false },
                                    datalabels: { display: false }
                                },
                                maintainAspectRatio: false,
                            }}
                            size={250}
                        >
                        </PieChartComponent>
                        
                      <div className=" font-light text-[36px] leading-none tracking-normal text-center text-main absolute top-[10px] left-[-110px] ">
                        {convert(missionAnswer?.rate)}
                      </div>
                    </div>
                    <div>
                        <RatingScore bg={rateColor}>
                            {
                                removeQum(missionAnswer?.rate)>=75 ? <div>{t("text.excellent")}</div> :
                                removeQum(missionAnswer?.rate)>=50 ? <div>{t("text.good")}</div> :
                                removeQum(missionAnswer?.rate)>=25 ? <div>{t("text.natural")}</div> :
                                <div>{t("text.bad")}</div>
                            }
                        </RatingScore>
                    </div>
                </div>
                <div className="w-[70%] m-auto">
                    <HorizontalBarChart steps={missionAnswer?.steps} profileData={profileData} />
                </div>

            </AllRating>

        </Header>
        <StepsDetails>
            {missionAnswer?.steps?.map((step , index) => {
                return (
                    <>
                         {/* StepBar StepName  StepRate StepQuestions  StepQuestionAnswer */}
                        <div key={index} style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
                            {(() => {
                                const stepRateValue = parseFloat(step?.rate?.replace(',', '.') || 0);
                                const stepColor = getColorBasedOnPercentage(stepRateValue, profileData);
                                return (
                                    <div className="flex justify-around mb-[150px]">
                                        <div className="flex w-[60%] flex-col justify-center items-center gap-5">
                                            <div className='flex gap-5 items-center '>
                                                <img src={diamond} alt="diamond" width={20} height={20} />
                                                <RatingTitle2>{step.name} </RatingTitle2>
                                                <img src={diamond} alt="diamond" width={20} height={20} />
                                            </div>
                                            <div
                                                className="text-white pr-2 pl-2 text-[35px]  w-fit"
                                                style={{ backgroundColor: Colors.main }}
                                            >
                                                20 / 10
                                            </div>
                                        </div>
                                        <div className="w-[40%] flex justify-center items-center">
                                            <DoughnutComponent
                                                chartData={{
                                                    labels: [t('text.Rate'), ''],
                                                    datasets: [
                                                        {
                                                            data: [
                                                                stepRateValue,
                                                                100 - stepRateValue
                                                            ],
                                                            backgroundColor: [stepColor, 'transparent'],
                                                            borderWidth: 0,
                                                        },
                                                    ],
                                                }}
                                                options={{
                                                    plugins: {
                                                        legend: { display: false },
                                                        tooltip: { enabled: false },
                                                        datalabels: { display: false }
                                                    },
                                                    maintainAspectRatio: false,
                                                    cutout: '88%',
                                                }}
                                                doughnutSize={230}
                                                content={{
                                                    value: convert(step.rate),
                                                    contentDimensions: 150,
                                                    contentFontSize: 40,
                                                    color: Colors.main7,
                                                    fontFamily: 'Tajawal',
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })()}
                           
                           <StepQuestions>
                            {step.questions?.map((question, index) => {

                                /* ===== HEADLINE ===== */
                                // if (question.type === "headLine") {
                                // return (
                                //     <HeadLine key={index}>
                                //     {question.title}
                                //     </HeadLine>
                                // );
                                // }

                                /* ===== UPLOAD IMAGES ===== */
                                if (question.type === "uploadImages") {
                                return (
                                    <div key={index}>
                                    <QuestionText style={{ marginBottom: "15px" }}>
                                        <div className='flex text-main7 py-[15px] px-[20px] font-extrabold text-[30px] leading-[100%] tracking-normal text-right' >
                                            {question.title}
                                        </div>
                                    </QuestionText>

                                    {question.answer && question.answer.length > 0 ? (
                                        <ImagesGrid>
                                        {question.answer.map((img, i) => (
                                            <ImageFrame key={i}>
                                            <StyledImage src={img} alt="uploaded" />
                                            </ImageFrame>
                                        ))}
                                        </ImagesGrid>
                                    ) : (
                                        <AnswerBox>N/A</AnswerBox>
                                    )}
                                    </div>
                                );
                                }

                                /* ===== NORMAL QUESTIONS ===== */
                                const renderAnswer = () => {
                                if (!question.answer) return "N/A";

                                switch (question.type) {
                                    case "yesOrNo":
                                    return t(`text.${question.answer}`);

                                    case "rating":
                                    return (
                                        <Rating
                                        value={question.answer}
                                        readOnly
                                        precision={0.5}
                                        style={{ direction: "ltr", fontSize: "20px" }}
                                        />
                                    );

                                    case "SingleChoice":
                                    return question.answer;

                                    case "multiChoice":
                                    return question.answer.join(" - ");

                                    case "open":
                                    return question.answer;
                                    
                                    case "headLine":
                                    return question.answer;

                                    default:
                                    return "N/A";
                                }
                                };

                                return (
                                <QuestionRow key={index} index={index}>
                                    <QuestionText>{question.title}</QuestionText>
                                    <AnswerBox>{renderAnswer()}</AnswerBox>
                                </QuestionRow>
                                );
                            })}
                            </StepQuestions>
                            <div className='flex  bg-main h-[2px] w-full my-[100px]' >
                            </div>
                           
                        </div>

                    </>
                )
                }
            )}
        </StepsDetails>
        <div className='flex flex-col justify-center items-center bg-main  w-full p-5' >
                 <LogoDiv>
                    <Image src = {grayLogo}/>
                </LogoDiv>
                <div className='font-light text-[32px]  text-white ' >بداية رحلتك للنجاح و مصدر ثقتك</div>
        </div>
    </PrintDiv>
  )
}

export default PrintingDiv