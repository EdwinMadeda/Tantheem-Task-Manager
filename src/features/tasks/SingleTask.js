import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectOneTask } from "./taskSlice";
import ProgressBar from "../../reusableComponents/ProgressBar";
import BackBtn from "../../reusableComponents/BackBtn";
import SubTasks from "./SubTasks";

import { STATUS } from "./taskSlice";

import EditBtn from "../../reusableComponents/EditBtn";
import DeleteBtn from "../../reusableComponents/DeleteBtn";

import "./SingleTask.css";
import "../../SinglePage.css";

const SingleTask = () => {

    const { taskId } = useParams();
    const {selectTask, 
        subTasks, 
        completeSubTasks, 
        totalSubTasks} = useSelector(state => selectOneTask(state, Number(taskId)));

  return (
    <section className="SinglePage SingleTeam main">

        <div className="SinglePage__Container SinglePage__Container top">
            <BackBtn path="/mytasks"/>
            <div className="SinglePage__InnerContainer Title__Container">
                <h2 className="SinglePage__Title SinglePage__ItemName">{selectTask.name}</h2>
                <ProgressBar 
                    completeItems={completeSubTasks} 
                    totalItems={totalSubTasks} 
                />
                <div className="SinglePage__Ctrl-Btns">
                    <EditBtn className="SinglePage__Ctrl-Btn"/>
                    <DeleteBtn className="SinglePage__Ctrl-Btn"/>
                </div>
            </div>
            <div className="SinglePage__InnerContainer">
               <div className="SinglePage__Description">
                    <h3>Description:</h3>
                    <p>{selectTask.description}</p>
               </div>
            </div>
        </div>

        <div className="SinglePage__Container bottom">
            <SubTasks 
                subTasks={subTasks.toDo}
                taskId={taskId}
                status={STATUS.TO_DO}
            /> 

        
            <SubTasks 
                subTasks={subTasks.complete}
                taskId={taskId}
                status={STATUS.COMPLETE}
            />
    
        </div>
    </section>
  )
}

export default SingleTask