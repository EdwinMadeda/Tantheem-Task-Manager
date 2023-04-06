import { useDispatch } from 'react-redux';
import { addTeam } from '../slice/teamsSlice';
import TeamsForm from './TeamsForm';

const AddTeam = () => {
  const dispatch = useDispatch();
  const reduxDispatch = (values) => dispatch(addTeam(values)).unwrap();
  return (
    <TeamsForm
      formTitle="Add Team"
      formAction="addTeam"
      submitLabel="Save Team"
      disabled={false}
      reduxDispatch={reduxDispatch}
    />
  );
};

export default AddTeam;
