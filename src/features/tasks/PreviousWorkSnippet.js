import { useSelector, useDispatch } from 'react-redux';
import {
  selectViewMorePreviousWork,
  setViewMorePreviousWork,
} from '../viewMore/viewMoreSlice';

import CheckBox from '../../reusableComponents/CheckBox';
import ViewMoreBtn from '../../reusableComponents/ViewMoreBtn';
import CustomLink from '../../reusableComponents/CustomLink';
import NoItems from '../../reusableComponents/NoItemsMsg';
import { trimStr } from '../../utils/constants';

const PreviousWorkSnippet = ({ tasks, setIsTaskComplete }) => {
  const viewMore = useSelector(selectViewMorePreviousWork);

  const dispatch = useDispatch();
  const setViewMore = (viewMore) => dispatch(setViewMorePreviousWork(viewMore));
  const hasSubTasks = (task) => task.subTasks.length !== 0;

  return (
    <div
      className={`PreviousWork Tasks__Snippet ${viewMore ? 'viewMore' : ''}`}
    >
      <p className="Tasks__Snippet-title">previous Work</p>
      {tasks.length > 0 ? (
        <>
          <ul className="Tasks__Snippet-items Snippet__Type1-Items">
            {tasks.map((task) => (
              <li
                className="Tasks__Snippet-item Snippet__Type1-Item"
                key={task.id}
              >
                {!hasSubTasks(task) && (
                  <CheckBox
                    checked={task.isComplete}
                    onChange={(status) => setIsTaskComplete(task, status)}
                  />
                )}
                <CustomLink
                  to={`/mytasks/${task.id}`}
                  className="Task__ItemName Snippet__Type1-ItemName"
                >
                  {trimStr(task.name, 20)}
                </CustomLink>
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

export default PreviousWorkSnippet;
