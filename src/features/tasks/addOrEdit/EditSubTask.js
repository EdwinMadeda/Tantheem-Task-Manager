import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { selectTaskById, editSubTask } from '../taskSlice';

import TasksForm from './TasksForm';

const EditSubTask = () => {
  const { taskId, subTaskId } = useParams();
  const selectTask = useSelector((state) => selectTaskById(state, taskId));

  const selectSubTask = selectTask.subTasks.find(
    (subTask) => subTask.id === subTaskId
  );

  const dispatch = useDispatch();

  const reduxDispatch = (values) => {
    dispatch(editSubTask({ taskId, subTaskId, values })).unwrap();
  };

  return (
    <TasksForm
      formTitle={'Edit Sub Task'}
      formAction="editSubTask"
      submitLabel={'Edit Sub Task'}
      defaultValues={selectSubTask}
      disabled={false}
      reduxDispatch={reduxDispatch}
    />
  );
};

export default EditSubTask;
