import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import { fetchProjects } from '../features/projects/projectsSlice';
import { fetchTasks } from '../features/tasks/taskSlice';
import { fetchTeams } from '../features/teams/teamsSlice';
import { selectUser } from '../features/user/userSlice';
import Header from './header/Header';

const Layout = () => {
  const { info: userInfo } = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchVals = useCallback(() => {
    if (!userInfo?._id) {
      navigate('/signin');
      return;
    }
    dispatch(fetchTasks());
    dispatch(fetchProjects());
    dispatch(fetchTeams());
  }, [dispatch, navigate, userInfo?._id]);

  useEffect(() => {
    fetchVals();
  }, [fetchVals]);

  return (
    <>
      <Header />
      <main className="App">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
