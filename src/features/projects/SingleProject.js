import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject, editProject, selectOneProject } from "./projectsSlice";
import { STATUS } from "./projectsSlice";
import ProjectDeliverables from "./ProjectDeliverables";
import ProgressBar from "../../reusableComponents/ProgressBar";
import BackBtn from "../../reusableComponents/BackBtn";
import MemberShareBtns from "../../reusableComponents/MemberShareBtns";
import EditBtn from "../../reusableComponents/EditBtn";
import DeleteBtn from "../../reusableComponents/DeleteBtn";

import "./SingleProject.css";
import "../../SinglePage.css";

const SingleProject = () => {
  const { projectId } = useParams();
  const {
    selectProject,
    deliverables,
    completeDeliverables,
    totalDeliverables,
  } = useSelector((state) => selectOneProject(state, Number(projectId)));
  const dispatch = useDispatch();

  const setStatus = (status, deliverableId) => {
    const newDeliverables = selectProject.deliverables.map((deliverable) =>
      deliverable.id === deliverableId
        ? { ...deliverable, status }
        : deliverable
    );

    dispatch(editProject({ ...selectProject, deliverables: newDeliverables }));
  };

  return (
    <>
      {Boolean(selectProject) && (
        <section className="SinglePage SingleProject main">
          <div className="SinglePage__Container SinglePage__Container top">
            <BackBtn />
            <div className="SinglePage__InnerContainer Title__Container">
              <h2 className="SinglePage__Title SinglePage__ItemName">
                {selectProject.name}
              </h2>
              <ProgressBar
                completeItems={completeDeliverables}
                totalItems={totalDeliverables}
              />
              <div className="SinglePage__Ctrl-Btns">
                <EditBtn
                  className="SinglePage__Ctrl-Btn"
                  path={`/myprojects/edit/${selectProject.id}`}
                />
                <DeleteBtn
                  className="SinglePage__Ctrl-Btn"
                  action={deleteProject(selectProject.id)}
                />
              </div>
            </div>
            <div className="SinglePage__InnerContainer">
              <div className="SinglePage__Description">
                <h3>Description:</h3>
                <p>{selectProject.description}</p>
              </div>
            </div>
          </div>

          <>
            <MemberShareBtns members={[]} />
            <div className="SinglePage__Container bottom">
              <ProjectDeliverables
                deliverables={deliverables.toDo}
                status={STATUS.TO_DO}
                projectId={projectId}
                setStatus={setStatus}
              />
              <ProjectDeliverables
                deliverables={deliverables.inProgress}
                status={STATUS.IN_PROGRESS}
                projectId={projectId}
                setStatus={setStatus}
              />

              {deliverables.complete.length > 0 && (
                <ProjectDeliverables
                  deliverables={deliverables.complete}
                  status={STATUS.COMPLETE}
                  projectId={projectId}
                  setStatus={setStatus}
                />
              )}
            </div>
          </>
        </section>
      )}
    </>
  );
};

export default SingleProject;
