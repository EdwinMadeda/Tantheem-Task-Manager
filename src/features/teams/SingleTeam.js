import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import {
  selectTeamById,
  deleteTeam,
  selectTeamsStatus,
} from './slice/teamsSlice';
import { selectProjectsByTeam } from '../projects/projectsSlice';
import { selectTasksByTeam } from '../tasks/taskSlice';
import BackBtn from '../../reusableComponents/BackBtn';
import MemberShareBtns from '../../reusableComponents/MemberShare/MemberShare';
import team_bgImage from '../../assets/images/team_bgImage.jpg';
import PreviousProjectsSnippet from '../projects/PreviousProjectsSnippet';
import TeamTasks from './TeamTasks';

import EditBtn from '../../reusableComponents/EditBtn';
import DeleteBtn from '../../reusableComponents/DeleteBtn';

import '../../SinglePage.css';
import './SingleTeam.css';
import LoadingSpinner from '../../reusableComponents/LoadingSpinner';
import { selectUser } from '../user/userSlice';

const SingleTeam = () => {
  const { teamId } = useParams();

  const selectTeam = useSelector((state) => selectTeamById(state, teamId));

  const selectProjects = useSelector((state) =>
    selectProjectsByTeam(state, teamId)
  );
  const selectTasks = useSelector((state) => selectTasksByTeam(state, teamId));
  const { deleteTeam: statusDeleteTeam, fetchTeams } =
    useSelector(selectTeamsStatus);

  const {
    info: { _id: userId },
  } = useSelector(selectUser);

  const creatorId = selectTeam?.createdBy?._id;

  return (
    <>
      {fetchTeams === 'pending' ? (
        <LoadingSpinner />
      ) : (
        <>
          {' '}
          {Boolean(selectTeam) && (
            <section className="SingleTeam main">
              <div
                className="SinglePage__Container SingleTeam__Container top"
                style={{ backgroundImage: `url(${team_bgImage})` }}
              >
                <BackBtn />
                <div className="SinglePage__InnerContainer">
                  <h2 className="SinglePage__Title SingleTeam__Title">
                    {selectTeam.name}
                  </h2>

                  {creatorId === userId && (
                    <div className="SinglePage__Ctrl-Btns">
                      <EditBtn
                        className="SinglePage__Ctrl-Btn"
                        path={`/teams/edit/${selectTeam.id}`}
                      />
                      <DeleteBtn
                        className="SinglePage__Ctrl-Btn"
                        action={deleteTeam(selectTeam.id)}
                        status={statusDeleteTeam}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="SingleTeam__Container bottom">
                <div className="SinglePage__Description SingleTeam__Description">
                  <h3>Description:</h3>
                  <p>{selectTeam.description}</p>
                </div>

                <MemberShareBtns selectTeam={selectTeam} />

                <div className="SingleTeam__InnerContainer">
                  <PreviousProjectsSnippet
                    projects={selectProjects}
                    title="Team Projects"
                  />
                  <TeamTasks rawtasks={selectTasks} showTeam={false} />
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default SingleTeam;
