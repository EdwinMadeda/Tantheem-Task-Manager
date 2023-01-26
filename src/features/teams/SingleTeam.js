import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectOneTeam } from "./teamsSlice";
import { selectProjectsByTeam } from "../projects/projectsSlice";
import { selectTasksByTeam } from "../tasks/taskSlice";
import BackBtn from "../../reusableComponents/BackBtn";
import MemberShareBtns from "../../reusableComponents/MemberShareBtns";
import team_bgImage from "../../assets/images/team_bgImage.jpg";
import PreviousProjectsSnippet from "../projects/PreviousProjectsSnippet";
import TodoTeamTasks from "../teams/ToDoTeamTasks";

import "./SingleTeam.css";


const SingleTeam = () => {
  const { teamId } = useParams();
  const teamIdNo = Number(teamId);

  const selectTeam = useSelector(state => selectOneTeam(state, teamIdNo));
  const selectProjects = useSelector(state => selectProjectsByTeam(state, teamIdNo));
  const selectTasks = useSelector(state => selectTasksByTeam(state, teamIdNo));
  
  return (
    <section className="SingleTeam main">
    <div className="SinglePage__Container SingleTeam__Container top"
         style={{backgroundImage : `url(${team_bgImage})`}}>
        <BackBtn path="/teams"/>
        <div className="SinglePage__InnerContainer">
            <h2 className="SinglePage__Title SingleTeam__Title">{selectTeam.name}</h2>
        </div>
    </div>
    <div className="SingleTeam__Container bottom">
        <MemberShareBtns members={[]}/>
        <div className="SingleTeam__InnerContainer">
            <PreviousProjectsSnippet projects={selectProjects}/>
            <TodoTeamTasks tasks={selectTasks} />
        </div>
    </div>
</section>
  )
}

export default SingleTeam