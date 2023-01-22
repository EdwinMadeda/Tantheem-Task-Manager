import { useSelector } from "react-redux"
import { selectAllProjects } from "./projectsSlice"

const ProjectsList = () => {
  const projects = useSelector(selectAllProjects);
  const projectItems = projects.map(project => (
    <li key={project.id}>{project.name}</li>
  ));


  return (
    <section>
        <p>My projects</p>
        <ul>
            {projectItems}
        </ul>
    </section>
  )
}

export default ProjectsList