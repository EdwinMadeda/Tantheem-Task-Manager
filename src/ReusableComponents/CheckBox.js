import { nanoid } from "@reduxjs/toolkit"

const CheckBox = ({checked, onChange=false}) => {
    const id = nanoid();

    // <div className="checkbox">
    //      <input 
    //             type="checkbox" 
    //             name="checkbox" 
    //             id={`checkbox${id}`}
    //             defaultChecked={checked}/>
    //     <label htmlFor={`checkbox${id}`}></label>
    // </div>

  return (
    <label htmlFor={`checkbox${id}`} className="checkBox__label">
        <input 
          type="checkbox" 
          id={`checkbox${id}`} 
          defaultChecked={checked}
          onChange={e => onChange(e.target.value)}/>
        <span className="checkmark"></span>
    </label>
  )
}

export default CheckBox