import { Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout' ;
import Navbar from './layouts/Navbar';
import Login from './Auth/Login/Login';
import { useEffect } from 'react';
import { useTheme } from '@emotion/react';


function App() {
  return (
    <>
      {/* <Login/> */}
      <Layout/>
    </>
    
  );
}

export default App;
