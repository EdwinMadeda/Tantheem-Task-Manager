import Bell from "../../reusableComponents/Bell";
import CheckBox from "../../reusableComponents/CheckBox";
import ViewMoreBtn from "./ViewMoreBtn";

const ToDoSnippet = ({tasks, viewMore=false, setViewMore=false}) => { 

  return (
    <div className={`ToDo Tasks__Snippet ${viewMore? 'viewMore':''}`}>
        <p className="Tasks__Snippet-title">TO DO</p>
        <ul className="Tasks__Snippet-items">
          {tasks.map(task => (
            <li className="Tasks__Snippet-item Snippet__Type2-Item"
                key={task.id}>
                <CheckBox checked={task.isComplete}/>
                <div className="Task__Data">
                  <span className="Task__Name">{task.name.substring(0, 20)}...</span>
                  <span>{'Due Today'}</span>
                  {task?.team &&  <span>By {task.team}</span>}
                </div>
                <Bell className="reminder" onClick={()=>{}}/>
            </li>))
          }
        </ul>

        { Boolean(setViewMore) && 
         <ViewMoreBtn viewMore={viewMore} setViewMore={setViewMore} />}
       
    </div>
  )
  
}

export default ToDoSnippet