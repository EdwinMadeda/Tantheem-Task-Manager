import { CiEdit } from "react-icons/ci"

const EditBtn = ({onClick}) => {
  return (
    <CiEdit onClick={onClick} className="editBtn icon"/>
  )
}

export default EditBtn