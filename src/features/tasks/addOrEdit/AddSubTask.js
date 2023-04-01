import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { addSubTask } from '../taskSlice';
import TasksForm from './TasksForm';

const AddSubTask = () => {
  const { taskId } = useParams();

  const dispatch = useDispatch();
  const reduxDispatch = (values) => {
    return dispatch(addSubTask({ taskId, newSubTask: { ...values } })).unwrap();
  };

  return (
    <TasksForm
      formTitle={'Add Sub Task'}
      formAction="addSubTask"
      submitLabel={'Save Sub Task'}
      disabled={false}
      reduxDispatch={reduxDispatch}
    />
  );
};

export default AddSubTask;
