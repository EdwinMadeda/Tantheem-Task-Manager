import { useState, useReducer, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { input, selectSearchText } from '../../features/search/searchSlice';

import useTargetAction from '../../customHooks/useTargetAction';
import { BsSearch } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import Bell from '../../reusableComponents/Bell';

import AppLink from './AppLink';
import './Header.css';

import UserAvatar from '../../reusableComponents/UserAvatar';
import Modal from '../../reusableComponents/Modal';
import { FaUserAlt } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import { selectUser, signOut } from '../../features/user/userSlice';

const initialState = {
  Links: [
    {
      id: 0,
      label: 'Home',
      path: '/',
      isActive: false,
    },
    {
      id: 1,
      label: 'My Tasks',
      path: '/mytasks',
      isActive: false,
    },
    {
      id: 2,
      label: 'My Projects',
      path: '/myprojects',
      isActive: false,
    },
    {
      id: 3,
      label: 'Calender',
      path: '/calender',
      isActive: false,
    },
    {
      id: 4,
      label: 'Teams',
      path: '/teams',
      isActive: false,
    },
  ],
  isMobile: false,
  searchInputVisible: false,
  currPath: '/',
};

const activeLinks = (targetId = 0) => {
  return [...initialState.Links].map((link) => {
    return link.id === targetId ? { ...link, isActive: true } : link;
  });
};

const init = () => {
  return { ...initialState, Links: activeLinks() };
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setActive':
      return { ...state, Links: activeLinks(action.payload) };
    case 'setIsMobile':
      return { ...state, isMobile: action.payload };
    case 'setSearchInputVisible':
      return { ...state, searchInputVisible: action.payload };
    case 'setCurrPath':
      return { ...state, currPath: action.payload };
    case 'init':
      return init();
    default:
      return state;
  }
};

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const ref = useRef(null);
  const reduxDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchText = useSelector(selectSearchText);

  const toggleSearchInput = () => {
    const isToggleSearch = window.innerWidth > 680 && window.innerWidth < 1010;
    const payload = isToggleSearch ? !state.searchInputVisible : false;
    dispatch({ type: 'setSearchInputVisible', payload });
  };

  const user = useSelector(selectUser);

  const AppLinks = () => {
    return state.Links.map((link) => {
      return (
        <AppLink
          key={link.id}
          item={link}
          dispatch={dispatch}
          setIsMobile={setIsMobile}
        />
      );
    });
  };

  useTargetAction(setIsMobile, ref, 'click');

  return (
    <header className="App-header" ref={ref}>
      <div className="App-header__Container">
        <div
          className={`App-humbergerMenu ${state.isMobile ? 'active' : ''}`}
          onClick={() => setIsMobile(!isMobile)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`App-navWrapper ${isMobile ? 'active' : ''}`}>
          <nav>
            <ul className="App-links__container">
              <AppLinks />
            </ul>
          </nav>
          <form className="App-search__form">
            <label
              className={`App-search__input-Wrapper ${
                state.searchInputVisible ? 'show' : ''
              }`}
              htmlFor="searchApp"
            >
              <input
                className="App-search__input"
                type="text"
                name="search"
                id="searchApp"
                value={searchText}
                onChange={(e) => {
                  const searchText = e.target.value;
                  reduxDispatch(input(searchText));

                  if (searchText !== '' && location.pathname !== '/search') {
                    navigate('/search');
                    dispatch({
                      type: 'setCurrPath',
                      payload: location.pathname,
                    });
                  }
                  if (searchText === '' && location.pathname === '/search')
                    navigate(state.currPath);
                }}
              />

              <BsSearch className="App-search__icon icon" onClick={() => {}} />
            </label>

            {!state.searchInputVisible ? (
              <BsSearch
                className="App-search__icon icon hidden"
                onClick={toggleSearchInput}
              />
            ) : (
              <GrClose
                className="App-search__icon closeBtn icon hidden"
                onClick={toggleSearchInput}
              />
            )}
          </form>
        </div>

        <div className="App-headerInnerWrapper">
          <div className="App-notifications__container">
            <span className="App-notifications__indicator"></span>
            <Bell className="App-notifications__bellIcon" onClick={() => {}} />
          </div>

          <Modal
            options={[
              {
                item: (
                  <>
                    <FaUserAlt className="icon" /> Profile
                  </>
                ),
                onClick: () => {
                  navigate('/profile');
                },
              },
              {
                item: (
                  <>
                    <IoLogOut className="icon" /> Signout
                  </>
                ),
                onClick: () => {
                  reduxDispatch(signOut());
                },
              },
            ].map((entry, index) => {
              return {
                id: index,
                ...entry,
              };
            })}
            className="User-avatar__Container"
          >
            <UserAvatar title={user.name} />
          </Modal>
        </div>
      </div>
    </header>
  );
};

export default Header;
