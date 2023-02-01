import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { editTask, selectTaskById } from "../taskSlice";
import TasksForm from "./TasksForm";

const AddSubTask = () => {
  const { taskId } = useParams();
  const selectTask = useSelector((state) =>
    selectTaskById(state, Number(taskId))
  );

  const dispatch = useDispatch();
  const reduxDispatch = (values) => {
    const subTasks = selectTask.subTasks;
    const newSubTasks = [
      ...selectTask.subTasks,
      { id: subTasks.length + 1, ...values },
    ];

    dispatch(editTask({ ...selectTask, subTasks: newSubTasks })).unwrap();
  };

  return (
    <TasksForm
      formTitle={"Add Sub Task"}
      submitLabel={"Save Sub Task"}
      disabled={false}
      reduxDispatch={reduxDispatch}
    />
  );
};

export default AddSubTask;
