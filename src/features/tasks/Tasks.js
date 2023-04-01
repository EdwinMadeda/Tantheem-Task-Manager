import { useSelector, useDispatch } from 'react-redux';
import { editTask, selectTasksByStatus, selectTasksStatus } from './taskSlice';
import AddBtn from '../../reusableComponents/AddBtn';
import girlPhoto from '../../assets/images/girl_photo.png';
import PreviousWorkSnippet from './PreviousWorkSnippet';
import ToDoSnippet from './ToDoSnippet';

import './Tasks.css';
import LoadingSpinner from '../../reusableComponents/LoadingSpinner';

const Tasks = () => {
  const { previousWork, toDoTasks } = useSelector(selectTasksByStatus);

  const dispatch = useDispatch();

  const setIsTaskComplete = (selectTask, status = false) => {
    const zeroSubTasks = selectTask.subTasks.length === 0;
    zeroSubTasks &&
      dispatch(
        editTask({ taskId: selectTask.id, values: { isComplete: status } })
      );
  };

  const onSetReminder = (status, selectTask) => {
    dispatch(editTask({ taskId: selectTask.id, values: { reminder: status } }));
  };

  const { fetchTasks } = useSelector(selectTasksStatus);
  const statusLoading = fetchTasks === 'pending';

  return (
    <>
      {statusLoading && <LoadingSpinner />}
      <section className="Task main">
        <div className="Task__Container top">
          <p className="Task__helloMsg">Hello,</p>

          <div className="Task__AddBtn-Container AddBtn-Container">
            <AddBtn label="New Task" path={'/mytasks/add'} />
          </div>

          <div className="Task__img">
            <img src={girlPhoto} alt="girl" />
          </div>
        </div>

        {!statusLoading && (
          <div className="Task__Container bottom">
            <PreviousWorkSnippet
              tasks={previousWork}
              setIsTaskComplete={setIsTaskComplete}
            />
            <ToDoSnippet
              tasks={toDoTasks}
              setIsTaskComplete={setIsTaskComplete}
              onSetReminder={onSetReminder}
            />
          </div>
        )}
      </section>
    </>
  );
};

export default Tasks;
