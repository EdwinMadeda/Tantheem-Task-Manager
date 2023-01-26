import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './features/home/Home';
import Tasks from './features/tasks/Tasks';
import Projects from './features/projects/Projects';
import Calender from './features/calendar/MyCalendar';
import Teams from './features/teams/Teams';

import SingleTask from './features/tasks/SingleTask';
import SingleProject from './features/projects/SingleProject';
import SingleTeam from './features/teams/SingleTeam';

import AddOrEditTask from './features/tasks/AddOrEditTask';
import AddOrEditProject from './features/projects/AddOrEditProject';
import AddOrEditTeam from './features/teams/AddOrEditTeam';
import AddOrEditDeliverable from './features/projects/AddOrEditDeliverable';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          
          <Route path='/mytasks'>
            <Route index element={<Tasks />}/>
            <Route path=":taskId" element={<SingleTask/>}/>
            <Route path="/mytasks/add" element={<AddOrEditTask />}/>
            <Route path="/mytasks/edit/:taskId" element={<AddOrEditTask />}/>
          </Route>

          <Route path='/myprojects'>
              <Route index element={<Projects />}/>
              <Route path=":projectId" element={<SingleProject/>}/>
              <Route path=":projectId/add" element={<AddOrEditDeliverable />}/>
              <Route path="/myprojects/add" element={<AddOrEditProject />}/>
              <Route path="/myprojects/edit/:projectId" element={<AddOrEditProject />}/>
          </Route>

          <Route path='/calender' element={<Calender />}/>

          <Route path='/teams'>
              <Route index element={<Teams />}/>
              <Route path=":teamId" element={<SingleTeam/>}/>
              <Route path="/teams/add" element={<AddOrEditTeam />}/>
              <Route path="/teams/edit/:teamId" element={<AddOrEditTeam />}/>
          </Route>


        </Route>
      </Routes>
  );
}

export default App;
