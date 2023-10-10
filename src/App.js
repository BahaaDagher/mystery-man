import { Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout' ;
import Navbar from './layouts/Navbar';
import Login from './Auth/Login/Login';
function App() {
  return (
    <>
      {/* <Layout/> */}
      <Login/>
    </>
    
  );
}

export default App;
