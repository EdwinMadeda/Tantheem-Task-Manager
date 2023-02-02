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
import SingleSubTask from "./features/tasks/SingleSubTask";

import SingleProject from "./features/projects/SingleProject";
import SingleDeliverable from "./features/projects/SingleDeliverable";

import SingleTeam from "./features/teams/SingleTeam";

import AddTask from "./features/tasks/addOrEdit/AddTask";
import EditTask from "./features/tasks/addOrEdit/EditTask";
import AddSubTask from "./features/tasks/addOrEdit/AddSubTask";
import EditSubTask from "./features/tasks/addOrEdit/EditSubTask";

import AddProject from "./features/projects/addOrEdit/AddProject";
import EditProject from "./features/projects/addOrEdit/EditProject";
import AddDeliverable from "./features/projects/addOrEdit/AddDeliverable";
import EditDeliverable from "./features/projects/addOrEdit/EditDeliverable";

import AddTeam from "./features/teams/addOrEdit/AddTeam";
import EditTeam from "./features/teams/addOrEdit/EditTeam";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/search" element={<Search />} />

        <Route path="/mytasks">
          <Route index element={<Tasks />} />
          <Route path=":taskId" element={<SingleTask />} />
          <Route path=":taskId/:subTaskId" element={<SingleSubTask />} />
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
          <Route
            path=":projectId/:deliverableId"
            element={<SingleDeliverable />}
          />
          <Route path=":projectId/add" element={<AddDeliverable />} />
          <Route
            path="/myprojects/:projectId/edit/:deliverableId"
            element={<EditDeliverable />}
          />
          <Route path="/myprojects/add" element={<AddProject />} />
          <Route path="/myprojects/edit/:projectId" element={<EditProject />} />
        </Route>

        <Route path="/calender" element={<Calender />} />

        <Route path="/teams">
          <Route index element={<Teams />} />
          <Route path=":teamId" element={<SingleTeam />} />
          <Route path="/teams/add" element={<AddTeam />} />
          <Route path="/teams/edit/:teamId" element={<EditTeam />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
