import TeamsSnippet from "./TeamsSnippet";
import ToDoTeamTasks from "./ToDoTeamTasks";
import AddBtn from "../../reusableComponents/AddBtn";
import { useSelector } from "react-redux";
import { selectAllTeams } from "./teamsSlice";
import { selectAllTasks} from "../tasks/taskSlice";
import "./teams.css";

const Teams = () => {

  const teams = useSelector(selectAllTeams);
  const teamTasks = useSelector(selectAllTasks);

  return (
    <section className="Teams main">
       <article className="Teams__Sidebar">
          <TeamsSnippet teams={teams}/>
       </article>

       <div className="Teams__Container">
            <div className="Teams__InnerContainer top">
              <div className="Teams__AddBtn-Container AddBtn-Container">
                <AddBtn label="New Team" path={''}/>
              </div>
            </div>
            
            <div className="Teams__InnerContainer bottom">
            <ToDoTeamTasks tasks={teamTasks}/>
            </div>
       </div>
       
    </section>
  )
}

export default Teams