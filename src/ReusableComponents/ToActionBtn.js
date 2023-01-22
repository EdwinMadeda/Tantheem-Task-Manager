import { Link } from "react-router-dom"

const ToActionBtn = ({label, linkTo='/'}) => {
    return (
      <Link
          className="toActionBtn btn"
          to={linkTo}>
              {label}
      </Link>
    )
  }
  

export default ToActionBtn