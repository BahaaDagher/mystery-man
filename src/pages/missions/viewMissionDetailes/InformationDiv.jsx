import styled from '@emotion/styled';
import React from 'react'
import { Colors } from '../../../Theme';
import { SubmitButton } from '../../../components/SubmitButton';
import Map from '../../../components/Map';
import { Flex } from '../../../components/Flex';
import location2 from "../../../assets/icons/location2.svg"
import clock from "../../../assets/icons/clock.svg"
import calendar from "../../../assets/icons/calendar.svg"
import { Rating } from '@mui/material';
import { FlexCenter } from '../../../components/FlexCenter';
const TitleDiv = styled("div")(({ theme }) => ({
}));
const Title = styled("div")(({ theme }) => ({
  fontSize: "18px",
  fontWeight :"500" , 
  marginBottom : "10px" ,
}));
const Text = styled("div")(({ theme }) => ({
    fontSize: "18px",
}));
const FocusThings = styled("div")(({ theme }) => ({
    width : "fit-content" ,
    maxWidth : "100%" ,
    padding: '5px 10px',
    overflow: 'auto',
    fontSize : "16px" ,
    color : Colors.second ,
    borderRadius: '10px',
    gap: '10px',
    backgroundColor: "#455A641A",
}));
  const Divider = styled("div")(({ theme }) => ({
    height: "1px",
    backgroundColor: Colors.input,
    margin: "20px 0",
    width : "100%"
  }));
  const DateTime = styled("div")(({ theme }) => ({
    display : "flex" , 
    justifyContent : "space-between" , 
    [theme.breakpoints.down('900')]: {
      flexDirection : "column" ,
      alignItems : "flex-start" ,
    } 
    
  }));
  const DateDiv = styled("div")(({ theme }) => ({
    height: "80px" ,
    borderRadius: "10px" , 
    border: "1px" ,
    [theme.breakpoints.down('900')]: {
      width: "50%" , 
    }, 
    [theme.breakpoints.down('500')]: {
      width: '100%',
    }
  }));
  const Date = styled("div")(({ theme }) => ({
    color : Colors.second ,
  }));
  const TimeDiv = styled("div")(({ theme }) => ({
    display : "flex" , 
    [theme.breakpoints.down('500')]: {
        alignItems : "flex-start" ,
      flexDirection : "column" , 
    }
  }));
  const FromToTimeDiv = styled("div")(({ theme }) => ({
    margin : "0 20px" ,
    [theme.breakpoints.down('900')]: {
      margin : theme.direction == "ltr" ? "0 20px 0 0" : "0 0  0 20px" ,
    }
  }));
  // voucher 
  const VoucherDiv = styled("div")(({ theme }) => ({
    display : "flex" , 
    [theme.breakpoints.down('500')]: {
      flexDirection : "column" , 
      alignItems : "flex-start" ,
    }
  }));
  const CheckDiv = styled("div")(({ theme }) => ({
    display : "flex" , 
    alignItems : "center" , 
    justifyContent : "center" ,
    margin : theme.direction == "ltr" ? "0 20px 0 0" : "0 0  0 20px" ,
    [theme.breakpoints.down('500')]: {
      margin : "0 0 15px 0" ,
    }
  }));
  const CheckInput = styled("input")(({ theme }) => ({
    width : "18px" , 
    height : "18px" ,
    accentColor: Colors.main , 
    margin : theme.direction == "ltr" ? "0 20px 0 0" : "0 0  0 20px" ,
  }));
  const CheckLabel = styled("label")(({ theme }) => ({
    fontSize : "14px" ,
    fontWeight : "500" , 
  }));
  const Voucher = styled("div")(({ theme }) => ({
    color : Colors.second ,
    fontSize : "16px" ,
    padding : "10px" ,
    fontWeight : "400" ,
  }));
  // notes 
  const NotesText = styled("textarea")(({ theme }) => ({
    height : "124px" , 
    padding: '10px',
    resize: 'none',
    width: '100%',
    borderRadius: '10px',
    border: `1px solid ${Colors.input}`,
    fontSize : "16px",
    outline: 'none', 
  }));

