import { BsPlus } from "react-icons/bs";
import CustomLink from "./CustomLink";

const AddBtn = ({label, path}) => {

  return (
    <CustomLink
        className="addBtn btn" 
        to={path} 
        state={{mode : 'Add'}}>
                <BsPlus className="icon"/>
                <p className="label">{label}</p>
    </CustomLink>
  )
}

export default AddBtn