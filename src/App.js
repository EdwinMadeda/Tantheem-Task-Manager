import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./features/home/Home";
import Tasks from "./features/tasks/Tasks";
import Projects from "./features/projects/Projects";
import Calender from "./features/calendar/MyCalendar";
import Teams from "./features/teams/Teams";
import Search from "./features/search/Search";

import SingleTask from "./features/tasks/SingleTask";
import SingleProject from "./features/projects/SingleProject";
import SingleTeam from "./features/teams/SingleTeam";

import AddTask from "./features/tasks/addOrEdit/AddTask";
import EditTask from "./features/tasks/addOrEdit/EditTask";
import AddSubTask from "./features/tasks/addOrEdit/AddSubTask";
import EditSubTask from "./features/tasks/addOrEdit/EditSubTask";

import AddOrEditProject from "./features/projects/AddOrEditProject";
import AddOrEditTeam from "./features/teams/AddOrEditTeam";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/search" element={<Search />} />

        <Route path="/mytasks">
          <Route index element={<Tasks />} />
          <Route path=":taskId" element={<SingleTask />} />
          <Route path=":taskId/:subTaskId" element={<SingleTask />} />
          <Route path="/mytasks/add" element={<AddTask />} />
          <Route path="/mytasks/edit/:taskId" element={<EditTask />} />
          <Route path=":taskId/add" element={<AddSubTask />} />
          <Route
            path="/mytasks/:taskId/edit/:subTaskId"
            element={<EditSubTask />}
          />
        </Route>

        <Route path="/myprojects">
          <Route index element={<Projects />} />
          <Route path=":projectId" element={<SingleProject />} />
          <Route path=":projectId/:deliverableId" element={<SingleProject />} />
          <Route path=":projectId/add" element={<AddOrEditProject />} />
          <Route
            path="/myprojects/:projectId/edit/:deliverableId"
            element={<AddOrEditProject />}
          />
          <Route path="/myprojects/add" element={<AddOrEditProject />} />
          <Route
            path="/myprojects/edit/:projectId"
            element={<AddOrEditProject />}
          />
        </Route>

        <Route path="/calender" element={<Calender />} />

        <Route path="/teams">
          <Route index element={<Teams />} />
          <Route path=":teamId" element={<SingleTeam />} />
          <Route path="/teams/add" element={<AddOrEditTeam />} />
          <Route path="/teams/edit/:teamId" element={<AddOrEditTeam />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
