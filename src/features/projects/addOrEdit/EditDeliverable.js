import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { editProject, selectProjectById } from '../projectsSlice';
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
    const newDeliverables = selectProject.deliverables.map((deliverable) =>
      deliverable.id === deliverableId
        ? { id: deliverableId, ...values }
        : deliverable
    );

    dispatch(
      editProject({ ...selectProject, deliverables: newDeliverables })
    ).unwrap();
  };

  return (
    <ProjectsForm
      formTitle={'Edit Deliverable'}
      submitLabel={'Edit Deliverable'}
      defaultValues={selectDeliverable}
      disabled={false}
      reduxDispatch={reduxDispatch}
    />
  );
};

export default EditDeliverable;
