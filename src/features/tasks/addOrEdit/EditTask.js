import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { selectTaskById, editTask } from "../taskSlice";
import TasksForm from "./TasksForm";

const EditTask = () => {
  const { taskId } = useParams();
  const selectTask = useSelector((state) =>
    selectTaskById(state, Number(taskId))
  );

  const dispatch = useDispatch();

  const reduxDispatch = (values) => {
    return dispatch(editTask(values)).unwrap();
  };

  return (
    <TasksForm
      formTitle={"Edit Task"}
      submitLabel={"Edit Task"}
      defaultValues={selectTask}
      disabled={false}
      reduxDispatch={reduxDispatch}
    />
  );
};

export default EditTask;
