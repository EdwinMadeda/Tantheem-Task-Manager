import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectTaskById,
  editTask,
  editSubTask,
  deleteSubTask,
  selectTasksStatus,
} from './taskSlice';
import BackBtn from '../../reusableComponents/BackBtn';

import Bell from '../../reusableComponents/Bell';
import EditBtn from '../../reusableComponents/EditBtn';
import DeleteBtn from '../../reusableComponents/DeleteBtn';
import CustomLink from '../../reusableComponents/CustomLink';

import '../../SinglePage.css';
import './SingleTask.css';
import LoadingSpinner from '../../reusableComponents/LoadingSpinner';

const SingleSubTask = () => {
  const { taskId, subTaskId } = useParams();

  const selectTask = useSelector((state) => selectTaskById(state, taskId));
  const selectSubTask = (selectTask?.subTasks ?? []).find(
    (subTask) => subTask.id === subTaskId
  );

  const dispatch = useDispatch();

  const onSetReminder = (status) => {
    dispatch(editSubTask({ taskId, subTaskId, values: { reminder: status } }));
  };

  const { deleteSubTask: statusDeleteSubTask, fetchTasks } =
    useSelector(selectTasksStatus);

  return (
    <>
      {fetchTasks === 'pending' ? (
        <LoadingSpinner />
      ) : (
        <>
          {' '}
          {Boolean(selectTask) && Boolean(selectSubTask) && (
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
                      title={`Reminder ${
                        selectSubTask.reminder ? 'ON' : 'OFF'
                      }`}
                    />
                    <EditBtn
                      className="SinglePage__Ctrl-Btn"
                      path={`/mytasks/${selectTask.id}/edit/${selectSubTask.id}`}
                    />
                    <DeleteBtn
                      className="SinglePage__Ctrl-Btn"
                      action={deleteSubTask({
                        taskId: selectTask.id,
                        subTaskId: selectSubTask.id,
                      })}
                      status={statusDeleteSubTask}
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
      )}
    </>
  );
};

export default SingleSubTask;
