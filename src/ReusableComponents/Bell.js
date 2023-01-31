import { BsBell, BsBellFill, BsBellSlash } from "react-icons/bs";
import { useState, useRef } from "react";
import useTargetAction from "../customHooks/useTargetAction";

const Bell = ({ className, status = false, onClick, disabled = false }) => {
  const [isHover, setIsHover] = useState(false);
  const [isOn, setIsOn] = useState(status);

  const ref = useRef(null);
  const onBellClick = () => {
    setIsOn(!isOn);
    onClick(isOn);
    ref.current.classList[isOn ? "add" : "remove"]("animate");
  };

  useTargetAction(setIsHover, ref, "mouseover");

  return (
    <div
      className={`${className} icon bellIcon`}
      onClick={onBellClick}
      ref={ref}
    >
      {!isOn ? (
        <BsBellSlash />
      ) : (
        <>{isHover ? <BsBellFill className="fill" /> : <BsBell />}</>
      )}
    </div>
  );
};

export default Bell;
