import { FaUsers, FaShare } from "react-icons/fa";

const MemberShareBtns = ({ members }) => {
  return (
    <div className="SinglePage__MemberShare__Btns">
      <button className="MembersBtn SinglePage__MemberShare__Btn">
        <FaUsers className="icon" />
        <p>Members</p>
      </button>
      {/* <button className="ShareBtn SinglePage__MemberShare__Btn">
        <FaShare className="icon" />
        <p>Share</p>
      </button> */}
    </div>
  );
};

export default MemberShareBtns;
