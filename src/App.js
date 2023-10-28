import { Route, Router, Routes  ,Switch } from 'react-router-dom';
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


function App() {
  
  return (
    <>
      <Routes>
        <Route path='/bahaa' element = <Bahaa/>  />
        <Route path='/login' element = <Login/>  />
        <Route path='/register/enter-phone' element = <EnterPhone/>  />
        <Route path='/register/verify-phone' element = <VerifyPhone/>  />
        <Route path='/register/enter-data' element = <EnterData/>  />
        <Route path='/register/review' element = <Review/>  />
        <Route path='/profile' element = <Profile/> />
        <Route path='/newBranch' element = <NewBranch/> />
        <Route path='/map' element = <Map/>  />
        <Route path="/" element=<Layout /> />
        {/* layout */}
        <Route path='/dashboard' element = <Layout /> >
          <Route path='home' element = <Home/>  />
          <Route path='questionnaires' element = <Questionnaires/>  />
          <Route path='missions' element = <Missions/>  />
          <Route path='newMission' element = <NewMission/>  />
        </Route>
      </Routes>

    </>
    
  );
}

export default App;

































