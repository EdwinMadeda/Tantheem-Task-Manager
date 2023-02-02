import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { selectTeamById, editTeam } from "../teamsSlice";

import TeamsForm from "./TeamsForm";

const EditTeam = () => {
  const { teamId } = useParams();
  const selectTeam = useSelector((state) =>
    selectTeamById(state, Number(teamId))
  );

  const dispatch = useDispatch();

  const reduxDispatch = (values) => {
    return dispatch(editTeam(values)).unwrap();
  };

  return (
    <TeamsForm
      formTitle={"Edit Team"}
      submitLabel={"Edit Team"}
      defaultValues={selectTeam}
      disabled={false}
      reduxDispatch={reduxDispatch}
    />
  );
};

export default EditTeam;
