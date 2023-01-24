import { BsBell, BsBellFill, BsBellSlash } from "react-icons/bs";
import { useState, useEffect, useRef } from "react";
import useTargetAction from "./customHooks/useTargetAction";

const Bell = ({className, onClick}) => {
  const [isHover, setIsHover] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const ref = useRef(null);
  const onBellClick = () =>{
    setIsClick(!isClick);
    onClick();
    ref.current.classList.remove('animate');
  }

  useTargetAction(setIsHover, ref, 'mouseover');

  return (
    <div className={`${className} icon bellIcon animate`}
         onClick={onBellClick} 
         ref={ref}>
            {isClick? <BsBellSlash/> : (
                <>{isHover? <BsBellFill className="fill"/> : <BsBell />}</>
            )}
    </div>
  )
}

export default Bell