import { Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout' ;
import Navbar from './layouts/Navbar';
import Login from './Auth/Login/Login';
import { useEffect } from 'react';
import { useTheme } from '@emotion/react';
import EnterData from './Auth/Register/EnterData';
import Review from './Auth/Register/Review';
import EnterPhone from './Auth/Register/EnterPhone';
import VerifyPhone from './Auth/Register/VerifyPhone';
import Bahaa from './components/Bahaa';
import Home from './pages/home/Home';


function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element = <Login/>  />
        <Route path='/register/enter-phone' element = <EnterPhone/>  />
        <Route path='/register/verify-phone' element = <VerifyPhone/>  />
        <Route path='/register/enter-data' element = <EnterData/>  />
        <Route path='/register/review' element = <Review/>  />
        {/* layout  */}
        <Route path='/dashboard' element = <Layout /> >
          <Route path='home' element = <Home/>  />
        </Route>
      </Routes>

    </>
    
  );
}

export default App;

































