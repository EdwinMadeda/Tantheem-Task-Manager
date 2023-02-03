import { useSelector } from "react-redux";
import { selectProjectsByStatus } from "./projectsSlice";
import AddBtn from "../../reusableComponents/AddBtn";
import PreviousProjectsSnippet from "./PreviousProjectsSnippet";
import ToDoProjectsSnippet from "./ToDoProjectsSnippet";
import "./Projects.css";

const Projects = () => {
  const { previousProjects, toDoProjects } = useSelector(
    selectProjectsByStatus
  );

  return (
    <section className="Project main">
      <div className="Project__Container top">
        <div className="Project__AddBtn-Container AddBtn-Container">
          <AddBtn label="New Project" path="/myprojects/add" />
        </div>
      </div>
      <div className="Project__Container bottom">
        <PreviousProjectsSnippet projects={previousProjects} />
        <ToDoProjectsSnippet rawProjects={toDoProjects} />
      </div>
    </section>
  );
};

export default Projects;
