import { useSelector } from "react-redux";
import CustomLink from "../../reusableComponents/CustomLink";
import ToActionBtn from "../../reusableComponents/ToActionBtn";
import { selectLatestTeam } from "./teamsSlice";

const LatestTeam = () => {
    const latestTeam = useSelector(selectLatestTeam);
  
  return (
    <div className="Latest">
       <ToActionBtn label="Teams" linkTo="/teams"/>
       <div className="Item">
          <div className="Content">
              <CustomLink to={`/teams/${latestTeam.id}`}>
                  <span className="Title">{latestTeam.name}</span>
              </CustomLink>
              <p className="Description">Do ABCD</p>
          </div>
          <p className="Label">Latest Team</p>
       </div>
       
    </div>
  )
}

export default LatestTeam