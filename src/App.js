import { Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout' ;
import Navbar from './layouts/Navbar';
import Login from './Auth/Login/Login';
import { useEffect } from 'react';
import { useTheme } from '@emotion/react';
import EnterData from './Auth/Register/EnterData';
import Review from './Auth/Register/Review';


function App() {
  return (
    <>
      {/* <Login/> */}
      {/* <Layout/> */}
      {/* <EnterData/> */}
      <Review/>
    </>
    
  );
}

export default App;
