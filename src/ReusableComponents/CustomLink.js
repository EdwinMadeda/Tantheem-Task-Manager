import { Link } from "react-router-dom";
import usePrevLocation from "../customHooks/usePrevLocation";

const CustomLink = (props) => {
    const prevLocation = usePrevLocation();

  return (
    <Link 
        className={props.className}
        to={props.to}
        state={{...props.state, ...prevLocation}}>
            {props.children}
    </Link>
  )
}

export default CustomLink