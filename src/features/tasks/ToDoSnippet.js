import { BsBell } from "react-icons/bs";
import Bell from "../../ReusableComponents/Bell";
import CheckBox from "../../ReusableComponents/CheckBox";
import ViewMoreBtn from "./ViewMoreBtn";

const ToDoSnippet = ({tasks, viewMore, setViewMore}) => { 

  return (
    <div className={`ToDo Tasks__Snippet ${viewMore? 'viewMore':''}`}>
        <p className="Tasks__Snippet-title">TO DO</p>
        <ul className="Tasks__Snippet-items">
          {tasks.map(task => (
            <li className="Tasks__Snippet-item"
                key={task.id}>
                <CheckBox checked={task.isComplete}/>
                <div className="Task__Data">
                  <span>{task.name}</span>
                  <span>{'Due Today'}</span>
                  {task?.team &&  <p>By {task.team}</p>}
                </div>
                <Bell className="reminder" onClick={()=>{}}/>
            </li>))
          }
        </ul>

        <ViewMoreBtn viewMore={viewMore} setViewMore={setViewMore} />
    </div>
  )
  
}

export default ToDoSnippet