const Parent = styled("div")(({ theme }) => ({
    background  : "#fff" ,
    padding : "20px" , 
    marginBottom : "20px" ,
    borderRadius : "10px" , 
}));
const AddressDiv = styled("div")(({ theme }) => ({
    display : "flex" ,
}));
const Address = styled("div")(({ theme }) => ({
    color : Colors.second ,
}));
const Img = styled("img")(({ theme }) => ({
    margin : theme.direction == "ltr" ? "0 10px 0 0" : "0 0 0 10px" ,
}));
const LocationDiv = styled("div")(({ theme }) => ({
    width: '500px',
    height: '200px',
    borderRadius: '10px',
    marginTop :"20px" , 
    [theme.breakpoints.down('1250')]: {
        width: '100%',
    }
}));
const BranchRating = styled("div")(({ theme }) => ({
    fontSize: "30px",
    color : Colors.second ,
    // marginBottom : "20px" , 
}));
const Continer = styled("div")(({ theme }) => ({
    borderRadius: "10px",
    padding : "20px" , 
    marginBottom  : "20px" ,
    backgroundColor: "#fff",
    width : "100%" , 
    textAlign : "center" ,
}));
const Notes = styled("div")(({ theme }) => ({
    color : Colors.second , 
    fontSize : "18px" ,
    fontWeight : "600" 

}));
const QuestionsAnswers = styled("div")(({ theme }) => ({
    fontSize: "30px", 
    color : Colors.second , 
    // marginBottom : "10px" ,
    textAlign : "center" ,
}));
const InformationDiv = ({missionDetails}) => {
  return (
    <>
    
    <QuestionsAnswers> Mission Details </QuestionsAnswers>
    <Parent>
        <TitleDiv>
            <Title>Title</Title>
            <Text>{missionDetails.name}</Text>
        </TitleDiv>
        <Divider/>
        <TitleDiv>
            <Title>focus on!</Title>
            <FocusThings>{missionDetails.foucs}</FocusThings>  
        </TitleDiv>
        <Divider/>
        <TitleDiv>
            <Title>Branch</Title>
            <AddressDiv>
                <Img src = {location2} />
                <Address>{missionDetails.address}</Address>
            </AddressDiv>
            <LocationDiv>
                <Map  latPos = {parseFloat(missionDetails.lat)} lngPos = {parseFloat(missionDetails.long )} mapWidth={"100%"} mapHeight={"100%"} showSearch = {false}/>
            </LocationDiv>
        </TitleDiv>
        <Divider/>
        {/* date time section  */}
        <DateTime>
            <DateDiv>
                <Title>Date</Title>   
                <Flex>
                    <Img src = {calendar} />
                    <Date>{missionDetails.date }</Date>   
                </Flex>
            </DateDiv>
            <TimeDiv>
                <FromToTimeDiv>
                    <Title>from</Title>  
                    <Flex>
                        <Img src = {clock} />
                        <Date>{missionDetails.from}</Date>   
                    </Flex>
                </FromToTimeDiv>   
                <FromToTimeDiv>
                    <Title>to</Title>  
                    <Flex>
                        <Img src = {clock} />
                        <Date>{missionDetails.to}</Date>   
                    </Flex>
                </FromToTimeDiv>    
            </TimeDiv>
        </DateTime>
        <Divider/>
            <VoucherDiv>
            <CheckDiv>
            <CheckInput
                id='voucher'
                type="checkbox"
                defaultChecked={missionDetails.price >0}
                disabled
            />
            <CheckLabel htmlFor='voucher'>Include Purchase voucher</CheckLabel>
            </CheckDiv>
            {missionDetails.price >0 && <Voucher>{missionDetails.price} SAR</Voucher> }
            
            </VoucherDiv>
        <Divider/>
        <TitleDiv>
            <Title>Notes</Title>
            <Text>{missionDetails.notes}</Text>
        </TitleDiv> 
    </Parent>
    </>
  )
}

export default InformationDiv