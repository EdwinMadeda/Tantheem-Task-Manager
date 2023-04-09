import { useDispatch } from 'react-redux';
import { addTeam } from '../slice/teamsSlice';
import TeamsForm from './TeamsForm';

const AddTeam = ({ isOverlay = false, onClose }) => {
  const dispatch = useDispatch();
  const reduxDispatch = (values) => dispatch(addTeam(values)).unwrap();
  return (
    <TeamsForm
      formTitle="Add Team"
      formAction="addTeam"
      submitLabel="Save Team"
      disabled={false}
      reduxDispatch={reduxDispatch}
      isOverlay={isOverlay}
      onClose={onClose}
    />
  );
};

export default AddTeam;
