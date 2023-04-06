import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import useRedirectUser from '../customHooks/useRedirectUser';
import { fetchProjects } from '../features/projects/projectsSlice';
import { fetchTasks } from '../features/tasks/taskSlice';
import { fetchInvites } from '../features/teams/slice/inviteSlice';
import { fetchTeams } from '../features/teams/slice/teamsSlice';
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
    dispatch(fetchInvites());
  }, [dispatch]);
  useRedirectUser(!isSignedIn, '/signin');

  useEffect(() => {
    if (isSignedIn) fetchData();
  }, [isSignedIn, fetchData]);

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
