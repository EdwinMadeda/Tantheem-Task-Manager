import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './features/home/Home';
import Tasks from './features/tasks/Tasks';
import Projects from './features/projects/Projects';
import Calender from './features/calender/Calender';
import Teams from './features/teams/Teams';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path='/mytasks' element={<Tasks />}/>
          <Route path='/myprojects' element={<Projects />}/>
          <Route path='/calender' element={<Calender />}/>
          <Route path='/teams' element={<Teams />}/>
        </Route>
      </Routes>
  );
}

export default App;
