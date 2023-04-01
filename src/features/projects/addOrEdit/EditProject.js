import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { editProject, selectProjectById } from '../projectsSlice';
import ProjectsForm from './ProjectsForm';

const EditProject = () => {
  const { projectId } = useParams();

  const selectProject = useSelector((state) =>
    selectProjectById(state, projectId)
  );

  const dispatch = useDispatch();

  const reduxDispatch = (values) =>
    dispatch(editProject({ projectId, values })).unwrap();

  return (
    <ProjectsForm
      formTitle="Edit Project"
      formAction="editProject"
      submitLabel="Edit Project"
      defaultValues={selectProject}
      disabled={false}
      reduxDispatch={reduxDispatch}
    />
  );
};

export default EditProject;
