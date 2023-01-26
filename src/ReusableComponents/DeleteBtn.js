import { BsTrash } from "react-icons/bs"

const DeleteBtn = ({className, onClick}) => {
  return (
    <BsTrash className={`editBtn icon ` + className}/>
  )
}

export default DeleteBtn