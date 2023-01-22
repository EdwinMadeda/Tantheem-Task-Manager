import { BsBell, BsBellFill, BsBellSlash } from "react-icons/bs";
import { useState, useEffect, useRef } from "react";

const Bell = ({className, onClick}) => {
  const [isHover, setIsHover] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const ref = useRef(null);
  const onBellClick = () =>{
    setIsClick(!isClick);
    onClick();
    ref.current.classList.remove('animate');
  }

  useEffect(()=>{
    if(ref?.current){
        window.addEventListener('mouseover', e =>{
                setIsHover(ref?.current?.contains(e.target))
        });
    }
  },[ref]);

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