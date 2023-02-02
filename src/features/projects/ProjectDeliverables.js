import AddBtn from "../../reusableComponents/AddBtn";
import CustomLink from "../../reusableComponents/CustomLink";
import DotsMenu from "../../reusableComponents/DotsMenu";
import EditBtn from "../../reusableComponents/EditBtn";
import { STATUS } from "./projectsSlice";

const ProjectDeliverables = ({ deliverables, status, projectId }) => {
  const optionEntries = Object.entries(STATUS)
    .map((entry) => entry[1])
    .filter((entry) => entry !== status);

  const options = optionEntries.map((entry, index) => {
    return {
      id: index,
      name: entry,
      onClick: () => {},
    };
  });

  return (
    <div className="SinglePage__InnerContainer">
      <h3 className="ProjectDeliverables SinglePage__Sub-item__Title SinglePage__Title">
        {status}
      </h3>
      <div className="ProjectDeliverables SinglePage__Sub-item__Snippet">
        {status !== STATUS.COMPLETE && (
          <AddBtn
            label={"Add Deliverable"}
            path={`/myprojects/${projectId}/add`}
            state={{ status }}
          />
        )}

        <ul className="SinglePage__Sub-item__Items">
          {deliverables.map((deliverable) => (
            <li className="SinglePage__Sub-item__Item" key={deliverable.id}>
              <DotsMenu options={options} />
              <CustomLink
                className="SinglePage__Sub-item__ItemName"
                to={`/myprojects/${projectId}/${deliverable.id}`}
                state={{ status }}
              >
                {deliverable.name}
              </CustomLink>
              <EditBtn
                path={`/myprojects/${projectId}/edit/${deliverable.id}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectDeliverables;
