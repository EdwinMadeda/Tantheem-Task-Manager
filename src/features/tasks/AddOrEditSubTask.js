import { PRIORITY } from "./taskSlice";
import { useReducer } from "react";
import { selectTaskById } from "./taskSlice";

import Form, { InputText,
               InputTextArea,
               InputBell,
               InputRadio,
               InputDate,
               InputSubmit} from "../../reusableComponents/Form";
import useAddOrEdit from "../../customHooks/useAddOrEdit";

const initialState = {
  name : '',
  description : '',
  teamId: undefined,
  startDate : '',
  endDate : '',
  reminder : false,
  isComplete : false,
  priority : PRIORITY.HIGH,

};

const init = () => initialState;
const reducer = (state, action) => {

   switch(action.type){
      case 'init' : init();
      case 'setValue': return {...state, ...action.payload};
      default: return state;
   }
}

const AddOrEditSubTask = () => {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const setValue = (payload) => {
    dispatch({ type: 'setValue', payload });
  }

  const { mode } = useAddOrEdit('taskId', selectTaskById, values =>{/*console.log(values)*/});

  const submit = () =>{
     console.log(state);
  }

  return (
    <section className='AddOrEditSubTask AddNewItem main'>
        <Form className='AddOrEditSubTask__Form'
              title={'SubTask'}
              mode={mode}>
                
           <InputText
              label='Name'
              id='name'
              value={state.name}
              onChange={inputVal => setValue({name : inputVal})}
              disabled={mode === 'View'}
            />
           <InputTextArea 
               label='Description'
               id='description'
               value={state.description}
               onChange={inputVal => setValue({description : inputVal})}
               disabled={mode === 'View'}
           />

          <InputDate
               label='Start date'
               id='due-date'
               value={state.startDate}
               onChange={inputVal => setValue({dueDate : inputVal})}
               disabled={mode === 'View'}
           />

           <InputDate
               label='End date'
               id='due-date'
               value={state.endDate}
               onChange={inputVal => setValue({dueDate : inputVal})}
               disabled={mode === 'View'}
           />

           <InputBell 
               label='Set Reminder'
               value={state.reminder}
               onChange={inputVal => setValue({reminder : inputVal})}
               disabled={mode === 'View'}
           />
           
           <InputRadio
              label='Priority'
              id='priority'
              options={[
                {name: 'Low', value: PRIORITY.LOW},
                {name: 'Medium', value: PRIORITY.MEDIUM},
                {name: 'High', value: PRIORITY.HIGH},
              ]}
              disabled={mode === 'View'}
           />

           <InputSubmit 
              label={`${mode} SubTask`}
              onClick={submit}
              disabled={mode === 'View'}
            />
        </Form>
    </section>
  )
}

export default AddOrEditSubTask