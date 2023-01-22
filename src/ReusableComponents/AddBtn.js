import { BsPlus } from "react-icons/bs";

const AddBtn = ({label, onClick}) => {
  return (
    <button 
            type="button"
            className="addBtn btn"
            onClick={() => onClick}>
                <BsPlus className="icon"/>
                <p className="label">{label}</p>
    </button>
  )
}

export default AddBtn