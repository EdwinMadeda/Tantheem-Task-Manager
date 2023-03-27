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

  const reduxDispatch = (values) => {
    return dispatch(editProject(values)).unwrap();
  };

  return (
    <ProjectsForm
      formTitle={'Edit Project'}
      submitLabel={'Edit Project'}
      defaultValues={selectProject}
      disabled={false}
      reduxDispatch={reduxDispatch}
    />
  );
};

export default EditProject;
