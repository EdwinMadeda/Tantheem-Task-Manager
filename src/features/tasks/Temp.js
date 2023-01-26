import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectOneTask } from "./taskSlice";
import { STATUS } from "./tasksSlice";
import SubTasks from "./SubTasks";
import ProgressBar from "../../reusableComponents/ProgressBar";
import BackBtn from "../../reusableComponents/BackBtn";

import "./SingleTask.css";

const SingleTask = () => {

  const { taskId } = useParams();
  const {selectTask, 
         subTasks, 
         completesubTasks, 
         totalsubTasks} = useSelector(state => selectOneTask(state, Number(taskId)));
  

  return (
    <section className="SingleTask main">
        <div className="SingleTask__Container SinglePage__Container top">
            <BackBtn path="/mytasks"/>
            <div className="SinglePage__InnerContainer">
                <h2 className="SinglePage__Title">{selectTask.name}</h2>
                <ProgressBar 
                    completeItems={completesubTasks} 
                    totalItems={totalsubTasks} 
                />
            </div>
        </div>
        <div className="SingleTask__Container bottom">
            <div className="SingleTask__InnerContainer">
                <h3 className="subTasks__Title SinglePage__Title">To Do</h3>
                <SubTasks 
                    subTasks={subTasks.toDo}
                    type={STATUS.TO_DO}
                    taskId={taskId}
                /> 
            </div>
            <div className="SingleTask__InnerContainer">
                <h3 className="subTasks__Title SinglePage__Title">Completed</h3>
                <SubTasks 
                    subTasks={subTasks.complete}
                    type={STATUS.COMPLETE}
                    taskId={taskId}
                /> 
            </div>
        </div>
    </section>
  )
}

export default SingleTask