import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectOneProject } from "./projectsSlice";
import { STATUS } from "./projectsSlice";
import ProjectDeliverables from "./ProjectDeliverables";
import ProgressBar from "../../reusableComponents/ProgressBar";
import BackBtn from "../../reusableComponents/BackBtn";
import SingleTeamBtns from "../../reusableComponents/SingleTeamBtns";

import "./SingleProject.css";

const SingleProject = () => {

  const { projectId } = useParams();
  const {selectProject, 
         deliverables, 
         completeDeliverables, 
         totalDeliverables} = useSelector(state => selectOneProject(state, Number(projectId)));
  

  return (
    <section className="SingleProject main">
        <div className="SingleProject__Container SinglePage__Container top">
            <BackBtn path="/myprojects"/>
            <div className="SinglePage__InnerContainer">
                <h2 className="SinglePage__Title">{selectProject.name}</h2>
                <ProgressBar 
                    completeItems={completeDeliverables} 
                    totalItems={totalDeliverables} 
                />
            </div>
            <SingleTeamBtns members={[]}/>
        </div>
        <div className="SingleProject__Container bottom">
            <div className="SingleProject__InnerContainer">
                <h3 className="ProjectDeliverables__Title SinglePage__Title">To Do</h3>
                <ProjectDeliverables 
                    deliverables={deliverables.toDo}
                    type={STATUS.TO_DO}
                    projectId={projectId}
                /> 
            </div>
            <div className="SingleProject__InnerContainer">
                <h3 className="ProjectDeliverables__Title SinglePage__Title">In Progress</h3>
                <ProjectDeliverables 
                    deliverables={deliverables.inProgress}
                    type={STATUS.IN_PROGRESS}
                    projectId={projectId}
                /> 
            </div>
            <div className="SingleProject__InnerContainer">
                <h3 className="ProjectDeliverables__Title SinglePage__Title">Completed</h3>
                <ProjectDeliverables 
                    deliverables={deliverables.complete}
                    type={STATUS.COMPLETE}
                    projectId={projectId}
                /> 
            </div>
        </div>
    </section>
  )
}

export default SingleProject