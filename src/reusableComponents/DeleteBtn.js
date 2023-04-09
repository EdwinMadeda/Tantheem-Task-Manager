import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { BsTrash } from 'react-icons/bs';
import btnLoadingSpinner from '../assets/images/btnLoadingSpinner.gif';

const DeleteBtn = ({ className, action, status }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDelete = async () => {
    try {
      await dispatch(action).unwrap();
      navigate(-1);
    } catch (err) {
      console.log('delete failed');
    }
  };

  return (
    <p>
      {status === 'pending' ? (
        <img
          src={btnLoadingSpinner}
          alt=""
          className={`editBtn icon btnLoadingSpinner ` + className}
        />
      ) : (
        <BsTrash
          className={`editBtn icon ` + className}
          title="delete"
          onClick={onDelete}
        />
      )}
    </p>
  );
};

export default DeleteBtn;
