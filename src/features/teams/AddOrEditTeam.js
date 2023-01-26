import { useReducer } from "react";
import { selectTeamById } from "./teamsSlice";
import useAddOrEdit from "../../customHooks/useAddOrEdit";

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

const AddOrEditTeam = () => {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const setValue = (payload) => {
      dispatch({ type: 'setValue', payload });
  }

 const mode = useAddOrEdit('teamId', selectTeamById, setValue);

  const submit = () =>{
     console.log(state);
  }

  return (
    <section className='AddOrEditTeam AddNewItem main'>
        <Form className='AddOrEditTeam__Form'
                title='Team'
                mode={mode}>
               
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
              label={mode + ' Team'}
              onClick={submit}
            />
        </Form>
    </section>
  )
}

export default AddOrEditTeam