import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Navigate, Route, Router, Routes  ,Switch, useLocation, useNavigate } from 'react-router-dom';
import Layout from './layouts/Layout' ;
import Navbar from './layouts/Navbar';
import Login from './Auth/Login/Login';
import { useEffect } from 'react';
import { useTheme } from '@emotion/react';
import EnterData from './Auth/Register/EnterData';
import Review from './Auth/Register/Review';
import EnterPhone from './Auth/forgetPassword/ForgetPassword';
import VerifyPhone from './Auth/Register/VerifyEmail';
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
import { useSelector } from "react-redux";
import EditProfile from "./pages/profile/EditProfile";
import MysteryProfile from "./pages/missions/mysteryProfile/MysteryProfile";
import Subscription from "./pages/subscription/Subscription";
import ForgetPassword from "./Auth/forgetPassword/ForgetPassword";
import VerifyEmail from "./Auth/Register/VerifyEmail";
import OtpPassword from "./Auth/forgetPassword/OtpPassword";
import ChangePassword from "./Auth/forgetPassword/ChangePassword";
import Home2 from "./pages/home/Home2";
import Reports from "./pages/reports/Reports";

function App() {
  const missionDetails = useSelector(state => state.missionData.missionDetails)
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

    const language = localStorage.getItem('language');
    const root = document.documentElement; // Access the root element
    if (language === 'en') {
      // root.style.setProperty('--app-font-family', "'Roboto', sans-serif");
      root.style.setProperty('--app-font-family', "'Cairo', sans-serif");
    } else if (language === 'ar') {
      root.style.setProperty('--app-font-family', "'Noto Sans Arabic', sans-serif");
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
        <Route path='/bahaa' element = <Bahaa/>  />
        <Route path='/login' element = {<ProtectAuth> <Login/> </ProtectAuth>}  />
        <Route path='/forgetPassword' element = <ForgetPassword/>  />
        <Route path='/forgetPassword/OtpPassword' element = <OtpPassword/>  />
        <Route path='/forgetPassword/changePassword' element = <ChangePassword/>  />
        <Route path='/register/VerifyEmail' element = <VerifyEmail/>  />
        <Route path='/register/enter-data' element = <EnterData/>  />
        <Route path='/register/review' element = <Review/>  />
        <Route path='/profile' element = <Profile/> />
        <Route path='/newBranch' element = <NewBranch/> />
        <Route path='/map' element = <Map/>  />
        <Route path='/chat' element = <Chat/>  />
        <Route path="/" element=<Layout /> />
        
        {/* layout */}
        <Route path='/userDashboard' element = <Layout /> >
          <Route path='editProfile' element = <EditProfile/>  />
          {/* <Route path='home' element = <Home/>  /> */}
          <Route path='home' element = <Home2/>  />
          <Route path='questionnaires' element = <Questionnaires/>  />
          <Route path='missions' element = <Missions/>  />
          <Route path='missions/newMission' element = <NewMission/> />  
          <Route path='missions/waitRequests/viewMissions' element = <ReviewMissionRequest/> /> 
          <Route path='missions/viewMissions' element = <ReviewMissionRequest/> /> 
          <Route path='missions/viewDetails/:id' element = <ViewDetails missionDetails={missionDetails}/> /> 
          <Route path='subscription' element = <Subscription/> /> 
          <Route path='reports' element = <Reports/> /> 

        </Route>
      </Routes>

    </>
    
  );
}

export default App;

































