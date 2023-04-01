import { useParams, useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectProjectById,
  editProject,
  addDeliverable,
  STATUS,
} from '../projectsSlice';
import ProjectsForm from './ProjectsForm';

const AddDeliverable = () => {
  const { projectId } = useParams();
  const selectProject = useSelector((state) =>
    selectProjectById(state, projectId)
  );

  const dispatch = useDispatch();
  const { state } = useLocation();

  const reduxDispatch = (values) => {
    return dispatch(
      addDeliverable({
        projectId,
        newDeliverable: { ...state, ...values },
      })
    ).unwrap();
  };
  return (
    <ProjectsForm
      formTitle="Add Deliverable"
      formAction="addDeliverable"
      submitLabel="Save Deliverable"
      defaultValues={state}
      disabled={false}
      reduxDispatch={reduxDispatch}
    />
  );
};

export default AddDeliverable;
