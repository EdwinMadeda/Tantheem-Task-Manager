import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectOneTask,
  editTask,
  deleteTask,
  editSubTask,
  selectTasksStatus,
} from './taskSlice';
import ProgressBar from '../../reusableComponents/ProgressBar';
import BackBtn from '../../reusableComponents/BackBtn';
import SubTasks from './SubTasks';

import { STATUS } from './taskSlice';

import Bell from '../../reusableComponents/Bell';
import EditBtn from '../../reusableComponents/EditBtn';
import DeleteBtn from '../../reusableComponents/DeleteBtn';

import '../../SinglePage.css';
import './SingleTask.css';
import LoadingSpinner from '../../reusableComponents/LoadingSpinner';

const SingleTask = () => {
  const { taskId } = useParams();

  const { selectTask, subTasks, completeSubTasks, totalSubTasks } = useSelector(
    (state) => selectOneTask(state, taskId)
  );

  const dispatch = useDispatch();

  const onSetReminder = (status) => {
    dispatch(editTask({ taskId, values: { reminder: status } }));
  };

  const setIsComplete = (status, subTaskId) => {
    dispatch(
      editSubTask({
        taskId,
        subTaskId,
        values: { isComplete: status },
      })
    );
  };
  const { deleteTask: statusDeleteTask, fetchTasks } =
    useSelector(selectTasksStatus);

  return (
    <>
      {fetchTasks === 'pending' ? (
        <LoadingSpinner />
      ) : (
        <>
          {Boolean(selectTask) && (
            <section className="SinglePage SingleTeam main">
              <div className="SinglePage__Container SinglePage__Container top">
                <BackBtn />
                <div className="SinglePage__InnerContainer Title__Container">
                  <h2 className="SinglePage__Title SinglePage__ItemName">
                    {selectTask.name}
                  </h2>
                  <ProgressBar
                    completeItems={completeSubTasks}
                    totalItems={totalSubTasks}
                  />
                  <div className="SinglePage__Ctrl-Btns">
                    <Bell
                      className="SinglePage__Ctrl-Btn"
                      status={selectTask.reminder}
                      onClick={onSetReminder}
                      title={`Reminder ${selectTask.reminder ? 'ON' : 'OFF'}`}
                    />
                    <EditBtn
                      className="SinglePage__Ctrl-Btn"
                      path={`/mytasks/edit/${selectTask.id}`}
                    />
                    <DeleteBtn
                      className="SinglePage__Ctrl-Btn"
                      action={deleteTask(selectTask.id)}
                      status={statusDeleteTask}
                    />
                  </div>
                </div>
                <div className="SinglePage__InnerContainer">
                  <div className="SinglePage__Description">
                    <h3>Description:</h3>
                    <p className="SinglePage__Description-text">
                      {selectTask.description}
                    </p>
                  </div>
                </div>
              </div>

              {Boolean(subTasks) && (
                <div className="SinglePage__Container bottom">
                  <SubTasks
                    subTasks={subTasks.toDo}
                    taskId={taskId}
                    status={STATUS.TO_DO}
                    setIsComplete={setIsComplete}
                  />

                  {subTasks.complete.length > 0 && (
                    <SubTasks
                      subTasks={subTasks.complete}
                      taskId={taskId}
                      status={STATUS.COMPLETE}
                      setIsComplete={setIsComplete}
                    />
                  )}
                </div>
              )}
            </section>
          )}
        </>
      )}
    </>
  );
};

export default SingleTask;
