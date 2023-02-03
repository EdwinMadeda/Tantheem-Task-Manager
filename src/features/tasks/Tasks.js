import { useSelector, useDispatch } from "react-redux";
import { editTask, selectTasksByStatus } from "./taskSlice";
import AddBtn from "../../reusableComponents/AddBtn";
import girlPhoto from "../../assets/images/girl_photo.png";
import PreviousWorkSnippet from "./PreviousWorkSnippet";
import ToDoSnippet from "./ToDoSnippet";

import "./Tasks.css";

const Tasks = () => {
  const { previousWork, toDoTasks } = useSelector(selectTasksByStatus);

  const dispatch = useDispatch();

  const setIsTaskComplete = (selectTask, status = false) => {
    const zeroSubTasks = selectTask.subTasks.length === 0;
    zeroSubTasks && dispatch(editTask({ ...selectTask, isComplete: status }));
  };

  const onSetReminder = (status, selectTask) => {
    dispatch(editTask({ ...selectTask, reminder: status }));
  };

  return (
    <section className="Task main">
      <div className="Task__Container top">
        <p className="Task__helloMsg">Hello,</p>

        <div className="Task__AddBtn-Container AddBtn-Container">
          <AddBtn label="New Task" path={"/mytasks/add"} />
        </div>

        <div className="Task__img">
          <img src={girlPhoto} alt="girl" />
        </div>
      </div>
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
    </section>
  );
};

export default Tasks;
