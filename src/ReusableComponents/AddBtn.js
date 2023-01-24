import { BsPlus } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

const AddBtn = ({label, path}) => {
   const location = useLocation();
   
  return (
    <Link 
        className="addBtn btn" to={path} 
        state={{prevLocation : location.pathname}}>
                <BsPlus className="icon"/>
                <p className="label">{label}</p>
    </Link>
  )
}

export default AddBtn