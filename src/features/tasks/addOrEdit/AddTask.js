import { useDispatch } from 'react-redux';
import { addTask } from '../taskSlice';
import TasksForm from './TasksForm';

const AddTask = () => {
  const dispatch = useDispatch();
  const reduxDispatch = (values) => dispatch(addTask(values)).unwrap();
  return (
    <TasksForm
      formTitle={'Add Task'}
      submitLabel={'Save Task'}
      disabled={false}
      reduxDispatch={reduxDispatch}
    />
  );
};

export default AddTask;
