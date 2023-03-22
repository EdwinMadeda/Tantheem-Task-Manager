import { useNavigate } from 'react-router';
import { BsArrowLeftShort } from 'react-icons/bs';

const BackBtn = ({ onClick }) => {
  const navigate = useNavigate();
  const onBtnClick = () => {
    onClick ? onClick() : navigate(-1);
  };

  return <BsArrowLeftShort className="Page__BackBtn" onClick={onBtnClick} />;
};

export default BackBtn;
