import { useSelector } from 'react-redux';
import { selectProjectsByStatus, selectProjectsStatus } from './projectsSlice';
import AddBtn from '../../reusableComponents/AddBtn';
import PreviousProjectsSnippet from './PreviousProjectsSnippet';
import ToDoProjectsSnippet from './ToDoProjectsSnippet';
import './Projects.css';
import LoadingSpinner from '../../reusableComponents/LoadingSpinner';

const Projects = () => {
  const { previousProjects, toDoProjects } = useSelector(
    selectProjectsByStatus
  );

  const { fetchProjects } = useSelector(selectProjectsStatus);
  const statusLoading = fetchProjects === 'pending';

  return (
    <>
      {statusLoading && <LoadingSpinner />}
      <section className="Project main">
        <div className="Project__Container top">
          <div className="Project__AddBtn-Container AddBtn-Container">
            <AddBtn label="New Project" path="/myprojects/add" />
          </div>
        </div>
        {!statusLoading && (
          <div className="Project__Container bottom">
            <PreviousProjectsSnippet projects={previousProjects} />
            <ToDoProjectsSnippet rawProjects={toDoProjects} />
          </div>
        )}
      </section>
    </>
  );
};

export default Projects;
