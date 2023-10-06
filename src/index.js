import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  breakpoints: {
    values: {
      s : 500 , 
      xs: 650,
      sm: 850,
      md: 1000,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: "#1ab2f1",
    },
    mode: "light",
  },
  typography: {
    fontFamily: [
      "cairo",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  // typography: {
  //   fontSize: 16,
  // },
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
