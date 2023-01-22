import { useSelector } from "react-redux";
import ToActionBtn from "../../ReusableComponents/ToActionBtn";
import { selectLatestTeam } from "./teamsSlice";

const LatestTeam = () => {
    const latestTeam = useSelector(selectLatestTeam);
  
  return (
    <div className="Latest">
       <ToActionBtn label="Teams" linkTo="/teams"/>
       <div className="Item">
          <div className="Content">
              <p>
                  <span className="Title">{latestTeam.name}</span>
              </p>
              <p className="Description">Do ABCD</p>
          </div>
          <p className="Label">Latest Team</p>
       </div>
       
    </div>
  )
}

export default LatestTeam