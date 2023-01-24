import { useSelector } from "react-redux";
import { selectAllProjects } from "./projectsSlice";
import AddBtn from "../../reusableComponents/AddBtn";
import PreviousProjectsSnippet from "./PreviousProjectsSnippet";
import ToDoProjectsSnippet from "./ToDoProjectsSnippet";
import "./Projects.css";

const Projects = () => {
  const projects = useSelector(selectAllProjects);

  return (
    <section className="Project main">
    <div className="Project__Container top">

        <div className="Project__AddBtn-Container AddBtn-Container">
          <AddBtn label="New Project" path={''}/>
        </div>
     
    </div>
    <div className="Project__Container bottom">
           <PreviousProjectsSnippet projects={projects} />
           <ToDoProjectsSnippet projects={projects}/>        
    </div>
  </section>
  )
}

export default Projects