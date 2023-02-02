import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { selectTaskById, editTask } from "./taskSlice";
import BackBtn from "../../reusableComponents/BackBtn";

import Bell from "../../reusableComponents/Bell";
import EditBtn from "../../reusableComponents/EditBtn";
import DeleteBtn from "../../reusableComponents/DeleteBtn";
import CustomLink from "../../reusableComponents/CustomLink";

import "../../SinglePage.css";
import "./SingleTask.css";

const SingleSubTask = () => {
  const { taskId, subTaskId } = useParams();

  const selectTask = useSelector((state) =>
    selectTaskById(state, Number(taskId))
  );
  const selectSubTask = selectTask.subTasks.find(
    (subTask) => subTask.id === Number(subTaskId)
  );

  const dispatch = useDispatch();

  const onSetReminder = (status) => {
    const newSubTasks = selectTask.subTasks.map((subTask) =>
      subTask.id === selectSubTask.id
        ? { ...subTask, reminder: status }
        : subTask
    );

    dispatch(editTask({ ...selectTask, subTasks: newSubTasks }));
  };

  const onDeleteValues = () => {
    const newSubTasks = selectTask.subTasks.filter(
      (subTask) => subTask.id !== selectSubTask.id
    );
    return { ...selectTask, subTasks: newSubTasks };
  };

  return (
    <>
      {Boolean(selectSubTask) && (
        <section className="SinglePage SingleTeam main">
          <div className="SinglePage__Container SinglePage__Container top">
            <BackBtn />
            <div className="SinglePage__InnerContainer Title__Container">
              <h2 className="SinglePage__Title SinglePage__ItemName">
                <CustomLink to={`/mytasks/${selectTask.id}`}>
                  {`${selectTask.name} | `}
                </CustomLink>
                {selectSubTask.name}
              </h2>
              <div className="SinglePage__Ctrl-Btns">
                <Bell
                  className="SinglePage__Ctrl-Btn"
                  status={selectSubTask.reminder}
                  onClick={onSetReminder}
                  title={`Reminder ${selectSubTask.reminder ? "ON" : "OFF"}`}
                />
                <EditBtn
                  className="SinglePage__Ctrl-Btn"
                  path={`/mytasks/${selectTask.id}/edit/${selectSubTask.id}`}
                />
                <DeleteBtn
                  className="SinglePage__Ctrl-Btn"
                  action={editTask(onDeleteValues())}
                />
              </div>
            </div>
            <div className="SinglePage__InnerContainer">
              <div className="SinglePage__Description">
                <h3>Description:</h3>
                <p className="SinglePage__Description-text">
                  {selectSubTask.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SingleSubTask;
