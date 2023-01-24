import { BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";

const AddBtn = ({label, path}) => {
  return (
    <Link className="addBtn btn" to={path}>
                <BsPlus className="icon"/>
                <p className="label">{label}</p>
    </Link>
  )
}

export default AddBtn