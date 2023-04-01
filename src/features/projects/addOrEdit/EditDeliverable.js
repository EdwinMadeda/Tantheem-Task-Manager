import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {
  editDeliverable,
  editProject,
  selectProjectById,
} from '../projectsSlice';
import ProjectsForm from './ProjectsForm';

const EditDeliverable = () => {
  const { projectId, deliverableId } = useParams();

  const selectProject = useSelector((state) =>
    selectProjectById(state, projectId)
  );

  const selectDeliverable = selectProject.deliverables.find(
    (deliverable) => deliverable.id === deliverableId
  );

  const dispatch = useDispatch();

  const reduxDispatch = (values) => {
    return dispatch(
      editDeliverable({ projectId, deliverableId, values })
    ).unwrap();
  };

  return (
    <ProjectsForm
      formTitle="Edit Deliverable"
      formAction="editDeliverable"
      submitLabel="Edit Deliverable"
      defaultValues={selectDeliverable}
      disabled={false}
      reduxDispatch={reduxDispatch}
    />
  );
};

export default EditDeliverable;
