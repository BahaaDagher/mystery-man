import styled from '@emotion/styled';
import { BarChart } from '@mui/x-charts';
import React from 'react'
const Parent = styled("div")(({ theme }) => ({
    // border : "1px solid blue" , 
}));
const Header = styled("div")(({ theme }) => ({

}));
const Title = styled("div")(({ theme }) => ({
    
}));
const Report = () => {
  return (
    <>
        <Parent>
            <Header>
                <Title>Branches Report</Title>
            </Header>
            
        </Parent>
    </>
  )
}

export default Report