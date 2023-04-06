import { useSelector } from 'react-redux';
import CustomLink from '../../reusableComponents/CustomLink';
import NoItemsMsg from '../../reusableComponents/NoItemsMsg';
import plural from '../../utils/plural';
import { selectTeamTasks } from '../tasks/taskSlice';

const TeamsSnippet = ({ teams }) => {
  const teamTasks = useSelector(selectTeamTasks);
  const teamTasksCount = (teamId, callback = () => true) => {
    return teamTasks.filter((task) => task.teamId === teamId && callback(task))
      .length;
  };

  return (
    <div className="Teams__Snippet">
      <p className="Teams__Snippet-title">My Teams</p>
      {teams.length > 0 ? (
        <>
          <ul className="Teams__Snippet-items">
            {teams.map((team) => {
              //console.log(team);
              return (
                <li key={team.id} className="Teams__Snippet-item">
                  <p className="Teams__Snippet-itemName">
                    <CustomLink to={`/teams/${team.id}`}>
                      {team.name}
                    </CustomLink>
                  </p>
                  <p className="Teams__Tasks__Data">
                    <span>{plural(teamTasksCount(team.id), 'Task', 's')}</span>
                    <span>
                      {teamTasksCount(team.id, (task) => !task.isComplete) +
                        ' '}
                      Due
                    </span>
                  </p>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <NoItemsMsg />
      )}
    </div>
  );
};

export default TeamsSnippet;
