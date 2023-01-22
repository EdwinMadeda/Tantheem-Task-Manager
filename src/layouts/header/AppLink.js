import { Link } from "react-router-dom";

const AppLink = ({item, dispatch, setIsMobile})=>{
    const onClick = () =>{
        dispatch({type: 'setActive', payload : item.id})
        setIsMobile(false);
    };
    const statusActive = item.isActive? 'active' : '';
    return (
        <li className={`App-link ${statusActive}`} 
            onClick={onClick}>
                <Link to={item.path}>{item.label}</Link>
        </li>
    )
}

export default AppLink