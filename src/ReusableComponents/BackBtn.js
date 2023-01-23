import { BsArrowLeftShort } from "react-icons/bs";
import { useNavigate } from "react-router";

const BackBtn = ({path}) => {
  const navigate = useNavigate();

  return (
    <BsArrowLeftShort className="Page__BackBtn" onClick={()=> navigate(path)}/>
  )
}

export default BackBtn