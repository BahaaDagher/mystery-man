import React, { useEffect, useState } from 'react'
import { SmallContainer } from '../../../components/SmallContainer'
import styled from '@emotion/styled';
import { Colors } from '../../../Theme';
import { useDispatch, useSelector } from 'react-redux';
import { getBranches } from '../../../store/slices/branchSlice';
import { MenuItem, Select } from '@mui/material';


const Parent = styled(SmallContainer)(({ theme }) => ({
  backgroundColor: "#fff",
  height: "100vh",
  borderRadius: "10px",
  padding : "15px"
}));
const TitleDiv = styled("div")(({ theme }) => ({
}));
const Title = styled("div")(({ theme }) => ({
  fontSize: "18px",
}));
const Input = styled("input")(({ theme }) => ({
  width : "100%" , 
  height: '68px', 
  padding: '15px',
  borderRadius: '10px',
  border: `1px solid ${Colors.input}`,
  outline: 'none', 
  fontSize : "16px",
  "&.small" : {
    width : "425px" , 
    maxWidth:'100%', 
    height: '48px', 
  }
  
}));
const Divider = styled("div")(({ theme }) => ({
  height: "1px",
  backgroundColor: Colors.input,
  margin: "20px 0",
  width : "100%"
}));
const Selectt = styled(Select)(({ theme }) => ({
  width : "425px" , 
  height: '48px', 
  maxWidth:'100%', 
  outline: 'none',
  border: `1px solid ${Colors.input}`,
  borderRadius: '10px',
  "&:hover" : {
    border: `1px solid ${Colors.input}`,
  },
  fontFamily : "Cairo" ,
}));
const StyledMenuItem = styled(MenuItem)({
  fontFamily: 'Cairo', 
});
const DateTime = styled("div")({

});
const NewMission = () => {

  const [currentBranches , setCurrentBranches] = useState ([])

  const getBranchesData = useSelector(state => state.branchData.getBranchesData) ;
  useEffect(()=>{
    if (getBranchesData.status) {
      setCurrentBranches(getBranchesData.data.branches)
    }
  },[getBranchesData])
  const dispatch = useDispatch() ;
  useEffect(() => {
    dispatch(getBranches())
  }, [])

  const [selectedBranch, setSelectedBranch] = useState('');
  const handleSelectedBranch = (event) => {
    setSelectedBranch(event.target.value);
  };

  // date and time 
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };
  const [value, setValue] = useState(Date | null) ;
  const [startDate, setStartDate] = useState(new Date());
  return (
    <Parent>
      <TitleDiv>
          <Title>Title</Title>
          <Input placeholder='here'/>
      </TitleDiv>
      <Divider/>
      <TitleDiv>
          <Title>type what you want he/she to focus on!</Title>
          <Input placeholder='here' className='small'/>
      </TitleDiv>
      <Divider/>
      <TitleDiv>
          <Title>Branch</Title>
          <Selectt
            value={selectedBranch}
            onChange={handleSelectedBranch}
          >
            {currentBranches.map((branch, index) => (
              <StyledMenuItem key={index} value={branch.id}>
                {branch.name}
              </StyledMenuItem>
            ))}
        </Selectt>
      </TitleDiv>
      <Divider/>
      <DateTime>
      
      </DateTime>
      <Divider/>
    </Parent>
  )
}

export default NewMission