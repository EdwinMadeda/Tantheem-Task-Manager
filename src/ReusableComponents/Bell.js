import { BsBell, BsBellFill, BsBellSlash } from "react-icons/bs";
import { useState, useRef } from "react";
import useTargetAction from "../customHooks/useTargetAction";

const Bell = ({className, status = false, onClick}) => {
  const [isHover, setIsHover] = useState(false);
  const [isOn, setIsOn] = useState(status);

  const ref = useRef(null);
  const onBellClick = () =>{
    setIsOn(!isOn);
    onClick(isOn);
    ref.current.classList.remove('animate');
  }

  useTargetAction(setIsHover, ref, 'mouseover');

  return (
    <div className={`${className} icon bellIcon animate`}
         onClick={onBellClick} 
         ref={ref}>
            {isOn? <BsBellSlash/> : (
                <>{isHover? <BsBellFill className="fill"/> : <BsBell />}</>
            )}
    </div>
  )
}

export default Bell