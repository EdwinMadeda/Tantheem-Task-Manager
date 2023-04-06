import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { BsTrash } from 'react-icons/bs';
import btnLoadingSpinner from '../assets/images/btnLoadingSpinner.gif';
import { useEffect } from 'react';

const DeleteBtn = ({ className, action, status }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDelete = async () => {
    await dispatch(action);
    if (status === 'succeeded') navigate(-1);
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
