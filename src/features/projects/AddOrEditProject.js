import { useReducer } from "react";
import { STATUS, PRIORITY, selectProjectById } from "./projectsSlice";

import useAddOrEdit from "../../customHooks/useAddOrEdit";

import Form, { InputText,
               InputTextArea,
               InputBell,
               InputRadio,
               InputDate,
               InputSubmit} from "../../reusableComponents/Form";

const initialState = {
        name : '',
        description : '',
        status : STATUS.TO_DO,
        priority : undefined, 
        teamId : undefined, 
        startDate: '',
        endDate: '',
        deliverables : [],
};

const init = () => initialState;

const reducer = (state, action) => {

   switch(action.type){
      case 'init' : init();
      case 'setProjectValue': return {...state, ...action.payload};
      default: return state;
   }
}

const AddOrEditProject = () => {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const setProjectValue = (payload) => {
        dispatch({ type: 'setProjectValue', payload });
  }  

  const mode = useAddOrEdit('projectId', selectProjectById, setProjectValue);

  const submit = () =>{
     console.log(state);
  }

  return (
    <section className='AddOrEditProject AddNewItem main'>
        <Form className='AddOrEditProject__Form'
                title='Project'
                mode={mode}>
                
           <InputText
              label='Name'
              id='name'
              value={state.name}
              onChange={inputVal => setProjectValue({name : inputVal})}
            />

           <InputTextArea 
               label='Description'
               id='description'
               value={state.description}
               onChange={inputVal => setProjectValue({description : inputVal})}
           />

          <InputDate
               label='Start date'
               id='due-date'
               value={state.startDate}
               onChange={inputVal => setProjectValue({dueDate : inputVal})}
           />

           <InputDate
               label='End date'
               id='due-date'
               value={state.endDate}
               onChange={inputVal => setProjectValue({dueDate : inputVal})}
           />

           <InputBell 
               label='Set Reminder'
               value={state.reminder}
               onChange={inputVal => setProjectValue({reminder : inputVal})}
           />
           
           <InputRadio
              label='Priority'
              id='priority'
              options={[
                {name: 'Low', value: PRIORITY.LOW},
                {name: 'Medium', value: PRIORITY.MEDIUM},
                {name: 'High', value: PRIORITY.HIGH},
              ]}
           />

           <InputSubmit 
              label={mode + ' Project'}
              onClick={submit}
            />
        </Form>
    </section>
  )
}

export default AddOrEditProject