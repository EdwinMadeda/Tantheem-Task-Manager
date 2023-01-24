import { useSelector } from "react-redux";
import ToActionBtn from "../../reusableComponents/ToActionBtn";
import { selectLatestProject } from "./projectsSlice";

const LatestProject = () => {
   const latestProject = useSelector(selectLatestProject);

  return (
    <div className="Latest">
        <ToActionBtn label="Projects" linkTo="/myprojects" />
        <div className="Item">
            <div className="Content">
                <p>
                    <span className="Title">{latestProject.name}</span>
                </p>
                <p className="Description">Do ABCD</p>
            </div>
            <p className="Label">Latest Project</p>
        </div>
    </div>
  )
}

export default LatestProject