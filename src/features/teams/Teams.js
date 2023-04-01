import TeamsSnippet from './TeamsSnippet';
import TeamTasks from './TeamTasks';
import AddBtn from '../../reusableComponents/AddBtn';
import { useSelector } from 'react-redux';
import { selectAllTeams, selectTeamsStatus } from './teamsSlice';
import { selectTeamTasks } from '../tasks/taskSlice';
import './teams.css';
import LoadingSpinner from '../../reusableComponents/LoadingSpinner';

const Teams = () => {
  const teams = useSelector(selectAllTeams);
  const teamTasks = useSelector(selectTeamTasks);

  const { fetchTeams } = useSelector(selectTeamsStatus);
  const statusLoading = fetchTeams === 'pending';

  return (
    <>
      {statusLoading && <LoadingSpinner />}
      <section className="Teams main">
        {!statusLoading && (
          <article className="Teams__Sidebar">
            <TeamsSnippet teams={teams} />
          </article>
        )}

        <div className="Teams__Container top">
          <div className="Teams__AddBtn-Container AddBtn-Container">
            <AddBtn label="New Team" path="/teams/add" />
          </div>
        </div>

        {!statusLoading && (
          <div className="Teams__Container bottom">
            <TeamTasks rawtasks={teamTasks} />
          </div>
        )}
      </section>
    </>
  );
};

export default Teams;
