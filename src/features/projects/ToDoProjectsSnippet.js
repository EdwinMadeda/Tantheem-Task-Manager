import CustomLink from "../../reusableComponents/CustomLink";
import OrderByBtnsWrapper from "../../reusableComponents/OrderByBtnsWrapper";
import useOrderBy from "../../customHooks/useOrderBy";
import { ordinal } from "../../constants";

const ToDoProjectsSnippet = ({ rawProjects }) => {
  const {
    projects,
    setIsAsc,
    order,
    onOrderByDate,
    onOrderByPriority,
    onOrderByAlphabet,
  } = useOrderBy([], rawProjects, []);

  return (
    <div className="ToDoProjects Projects__Snippet">
      <p className="Projects__Snippet-title">TO DO</p>
      <div className="Projects__OrderByBtns">
        <OrderByBtnsWrapper
          onDateClick={onOrderByDate}
          onPriorityClick={onOrderByPriority}
          onAlphabeticallyClick={onOrderByAlphabet}
          onAscClick={() => setIsAsc(true)}
          onDescClick={() => setIsAsc(false)}
          order={order()}
        />
      </div>
      <ul className="Projects__Snippet-items">
        {projects[order()].map((project) => (
          <li
            className="Projects__Snippet-item Snippet__Type2-Item"
            key={project.id}
          >
            <div className="Projects__Data">
              <span className="Projects__Name">
                <CustomLink to={`/myprojects/${project.id}`}>
                  {`${project.name.substring(0, 10)}...`}
                </CustomLink>
              </span>
              <span>{"Due Today"}</span>
              <span className="Projects__Priority">{`${ordinal(
                project.priority
              )} Priority`}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoProjectsSnippet;
