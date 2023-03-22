import { useSelector } from 'react-redux';
import { selectAllTasks } from '../tasks/taskSlice';
import { selectAllProjects } from '../projects/projectsSlice';
import { selectAllTeams } from '../teams/teamsSlice';

import useOrderBy from '../../customHooks/useOrderBy';

import studentImg from '../../assets/images/student_photo.png';
import AddBtn from '../../reusableComponents/AddBtn';
import OrderByBtnsWrapper from '../../reusableComponents/OrderByBtnsWrapper';

import RecentItems from './RecentItems';
import './Home.css';

const Home = () => {
  const rawTasks = useSelector(selectAllTasks);
  const rawProjects = useSelector(selectAllProjects);
  const rawTeams = useSelector(selectAllTeams);

  const {
    tasks,
    projects,
    teams,
    setIsAsc,
    order,
    onOrderByDate,
    onOrderByPriority,
    onOrderByAlphabet,
  } = useOrderBy(rawTasks, rawProjects, rawTeams);

  return (
    <section className="Home main">
      <div className="Home__Container top">
        <div className="Home__AddBtns">
          <AddBtn label="New Task" path="/mytasks/add" />
          <AddBtn label="New Project" path="/myprojects/add" />
          <AddBtn label="New Team" path="/teams/add" />
        </div>
        <div className="Home__Img">
          <img src={studentImg} alt="student" />
        </div>
        <OrderByBtnsWrapper
          onDateClick={onOrderByDate}
          onPriorityClick={onOrderByPriority}
          onAlphabeticallyClick={onOrderByAlphabet}
          onAscClick={() => setIsAsc(true)}
          onDescClick={() => setIsAsc(false)}
          order={order()}
        />
      </div>
      <div className="Home__Container bottom">
        <RecentItems
          label="My Tasks"
          pathname="/mytasks"
          items={tasks[order()]}
        />

        <RecentItems
          label="Projects"
          pathname="/myprojects"
          items={projects[order()]}
        />

        <RecentItems label="Teams" pathname="/teams" items={teams[order()]} />
      </div>
    </section>
  );
};

export default Home;
