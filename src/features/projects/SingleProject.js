import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectDeliverableById, selectOneProject } from "./projectsSlice";
import { STATUS } from "./projectsSlice";
import ProjectDeliverables from "./ProjectDeliverables";
import ProgressBar from "../../reusableComponents/ProgressBar";
import BackBtn from "../../reusableComponents/BackBtn";
import MemberShareBtns from "../../reusableComponents/MemberShareBtns";
import EditBtn from "../../reusableComponents/EditBtn";
import DeleteBtn from "../../reusableComponents/DeleteBtn";

import "./SingleProject.css";
import "../../SinglePage.css";
import CustomLink from "../../reusableComponents/CustomLink";

const SingleProject = () => {
  const { projectId, deliverableId } = useParams();
  const {
    selectProject,
    deliverables,
    completeDeliverables,
    totalDeliverables,
  } = useSelector((state) => selectOneProject(state, Number(projectId)));

  const selectDeliverable = useSelector((state) =>
    selectDeliverableById(state, Number(projectId), Number(deliverableId))
  );

  const selectItem = Boolean(selectDeliverable)
    ? selectDeliverable
    : selectProject;

  const editPath = Boolean(selectDeliverable)
    ? `/myprojects/${selectProject.id}/edit/${selectDeliverable.id}`
    : `/myprojects/edit/${selectProject.id}`;

  return (
    <section className="SinglePage SingleProject main">
      <div className="SinglePage__Container SinglePage__Container top">
        <BackBtn />
        <div className="SinglePage__InnerContainer Title__Container">
          <h2 className="SinglePage__Title SinglePage__ItemName">
            {Boolean(selectDeliverable) && (
              <CustomLink to={`/myprojects/${selectProject.id}`}>
                {`${selectProject.name} | `}
              </CustomLink>
            )}
            {selectItem.name}
          </h2>
          {!Boolean(deliverableId) && (
            <ProgressBar
              completeItems={completeDeliverables}
              totalItems={totalDeliverables}
            />
          )}
          <div className="SinglePage__Ctrl-Btns">
            <EditBtn className="SinglePage__Ctrl-Btn" path={editPath} />
            <DeleteBtn className="SinglePage__Ctrl-Btn" />
          </div>
        </div>
        <div className="SinglePage__InnerContainer">
          <div className="SinglePage__Description">
            <h3>Description:</h3>
            <p>{selectItem.description}</p>
          </div>
        </div>
      </div>

      {!Boolean(deliverableId) && (
        <>
          <MemberShareBtns members={[]} />
          <div className="SinglePage__Container bottom">
            <ProjectDeliverables
              deliverables={deliverables.toDo}
              status={STATUS.TO_DO}
              projectId={projectId}
            />
            <ProjectDeliverables
              deliverables={deliverables.inProgress}
              status={STATUS.IN_PROGRESS}
              projectId={projectId}
            />
            <ProjectDeliverables
              deliverables={deliverables.complete}
              status={STATUS.COMPLETE}
              projectId={projectId}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default SingleProject;
