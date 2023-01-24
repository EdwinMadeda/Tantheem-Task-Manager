import { useState, useReducer, useRef } from "react";
import useTargetAction from "../../ReusableComponents/customHooks/useTargetAction";
import { Link } from "react-router-dom";
import { BsSearch} from 'react-icons/bs';
import Bell from "../../ReusableComponents/Bell";
import logo from "../../assets/images/logo.svg";
import AppLink from "./AppLink";
import './Header.css';

const initialState = {
    Links : [
        {
            id: 0,
            label : "Home",
            path : "/",
            isActive : false,
        },
        {
            id: 1,
            label : "My Tasks",
            path : "/mytasks",
            isActive : false,
        },
        {
            id: 2,
            label : "My Projects",
            path : "/myprojects",
            isActive : false,
        },
        {
            id: 3,
            label : "Calender",
            path : "/calender",
            isActive : false,
        },
        {
            id: 4,
            label : "Teams",
            path : "/teams",
            isActive : false,
        },
    ]
}

const activeLinks = (targetId = 0) => {
    return [...initialState.Links].map(link => {
        return link.id === targetId? {...link, isActive : true}: link;
      });
}

const init = () => {
    return {...initialState, Links : activeLinks()};
}

const reducer = (state,action) =>{
     switch(action.type){
        case 'setActive' : return {...state, Links : activeLinks(action.payload)};
        case 'init' : return init();
        default : return state;
     }
}


const Header = () => {

  const [isMobile, setIsMobile] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const ref = useRef(null);

  const AppLinks = () =>{
    return state.Links.map(link => {
        return <AppLink key={link.id} 
                        item={link} 
                        dispatch={dispatch}
                        setIsMobile={setIsMobile}
                />
    })
  };

  useTargetAction(setIsMobile, ref, 'click');

  return (
    <header className="App-header" ref={ref}>
        <div className="App-header__Container">
            <div className={`App-humbergerMenu ${isMobile? 'active':''}`}
                onClick={()=> setIsMobile(!isMobile)}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className={`App-navWrapper ${isMobile? 'active':''}`}>
                <nav>
                    <ul className="App-links__container">
                        <AppLinks />
                    </ul>
                </nav>
            <form className="App-search__form">
                    <div className="App-search__innerContainer">
                        <input className="App-search__input" type="text" name="search" id="search" />
                        <BsSearch className="App-search__icon icon"/>
                    </div>
            </form>
            </div>

            <div className="App-headerInnerWrapper">
                <div className="App-notifications__container">
                    <span className="App-notifications__indicator"></span>
                    <Bell className="App-notifications__bellIcon" onClick={()=>{}}/>
                </div>  

                <Link to={'/'}>
                    <img className="App-logo" src={logo} alt="Logo" />
                </Link>
            </div>
        </div>
    </header>
  )
}

export default Header