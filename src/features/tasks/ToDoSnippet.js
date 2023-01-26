import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { selectViewMoreTasksToDo, setViewMoreTasksToDo } from "../viewMore/viewMoreSlice";

import Bell from "../../reusableComponents/Bell";
import CheckBox from "../../reusableComponents/CheckBox";
import ViewMoreBtn from "../../reusableComponents/ViewMoreBtn";
import CustomLink from "../../reusableComponents/CustomLink";

const ToDoSnippet = ({tasks}) => { 

  const viewMore = useSelector(selectViewMoreTasksToDo);

  const dispatch = useDispatch();
  const setViewMore = viewMore => dispatch(setViewMoreTasksToDo(viewMore));

  return (
    <div className={`ToDo Tasks__Snippet ${viewMore? 'viewMore':''}`}>
        <p className="Tasks__Snippet-title">TO DO</p>
        <ul className="Tasks__Snippet-items">
          {tasks.map(task => (
            <li className="Tasks__Snippet-item Snippet__Type2-Item"
                key={task.id}>
                <CheckBox checked={task.isComplete}/>
                <div className="Task__Data">
                  <CustomLink
                      to={`/mytasks/${task.id}`}
                      className="Task__Name">
                    {task.name.substring(0, 20)}...
                  </CustomLink>
                  <span>{'Due Today'}</span>
                  {task?.team &&  <span>By {task.team}</span>}
                </div>
                <Bell className="reminder" onClick={()=>{}}/>
            </li>))
          }
        </ul>

        <ViewMoreBtn 
          viewMore={viewMore} 
          setViewMore={setViewMore} />

    </div>
    
  )
  
}

export default ToDoSnippet