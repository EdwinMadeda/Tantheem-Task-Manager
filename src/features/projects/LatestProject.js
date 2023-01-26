import { useSelector } from "react-redux";
import CustomLink from "../../reusableComponents/CustomLink";

import ToActionBtn from "../../reusableComponents/ToActionBtn";
import { selectLatestProject } from "./projectsSlice";

const LatestProject = () => {
   const latestProject = useSelector(selectLatestProject);

  return (
    <div className="Latest">
        <ToActionBtn label="Projects" linkTo="/myprojects" />
        <div className="Item">
            <div className="Content">
                   <CustomLink 
                        className="Title"
                        to={`/myprojects/${latestProject.id}`}>
                        {latestProject.name}
                   </CustomLink>
                <p className="Description">Do ABCD</p>
            </div>
            <p className="Label">Latest Project</p>
        </div>
    </div>
  )
}

export default LatestProject