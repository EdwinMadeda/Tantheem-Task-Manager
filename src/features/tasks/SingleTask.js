import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectOneTask, selectSubTaskById, selectTaskById } from "./taskSlice";
import ProgressBar from "../../reusableComponents/ProgressBar";
import BackBtn from "../../reusableComponents/BackBtn";
import SubTasks from "./SubTasks";

import { STATUS } from "./taskSlice";

import Bell from "../../reusableComponents/Bell";
import EditBtn from "../../reusableComponents/EditBtn";
import DeleteBtn from "../../reusableComponents/DeleteBtn";
import CustomLink from "../../reusableComponents/CustomLink";

import "../../SinglePage.css";
import "./SingleTask.css";

const SingleTask = () => {
  const { taskId, subTaskId } = useParams();

  const { selectTask, subTasks, completeSubTasks, totalSubTasks } = useSelector(
    (state) => selectOneTask(state, Number(taskId))
  );

  const selectSubTask = useSelector((state) =>
    selectSubTaskById(state, Number(taskId), Number(subTaskId))
  );

  const selectItem = Boolean(selectSubTask) ? selectSubTask : selectTask;
  const editPath = Boolean(selectSubTask)
    ? `/mytasks/${selectTask.id}/edit/${selectSubTask.id}`
    : `/mytasks/edit/${selectTask.id}`;

  return (
    <section className="SinglePage SingleTeam main">
      <div className="SinglePage__Container SinglePage__Container top">
        <BackBtn />
        <div className="SinglePage__InnerContainer Title__Container">
          <h2 className="SinglePage__Title SinglePage__ItemName">
            {Boolean(selectSubTask) && (
              <CustomLink to={`/mytasks/${selectTask.id}`}>
                {`${selectTask.name} | `}
              </CustomLink>
            )}
            {selectItem.name}
          </h2>
          {!Boolean(subTaskId) && (
            <ProgressBar
              completeItems={completeSubTasks}
              totalItems={totalSubTasks}
            />
          )}
          <div className="SinglePage__Ctrl-Btns">
            <Bell
              className="SinglePage__Ctrl-Btn"
              status={selectItem.reminder}
              onClick={() => {}}
              title={`Reminder ${selectItem.reminder ? "ON" : "OFF"}`}
            />
            <EditBtn className="SinglePage__Ctrl-Btn" path={editPath} />
            <DeleteBtn className="SinglePage__Ctrl-Btn" />
          </div>
        </div>
        <div className="SinglePage__InnerContainer">
          <div className="SinglePage__Description">
            <h3>Description:</h3>
            <p className="SinglePage__Description-text">
              {selectItem.description}
            </p>
          </div>
        </div>
      </div>

      {!Boolean(subTaskId) && (
        <div className="SinglePage__Container bottom">
          <SubTasks
            subTasks={subTasks.toDo}
            taskId={taskId}
            status={STATUS.TO_DO}
          />

          {subTasks.complete.length > 0 && (
            <SubTasks
              subTasks={subTasks.complete}
              taskId={taskId}
              status={STATUS.COMPLETE}
            />
          )}
        </div>
      )}
    </section>
  );
};

export default SingleTask;
