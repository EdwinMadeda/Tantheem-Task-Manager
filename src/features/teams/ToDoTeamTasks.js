import OrderByBtnsWrapper from "../../ReusableComponents/OrderByBtnsWrapper";
import CheckBox from "../../ReusableComponents/CheckBox";

const TodoTeamTasks = ({tasks}) => {
  return (
    <div className='ToDoTeamTasks TeamTasks__Snippet'>
    <p className='TeamTasks__Snippet-title'>TO DO Tasks</p>
    <div className="TeamTasks__OrderByBtns">
          <OrderByBtnsWrapper 
                onDueDateClick={()=>{}}
                onPriorityClick={()=>{}}
                onAlphabeticallyClick={()=>{}}
          />
      </div>
      <ul className="TeamTasks__Snippet-items Snippet__Type2-Items">
        {tasks.map(task => (
          <li className="TeamTasks__Snippet-item Snippet__Type2-Item"
              key={task.id}>
              <CheckBox checked={task.isComplete}/>
              <div className="TeamTasks__Data">
                <span className="TeamsTasks__Name">{`${task.name.substring(0, 10)}...`}</span>
                <span className="TeamsTasks__DueDate">{'Due Today'}</span>
                <span className="TeamTasks__Priority">{`${task.priority} Priority`}</span>
                {task?.team &&  <span className="TeamsTask__Team">By {task.team}</span>}
              </div>

          </li>))
        }
      </ul>
</div>
  )
}

export default TodoTeamTasks