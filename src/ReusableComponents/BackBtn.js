import { useNavigate } from "react-router";
import { BsArrowLeftShort } from "react-icons/bs";

const BackBtn = ({path = false}) => {
  const navigate = useNavigate();

  return (
    <BsArrowLeftShort className="Page__BackBtn" onClick={()=> navigate(path)}/>
  )
}

export default BackBtn