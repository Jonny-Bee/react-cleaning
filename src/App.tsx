
import './App.css';
import CalenderView from './components/calender-view/calender-view';
import LayoutView from './components/layout-view/layout-view';
import LocationView from './components/location-view/location-view';
import SheduleView from './components/schedule-view/schedule-view';

import {  Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/home/home';
import NavigationBar from './components/routes/navigation/navigation.route';
import WeeklyView from './components/weekly/weekly-view';

import { UserContext } from './contexts/user-context/user-context';
import { useContext } from 'react';
const App = ()=> {
  const {user} = useContext(UserContext);
  return(
    <Routes>
      <Route path='/' element = {<NavigationBar />}>
          <Route index element={<Home/>}/>
          <Route path='schedule/*' element={user.hash === undefined ?<Navigate to="/" /> :<SheduleView/>}/>
          <Route path='calender/*' element={user.hash === undefined ?<Navigate to="/" /> : <CalenderView/>}/>
          <Route path='layouts/*' element={user.hash === undefined ?<Navigate to="/" /> :<LayoutView/>}/>
          <Route path='locations/*' element={user.hash === undefined ?<Navigate to="/" /> :<LocationView/>}/> 
          <Route path='weekly/*' element={user.hash === undefined ?<Navigate to="/" /> :<WeeklyView/>}/> 
          
      </Route>
    </Routes>
   
  );
}

export default App;
