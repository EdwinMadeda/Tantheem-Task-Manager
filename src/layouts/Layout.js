import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import { fetchProjects } from '../features/projects/projectsSlice';
import { fetchTasks } from '../features/tasks/taskSlice';
import { fetchTeams } from '../features/teams/teamsSlice';
import { selectUser } from '../features/user/userSlice';
import Header from './header/Header';

const Layout = () => {
  const {
    info: { _id },
  } = useSelector(selectUser);

  const isSignedIn = Boolean(_id);

  const dispatch = useDispatch();
  const fetchData = useCallback(() => {
    dispatch(fetchTasks());
    dispatch(fetchProjects());
    dispatch(fetchTeams());
  }, [dispatch]);
  const navigate = useNavigate();
  const redirectUser = useCallback(
    (URL) => {
      navigate(URL);
    },
    [navigate]
  );

  useEffect(() => {
    if (isSignedIn) fetchData();
  }, [isSignedIn, fetchData]);

  useEffect(() => {
    if (!isSignedIn) redirectUser('/signin');
  }, [isSignedIn, redirectUser]);

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
