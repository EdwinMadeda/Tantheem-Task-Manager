// import { BsPlus } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import CustomLink from "./CustomLink";

const AddBtn = ({ label, path, state = {} }) => {
  return (
    <CustomLink className="addBtn btn" to={path} state={state}>
      {/* <BsPlus className="icon" /> */}
      <FaPlus className="icon" />
      <p className="label">{label}</p>
    </CustomLink>
  );
};

export default AddBtn;
