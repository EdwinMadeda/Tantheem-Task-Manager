import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectProjectById, editProject } from "./projectsSlice";
import BackBtn from "../../reusableComponents/BackBtn";
import EditBtn from "../../reusableComponents/EditBtn";
import DeleteBtn from "../../reusableComponents/DeleteBtn";

import "./SingleProject.css";
import "../../SinglePage.css";
import CustomLink from "../../reusableComponents/CustomLink";

const SingleDeliverable = () => {
  const { projectId, deliverableId } = useParams();

  const selectProject = useSelector((state) =>
    selectProjectById(state, Number(projectId))
  );

  const selectDeliverable = selectProject.deliverables.find(
    (deliverable) => deliverable.id === Number(deliverableId)
  );

  const onDeleteValues = () => {
    const newDeliverables = selectProject.deliverables.filter(
      (deliverable) => deliverable.id !== selectDeliverable.id
    );
    return { ...selectProject, deliverables: newDeliverables };
  };

  return (
    <>
      {Boolean(selectDeliverable) && (
        <section className="SinglePage SingleProject main">
          <div className="SinglePage__Container SinglePage__Container top">
            <BackBtn />
            <div className="SinglePage__InnerContainer Title__Container">
              <h2 className="SinglePage__Title SinglePage__ItemName">
                <CustomLink to={`/myprojects/${selectProject.id}`}>
                  {`${selectProject.name} | `}
                </CustomLink>
                {selectDeliverable.name}
              </h2>
              <div className="SinglePage__Ctrl-Btns">
                <EditBtn
                  className="SinglePage__Ctrl-Btn"
                  path={`/myprojects/${selectProject.id}/edit/${selectDeliverable.id}`}
                />
                <DeleteBtn
                  className="SinglePage__Ctrl-Btn"
                  action={editProject(onDeleteValues())}
                />
              </div>
            </div>
            <div className="SinglePage__InnerContainer">
              <div className="SinglePage__Description">
                <h3>Description:</h3>
                <p>{selectDeliverable.description}</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SingleDeliverable;
