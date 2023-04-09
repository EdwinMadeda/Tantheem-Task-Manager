import { BsPlus } from 'react-icons/bs';
import CustomLink from './CustomLink';

const AddBtn = ({ label, path, state = {}, onClick }) => {
  return (
    <CustomLink
      className="addBtn btn"
      to={path}
      state={state}
      onClick={onClick}
    >
      <BsPlus className="icon" />
      <p className="label">{label}</p>
    </CustomLink>
  );
};

export default AddBtn;
