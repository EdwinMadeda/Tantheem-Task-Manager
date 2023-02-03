import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectTeamById, deleteTeam } from "./teamsSlice";
import { selectProjectsByTeam } from "../projects/projectsSlice";
import { selectTasksByTeam } from "../tasks/taskSlice";
import BackBtn from "../../reusableComponents/BackBtn";
import MemberShareBtns from "../../reusableComponents/MemberShareBtns";
import team_bgImage from "../../assets/images/team_bgImage.jpg";
import PreviousProjectsSnippet from "../projects/PreviousProjectsSnippet";
import TeamTasks from "./TeamTasks";

import EditBtn from "../../reusableComponents/EditBtn";
import DeleteBtn from "../../reusableComponents/DeleteBtn";

import "../../SinglePage.css";
import "./SingleTeam.css";

const SingleTeam = () => {
  const { teamId } = useParams();
  const teamIdNo = Number(teamId);

  const selectTeam = useSelector((state) => selectTeamById(state, teamIdNo));
  const selectProjects = useSelector((state) =>
    selectProjectsByTeam(state, teamIdNo)
  );
  const selectTasks = useSelector((state) =>
    selectTasksByTeam(state, teamIdNo)
  );

  return (
    <>
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
              <div className="SinglePage__Ctrl-Btns">
                <EditBtn
                  className="SinglePage__Ctrl-Btn"
                  path={`/teams/edit/${selectTeam.id}`}
                />
                <DeleteBtn
                  className="SinglePage__Ctrl-Btn"
                  action={deleteTeam(selectTeam.id)}
                />
              </div>
            </div>
          </div>
          <div className="SingleTeam__Container bottom">
            <MemberShareBtns members={[]} />
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
  );
};

export default SingleTeam;
