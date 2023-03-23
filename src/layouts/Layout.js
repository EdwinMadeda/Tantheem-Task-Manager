import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import { selectUser } from '../features/user/userSlice';
import Header from './header/Header';

const Layout = () => {
  const { info: userInfo } = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo?._id) navigate('/signin');
  }, [navigate, userInfo]);

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
