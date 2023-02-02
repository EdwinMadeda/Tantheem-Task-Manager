import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { BsTrash } from "react-icons/bs";

const DeleteBtn = ({ className, action }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDelete = () => {
    dispatch(action);
    navigate(-1);
  };

  return (
    <BsTrash
      className={`editBtn icon ` + className}
      title="delete"
      onClick={onDelete}
    />
  );
};

export default DeleteBtn;
