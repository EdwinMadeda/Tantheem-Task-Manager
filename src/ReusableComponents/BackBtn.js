import { useNavigate } from "react-router";
import { BsArrowLeftShort } from "react-icons/bs";

const BackBtn = () => {
  const navigate = useNavigate();

  return (
    <BsArrowLeftShort className="Page__BackBtn" onClick={() => navigate(-1)} />
  );
};

export default BackBtn;
