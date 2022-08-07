import logo from './logo.svg';
import './App.css';
import CalenderView from './components/calender-view/calender-view';
import LayoutView from './components/layout-view/layout-view';
import LocationView from './components/location-view/location-view';
import SheduleView from './components/schedule-view/schedule-view';
import { Routes, Route } from 'react-router';

import Home from './components/home/home';
import NavigationBar from './components/routes/navigation/navigation.route';
import WeeklyView from './components/weekly/weekly-view';

const App = ()=> {
  return (
    <Routes>
      <Route path='/' element = {<NavigationBar />}>
          <Route index element={<Home/>}/>
          <Route path='schedule/*' element={<SheduleView/>}/>
          <Route path='calender/*' element={<CalenderView/>}/>
          <Route path='layouts/*' element={<LayoutView/>}/>
          <Route path='locations/*' element={<LocationView/>}/> 
          <Route path='weekly/*' element={<WeeklyView/>}/> 
          
      </Route>
    </Routes>
   
  );
}

export default App;
