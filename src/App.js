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


function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element = <Login/>  />
        <Route path='/enter-phone' element = <EnterPhone/>  />
        <Route path='/verify-phone' element = <VerifyPhone/>  />
        <Route path='/enter-data' element = <EnterData/>  />
        <Route path='/review' element = <Review/>  />
        {/* layout  */}
        <Route path='/dashboard' element = <Layout /> >
        </Route>
      </Routes>

    </>
    
  );
}

export default App;

































