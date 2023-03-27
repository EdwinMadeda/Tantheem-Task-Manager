import { useParams, useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { selectProjectById, editProject } from '../projectsSlice';
import ProjectsForm from './ProjectsForm';

const AddDeliverable = () => {
  const { projectId } = useParams();
  const selectProject = useSelector((state) =>
    selectProjectById(state, projectId)
  );

  const dispatch = useDispatch();
  const { state } = useLocation();

  const reduxDispatch = (values) => {
    const deliverables = selectProject.deliverables;
    const newDeliverables = [
      ...selectProject.deliverables,
      { id: deliverables.length + 1, ...values },
    ];

    dispatch(
      editProject({ ...selectProject, deliverables: newDeliverables })
    ).unwrap();
  };
  return (
    <ProjectsForm
      formTitle={'Add Deliverable'}
      submitLabel={'Save Deliverable'}
      defaultValues={state}
      disabled={false}
      reduxDispatch={reduxDispatch}
    />
  );
};

export default AddDeliverable;
