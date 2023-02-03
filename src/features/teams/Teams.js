import TeamsSnippet from "./TeamsSnippet";
import TeamTasks from "./TeamTasks";
import AddBtn from "../../reusableComponents/AddBtn";
import { useSelector } from "react-redux";
import { selectAllTeams } from "./teamsSlice";
import { selectTeamTasks } from "../tasks/taskSlice";
import "./teams.css";

const Teams = () => {
  const teams = useSelector(selectAllTeams);
  const teamTasks = useSelector(selectTeamTasks);

  return (
    <section className="Teams main">
      <article className="Teams__Sidebar">
        <TeamsSnippet teams={teams} />
      </article>

      <div className="Teams__Container top">
        <div className="Teams__AddBtn-Container AddBtn-Container">
          <AddBtn label="New Team" path="/teams/add" />
        </div>
      </div>

      <div className="Teams__Container bottom">
        <TeamTasks rawtasks={teamTasks} />
      </div>
    </section>
  );
};

export default Teams;
