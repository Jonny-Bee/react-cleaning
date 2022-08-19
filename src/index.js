import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CalenderProvider } from './contexts/calender-context/calender-context';
import { LayoutContextProvider } from './contexts/layout-context/layout-context';
import 'bootswatch/dist/lumen/bootstrap.min.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { LocationContextProvider } from './contexts/location-context/location-context';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/user-context/user-context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
    <CalenderProvider>
      <LayoutContextProvider>
        <LocationContextProvider>
        <App />
        </LocationContextProvider>
      </LayoutContextProvider>
    </CalenderProvider>
    </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
