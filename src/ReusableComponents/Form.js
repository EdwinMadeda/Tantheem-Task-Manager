import CheckBox from "./CheckBox";
import Bell from "./Bell";
import BackBtn from "./BackBtn";
import { useLocation } from "react-router";

const Form = (props) => {
   
    const location = useLocation();
    const prevLocation = location.state.prevLocation;

    return (
        <form className={`form ${props.className}`} onSubmit={e => e.preventDefault()}>
            <div className="Form__TopContainer">
                 <BackBtn path={prevLocation}/>
                 <h2 className="form-title">
                    <p className="form-title__ParentName">{props.parentName}</p>
                    <p className="form-title__Text">{props.title}</p>
                </h2>
            </div>
            {props.children}
        </form>
    )
};

export const InputText = ({label, id, placeholder="", value, onChange}) => {
    return (
        <div className='form-control'>
            <label htmlFor={id}>{label}</label>
            <input 
                type="text" 
                id={id} 
                name={id}
                placeholder={placeholder} 
                value={value} 
                onChange={e => onChange(e.target.value)}/>
        </div>
    )
}

export const InputTextArea = ({label, id, value, onChange}) => {
    return (
        <div className='form-control'>
            <label htmlFor={id}>{label}</label>
            <textarea 
                name={id}
                id={id} 
                cols="30" 
                rows="5"
                defaultValue={value}
                onChange={e => onChange(e.target.value)} />
        </div>
    )
}

export const InputDate = ({label, id, placeholder="", value, onChange})=>{
    return (
        <div className='form-control'>
            <label htmlFor="add_dueDate">{label}</label>
            <input 
                type="date" 
                id={id} 
                placeholder={placeholder} 
                value={value} 
                onChange={e => onChange(e.target.value)}/>
        </div>
    )
}

export const InputCheckBox = ({label, value, onChange})=>{
    return (
        <div className='form-control-check'>
            <label htmlFor="add_reminder">{label}</label>
            <CheckBox checked={value} onClick={inputVal => onChange(inputVal)}/>
        </div>
    )
}

export const InputBell = ({label, value, onChange})=>{
    return (
        <div className='form-control-check '>
            <p className="label__title">{label}</p>
            <Bell status={value} onClick={inputVal => onChange(inputVal)}/>
        </div>
    )
}

export const InputRadio = ({label, id, options = [] , defaultValue, onChange}) => {

    const RadioContainer = ({option}) =>{
        return (
        <div className="radio__container">
  
             <label htmlFor={id + option?.name} className="checkBox__label">
                <input 
                    type="radio" 
                    name={id} 
                    id={id + option?.name} 
                    value={option.value}
                    defaultChecked={defaultValue === option.value}
                    onChange={e => onChange(e.target.value)}/>
                <span className="checkmark"></span>
             </label>
                
             <label>{option?.name}</label>
        </div>)
    }

    return (
        <div className=' form-control'>
            <p className="label__title">{label}</p>
            <div className="radioBtns__wrapper">
                {options.map((option, index) => 
                    <RadioContainer key={index} option={option}/>)
                }
            </div>
        </div>
    )
}

export const InputSubmit = ({label, onClick})=>{
    return (
        <div className="form-control submit-btn__Wrapper">
            <input className="btn submit-btn" type="button" value={label} onClick={onClick}/>
        </div>
    );
}


export default Form;