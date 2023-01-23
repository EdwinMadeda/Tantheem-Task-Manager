import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './features/home/Home';
import Tasks from './features/tasks/Tasks';
import Projects from './features/projects/Projects';
import Calender from './features/calendar/MyCalendar';
import Teams from './features/teams/Teams';
import SingleProject from './features/projects/SingleProject';
import SingleTeam from './features/teams/SingleTeam';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path='/mytasks' element={<Tasks />}/>

          <Route path='/myprojects'>
              <Route index element={<Projects />}/>
              <Route path=":projectId" element={<SingleProject/>}/>
          </Route>

          <Route path='/calender' element={<Calender />}/>

          <Route path='/teams'>
              <Route index element={<Teams />}/>
              <Route path=":teamId" element={<SingleTeam/>}/>
          </Route>


        </Route>
      </Routes>
  );
}

export default App;
