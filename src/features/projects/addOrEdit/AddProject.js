import { useDispatch } from 'react-redux';
import { addProject } from '../projectsSlice';
import ProjectsForm from './ProjectsForm';

const AddProject = () => {
  const dispatch = useDispatch();
  const reduxDispatch = (values) => dispatch(addProject(values)).unwrap();

  return (
    <ProjectsForm
      formTitle={'Add Project'}
      formAction="addProject"
      submitLabel={'Save Project'}
      disabled={false}
      reduxDispatch={reduxDispatch}
    />
  );
};

export default AddProject;
