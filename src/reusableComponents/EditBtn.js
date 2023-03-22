import { CiEdit } from 'react-icons/ci';
import CustomLink from './CustomLink';

const EditBtn = ({ className, path = '', title = 'edit', onClick }) => {
  return (
    <CustomLink className={className} to={path} state={{ mode: 'Edit' }}>
      <CiEdit className={`editBtn icon ` + className} title={title} />
    </CustomLink>
  );
};

export default EditBtn;
