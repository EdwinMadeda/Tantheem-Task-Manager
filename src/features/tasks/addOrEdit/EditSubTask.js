import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { selectTaskById, editTask } from "../taskSlice";

import TasksForm from "./TasksForm";

const EditSubTask = () => {
  const { taskId, subTaskId } = useParams();
  const selectTask = useSelector((state) =>
    selectTaskById(state, Number(taskId))
  );

  const selectSubTask = selectTask.subTasks.find(
    (subTask) => subTask.id === Number(subTaskId)
  );

  const dispatch = useDispatch();

  const reduxDispatch = (values) => {
    const newSubTasks = selectTask.subTasks.map((subTask) =>
      subTask.id === Number(subTaskId)
        ? { id: Number(subTaskId), ...values }
        : subTask
    );

    dispatch(editTask({ ...selectTask, subTasks: newSubTasks })).unwrap();
  };

  return (
    <TasksForm
      formTitle={"Edit Sub Task"}
      submitLabel={"Edit Sub Task"}
      defaultValues={selectSubTask}
      disabled={false}
      reduxDispatch={reduxDispatch}
    />
  );
};

export default EditSubTask;
