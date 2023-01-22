import { useSelector } from "react-redux";
import { selectAllTasks } from "./taskSlice";

const TaskList = () => {
  const tasks = useSelector(selectAllTasks);
  const TaskItems = tasks.map(task => (
      <li key={task.id}>{task.name}</li>
  ));

  return (
    <section>
        <p>My tasks</p>
        <ul>
           {TaskItems}
        </ul>
    </section>
  )
}

export default TaskList