import { CiEdit } from "react-icons/ci";
import CustomLink from "./CustomLink";

const EditBtn = ({ className, path }) => {
  return (
    <CustomLink className={className} to={path} state={{ mode: "Edit" }}>
      <CiEdit className={`editBtn icon ` + className} title="edit" />
    </CustomLink>
  );
};

export default EditBtn;
