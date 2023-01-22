import { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const DotsMenu = ({options}) => {

  const [menuVisible, setMenuVisible] = useState(false);
  const ref = useRef(null);

  useEffect(()=>{
    if(ref?.current){
      window.addEventListener('click', e =>{
          setMenuVisible(ref?.current?.contains(e.target));
      });
    }
  }, [ref]);


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
          <ul className="dotsMenu__Content">
              <Options />
          </ul>
       }
    </div>
  )
}

export default DotsMenu