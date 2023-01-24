import { useSelector } from "react-redux";
import ToActionBtn from "../../reusableComponents/ToActionBtn";
import { selectLatestTask } from "./taskSlice";

const LatestTask = () => {
  const latestTask = useSelector(selectLatestTask);

  return (
    <div className="Latest Task">
        <ToActionBtn label="My Tasks" linkTo="/mytasks" />
       <div className="Item">
          <div className="Content">
            <p>
                <span className="Title">{latestTask.name}</span>
                <span className="Duedate">Due on 22/05/2022</span>
            </p>
            <p className="Description">Do ABCD</p>
          </div>
          <p className="Label">Latest Task</p>
       </div>
    </div>
  )
}

export default LatestTask