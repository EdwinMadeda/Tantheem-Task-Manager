import { CiEdit } from "react-icons/ci"

const EditBtn = ({className, onClick}) => {
  return (
    <CiEdit onClick={onClick} className={`editBtn icon ` + className}/>
  )
}

export default EditBtn