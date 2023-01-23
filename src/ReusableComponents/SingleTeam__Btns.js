import {FaUsers, FaShare} from "react-icons/fa";

const SingleTeam__Btns = ({members}) => {
  return (
    <div className="SingleTeam__Btns">
        <button className="SingleTeam__MembersBtn SingleTeam__Btn">
            <FaUsers className="icon" />
            <p>Members</p>
        </button>
        <button className="SingleTeam__ShareBtn SingleTeam__Btn">
            <FaShare className="icon"/>
            <p>Share</p>
        </button>
    </div>
  )
}

export default SingleTeam__Btns