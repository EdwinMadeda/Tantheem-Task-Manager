import { useState, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import useTargetAction from "../customHooks/useTargetAction";

const DotsMenu = ({options}) => {

  const [menuVisible, setMenuVisible] = useState(false);
  const ref = useRef(null);

  useTargetAction(setMenuVisible, ref, 'click');

  // const options = [
  //   {
  //      name: 'In Progress',
  //      onClick : ()=>{}
  //   },
  //   {
  //     name: 'Complete',
  //     onClick : ()=>{}
  //   }
  // ]

  const onOptionClick = callback =>{
      setMenuVisible(false);
      callback();
  }

  const Options = ()=>{
    return(
      <>
        {options.map((option, index) => (
                <li key={index}
                    onClick={()=> onOptionClick(option.onClick)}
                    className="dotsMenu__Option">{option.name}</li>
        ))}
      </>
    )
  }

  return (
    <div className="dotsMenu" ref={ref}>
       <BsThreeDotsVertical className="dotsMenuBtn" onClick={()=> setMenuVisible(!menuVisible)}/>
       {menuVisible && 
          <ul 
              className="dotsMenu__Content" 
              style={{display : `${options.length === 0? 'none':'block'}`}}>
              <Options />
          </ul>
       }
    </div>
  )
}

export default DotsMenu