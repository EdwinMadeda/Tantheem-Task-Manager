import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPrevLocation } from "../features/prevLocation/prevLocationSlice";
import usePrevLocation from "../customHooks/usePrevLocation";

const CustomLink = (props) => {

    const prevLocation = usePrevLocation();
    const dispatch = useDispatch();
    const onLinkClick = ()=>{
      dispatch(setPrevLocation({...prevLocation, ...props.state}));
    }

  return (
    <Link 
        className={props.className}
        to={props.to}
        onClick={onLinkClick}>

            {props.children}
    </Link>
  )
}

export default CustomLink