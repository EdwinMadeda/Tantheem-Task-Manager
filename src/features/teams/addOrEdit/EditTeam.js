import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { selectTeamById, editTeam } from '../slice/teamsSlice';

import TeamsForm from './TeamsForm';

const EditTeam = () => {
  const { teamId } = useParams();
  const selectTeam = useSelector((state) => selectTeamById(state, teamId));

  const dispatch = useDispatch();

  const reduxDispatch = (values) =>
    dispatch(editTeam({ teamId, values })).unwrap();

  return (
    <TeamsForm
      formTitle={'Edit Team'}
      formAction="editTeam"
      submitLabel={'Edit Team'}
      defaultValues={selectTeam}
      disabled={false}
      reduxDispatch={reduxDispatch}
    />
  );
};

export default EditTeam;
