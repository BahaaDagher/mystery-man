import styled from '@emotion/styled';
import React from 'react'
import { Colors , Dimensions} from '../Theme';
import Sidebar from './sidebar/Sidebar';
import Navbar from './Navbar';

const Parent = styled("div")(({ theme }) => ({
  backgroundColor: Colors.body , 
  minHeight : "100vh" ,
  display: 'flex',
}));

const Content = styled("div")(({ theme }) => ({
  width : `calc(100vw - ${Dimensions.sidebarWidth} - 60px )` ,
  position: "relative",
  left : "290px" ,
  zIndex : "1" ,
  [theme.breakpoints.down('1200')]: {
    width : `calc(100vw  - 20px )` ,
    marginLeft : "10px" ,
    left : 0  , 
  },
}));

const MainContent = styled("div")(({ theme }) => ({
  marginTop : "85px" ,
  // border : "1px solid red" ,
  zIndex : "-1" ,
  borderRadius: '10px', 
}));



const Layout = () => {
  return (
    <Parent>
      <Sidebar/>
      <Content>
        <Navbar/>
        <MainContent>
          <div>hello from the main content </div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
          <div>hello from bahaaa dagher</div>
        </MainContent>
      </Content>
    </Parent>
  )
}

export default Layout