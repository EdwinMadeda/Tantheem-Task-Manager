import { useNavigate } from "react-router";
import { BsArrowLeftShort } from "react-icons/bs";
import usePrevLocation from "../customHooks/usePrevLocation";

const BackBtn = ({path = false}) => {
  const navigate = useNavigate();
  const { prevLocation } = usePrevLocation();

  return (
    <BsArrowLeftShort className="Page__BackBtn" onClick={()=> navigate(prevLocation ?? path)}/>
  )
}

export default BackBtn