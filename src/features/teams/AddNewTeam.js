import { useReducer } from "react";
import { useLocation } from "react-router";

import Form, { InputText,
               InputTextArea,
               InputSubmit} from "../../reusableComponents/Form";

const initialState = {
  name : '',
  description : '',
};

const init = () => initialState;

const reducer = (state, action) => {

   switch(action.type){
      case 'init' : init();
      case 'setValue': return {...state, ...action.payload};
      default: return state;
   }
}

const AddNewTeam = () => {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  const setValue = (payload) => {
      dispatch({ type: 'setValue', payload });
  }

  const submit = () =>{
     console.log(state);
  }

  return (
    <section className='AddNewTeam AddNewItem main'>
        <Form className='AddNewTeam__Form'
              title='Add New Team'>
                
           <InputText
              label='Name'
              id='name'
              value={state.name}
              onChange={inputVal => setValue({name : inputVal})}
            />
           <InputTextArea 
               label='Description'
               id='description'
               value={state.description}
               onChange={inputVal => setValue({description : inputVal})}
           />

           <InputSubmit 
              label='Add Team'
              onClick={submit}
            />
        </Form>
    </section>
  )
}

export default AddNewTeam