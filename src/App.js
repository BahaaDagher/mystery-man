import { Navigate, Route, Router, Routes  ,Switch, useNavigate } from 'react-router-dom';
import Layout from './layouts/Layout' ;
import Navbar from './layouts/Navbar';
import Login from './Auth/Login/Login';
import { useEffect } from 'react';
import { useTheme } from '@emotion/react';
import EnterData from './Auth/Register/EnterData';
import Review from './Auth/Register/Review';
import EnterPhone from './Auth/Register/EnterPhone';
import VerifyPhone from './Auth/Register/VerifyPhone';
import Home from './pages/home/Home';
import Profile from "./pages/profile/Profile";
import Map from './components/Map';
import NewBranch from './pages/profile/NewBranch';
import Bahaa from './components/Bahaa';
import Questionnaires from './pages/questionnaires/Questionnaires';
import Missions from './pages/missions/Missions';
import NewMission from './pages/missions/newMission/NewMission';
import ReviewMissionRequest from './pages/missions/reviewMissionRequest/ReviewMissionRequest';
import Chat from './pages/chat/Chat';
import i18n from './i18n';
import ProtectAuth from './protected/ProtectAuth';
import ViewDetails from './pages/missions/viewMissionDetailes/ViewDetails';
import NavbarContainer from './components/NavbarContainer';


function App() {
  const theme = useTheme() ;
  useEffect(() => {
    if (localStorage.getItem("language") == "ar") {
      i18n.changeLanguage("ar");
      theme.direction = "rtl" ;
    }
    else {
      theme.direction = "ltr" ;
      i18n.changeLanguage("en");
    }
  } , [localStorage.getItem("language")])

  const navigate = useNavigate() ;
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
  },[])

  return (
    <>
      <Routes>
        <Route path='/bahaa' element = <NavbarContainer/>  />
        <Route path='/login' element = {<ProtectAuth> <Login/> </ProtectAuth>}  />
        <Route path='/register/enter-phone' element = <EnterPhone/>  />
        <Route path='/register/verify-phone' element = <VerifyPhone/>  />
        <Route path='/register/enter-data' element = <EnterData/>  />
        <Route path='/register/review' element = <Review/>  />
        <Route path='/profile' element = <Profile/> />
        <Route path='/newBranch' element = <NewBranch/> />
        <Route path='/map' element = <Map/>  />
        <Route path='/chat' element = <Chat/>  />
        <Route path="/" element=<Layout /> />
        
        {/* layout */}
        <Route path='/dashboard' element = <Layout /> >
          <Route path='home' element = <Home/>  />
          <Route path='questionnaires' element = <Questionnaires/>  />
          <Route path='missions' element = <Missions/>  />
          <Route path='missions/newMission' element = <NewMission/> />  
          <Route path='missions/waitRequests/viewMissions' element = <ReviewMissionRequest/> /> 
          <Route path='missions/viewMissions' element = <ReviewMissionRequest/> /> 
          <Route path='missions/viewDetails/:id' element = <ViewDetails/> /> 

        </Route>
      </Routes>

    </>
    
  );
}

export default App;

































