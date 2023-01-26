import CustomLink from "../../reusableComponents/CustomLink";
import { useSelector, useDispatch } from "react-redux";
import { selectViewMoreTeamsToDo,  setViewMoreTeamsToDo } from "../viewMore/viewMoreSlice";

import { selectTeamById } from "./teamsSlice";
import OrderByBtnsWrapper from "../../reusableComponents/OrderByBtnsWrapper";
import CheckBox from "../../reusableComponents/CheckBox";
import ViewMoreBtn from "../../reusableComponents/ViewMoreBtn";


const TodoTeamTasks = ({tasks}) => {

  const viewMore = useSelector(selectViewMoreTeamsToDo);
  const dispatch = useDispatch();
  const setViewMore = viewMore => dispatch(setViewMoreTeamsToDo(viewMore))

  const TeamsTaskTeam = ({teamId})=>{
  
      const selectTeam = useSelector(state => selectTeamById(state, teamId));

      return (
      <span className="TeamsTask__Team">
        {selectTeam?.name && `By ${selectTeam?.name}`}
      </span>);
  }

  

  return (
    <div className={`ToDoTeamTasks TeamTasks__Snippet ${viewMore? 'viewMore':''}`}>
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
                <CustomLink className="TeamsTasks__Name" to={`/mytasks/${task.id}`}>
                   {`${task.name.substring(0, 20)}...`}
                </CustomLink>
                <span className="TeamsTasks__DueDate">{'Due Today'}</span>
                <span className="TeamTasks__Priority">{`${task.priority} Priority`}</span>
                {task?.teamId !== undefined && <TeamsTaskTeam teamId={task.teamId}/>}
              </div>

          </li>))
        }
      </ul>

      <ViewMoreBtn viewMore={viewMore} setViewMore={setViewMore} />
</div>
  )
}

export default TodoTeamTasks