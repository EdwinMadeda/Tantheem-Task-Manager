import { useNavigate } from "react-router";
import { BsArrowLeftShort } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { getPrevLocation, getStoreLocation } from "../features/prevLocation/prevLocationSlice";

const BackBtn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { prevLocation } = useSelector(getPrevLocation);
  const { storeLocation } = useSelector(getStoreLocation);
  const path = prevLocation === location.pathname? storeLocation : prevLocation;

  return (
    <BsArrowLeftShort className="Page__BackBtn" onClick={()=> navigate(path ?? '/')}/>
  )
}

export default BackBtn