import { useSelector, useDispatch } from 'react-redux';
import {
  selectViewMoreTasksToDo,
  setViewMoreTasksToDo,
} from '../viewMore/viewMoreSlice';

import Bell from '../../reusableComponents/Bell';
import CheckBox from '../../reusableComponents/CheckBox';
import ViewMoreBtn from '../../reusableComponents/ViewMoreBtn';
import CustomLink from '../../reusableComponents/CustomLink';
import NoItems from '../../reusableComponents/NoItemsMsg';
import { trimStr } from '../../utils/constants';

const ToDoSnippet = ({ tasks, setIsTaskComplete, onSetReminder }) => {
  const viewMore = useSelector(selectViewMoreTasksToDo);

  const dispatch = useDispatch();
  const setViewMore = (viewMore) => dispatch(setViewMoreTasksToDo(viewMore));
  const hasSubTasks = (task) => task.subTasks.length !== 0;

  return (
    <div className={`ToDo Tasks__Snippet ${viewMore ? 'viewMore' : ''}`}>
      <p className="Tasks__Snippet-title">TO DO</p>
      {tasks.length > 0 ? (
        <>
          <ul className="Tasks__Snippet-items">
            {tasks.map((task) => (
              <li
                className="Tasks__Snippet-item Snippet__Type2-Item"
                key={task.id}
              >
                {!hasSubTasks(task) && (
                  <CheckBox
                    checked={task.isComplete}
                    onChange={(status) => setIsTaskComplete(task, status)}
                  />
                )}
                <div className="Task__Data">
                  <CustomLink to={`/mytasks/${task.id}`} className="Task__Name">
                    {trimStr(task.name, 20)}
                  </CustomLink>
                  <span>{'Due Today'}</span>
                  {task?.team && <span>By {task.team}</span>}
                </div>
                <Bell
                  className="reminder"
                  status={task.reminder}
                  onClick={(status) => {
                    onSetReminder(status, task);
                  }}
                />
              </li>
            ))}
          </ul>

          <ViewMoreBtn
            viewMore={viewMore}
            setViewMore={setViewMore}
            itemsCount={tasks.length}
          />
        </>
      ) : (
        <NoItems />
      )}
    </div>
  );
};

export default ToDoSnippet;
