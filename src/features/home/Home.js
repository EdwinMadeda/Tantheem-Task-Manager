import { useState, useReducer } from "react";
import { useSelector } from "react-redux";
import { selectAllTasks } from "../tasks/taskSlice";
import { selectAllProjects } from "../projects/projectsSlice";
import { selectAllTeams } from "../teams/teamsSlice";

import {
  orderByAlphabet,
  orderByDate,
  orderByPriority,
} from "../../customHooks/useOrderBy";

import studentImg from "../../assets/images/student_photo.png";
import AddBtn from "../../reusableComponents/AddBtn";
import OrderByBtnsWrapper from "../../reusableComponents/OrderByBtnsWrapper";

import RecentItems from "./RecentItems";
import "./Home.css";

const Home = () => {
  const rawTasks = Object.freeze(useSelector(selectAllTasks));
  const rawProjects = Object.freeze(useSelector(selectAllProjects));
  const rawTeams = Object.freeze(useSelector(selectAllTeams));

  const reducer = (state, action) => {
    switch (action.type) {
      case "orderByDate":
        return {
          ...state,
          tasks: orderByDate(rawTasks, "endDate"),
          projects: orderByDate(rawProjects, "endDate"),
          teams: orderByDate(rawTeams, "createdAt"),
        };

      case "orderByPriority":
        return {
          ...state,
          tasks: orderByPriority(rawTasks),
          projects: orderByPriority(rawProjects),
        };

      case "orderByAlphabet":
        return {
          ...state,
          tasks: orderByAlphabet(rawTasks, "name"),
          projects: orderByAlphabet(rawProjects, "name"),
          teams: orderByAlphabet(rawTeams, "name"),
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    tasks: orderByDate(rawTasks, "endDate"),
    projects: orderByDate(rawProjects, "endDate"),
    teams: orderByDate(rawTeams, "createdAt"),
  });

  const [isAsc, setIsAsc] = useState(false);
  const order = () => (isAsc ? "asc" : "desc");

  return (
    <section className="Home main">
      <div className="Home__Container top">
        <div className="Home__AddBtns">
          <AddBtn label="New Task" path="/mytasks/add" />
          <AddBtn label="New Project" path="/myprojects/add" />
          <AddBtn label="New Team" path="/teams/add" />
        </div>
        <div className="Home__Img">
          <img src={studentImg} alt="student" />
        </div>
        <OrderByBtnsWrapper
          onDateClick={() => dispatch({ type: "orderByDate" })}
          onPriorityClick={() => dispatch({ type: "orderByPriority" })}
          onAlphabeticallyClick={() => dispatch({ type: "orderByAlphabet" })}
          onAscClick={() => setIsAsc(true)}
          onDescClick={() => setIsAsc(false)}
          order={order()}
        />
      </div>
      <div className="Home__Container bottom">
        <RecentItems
          label="My Tasks"
          pathname="/mytasks"
          items={state.tasks[order()]}
        />

        <RecentItems
          label="Projects"
          pathname="/myprojects"
          items={state.projects[order()]}
        />

        <RecentItems
          label="Teams"
          pathname="/teams"
          items={state.teams[order()]}
        />
      </div>
    </section>
  );
};

export default Home;
