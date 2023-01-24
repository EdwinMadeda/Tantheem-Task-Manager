import { PRIORITY } from "./taskSlice";
import { useReducer } from "react";
import Form, { InputText,
               InputTextArea,
               InputBell,
               InputRadio,
               InputDate,
               InputSubmit} from "../../reusableComponents/Form";

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

const AddNewTask = () => {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  const setValue = (payload) => {
      dispatch({ type: 'setValue', payload });
  }

  const submit = () =>{
     console.log(state);
  }

  return (
    <section className='AddNewTask AddNewItem main'>
        <Form className='AddNewTask__Form'
              title='Add New Task'
              backPath="/mytasks">
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

          <InputDate
               label='Start date'
               id='due-date'
               value={state.startDate}
               onChange={inputVal => setValue({dueDate : inputVal})}
           />

           <InputDate
               label='End date'
               id='due-date'
               value={state.endDate}
               onChange={inputVal => setValue({dueDate : inputVal})}
           />

           <InputBell 
               label='Set Reminder'
               value={state.reminder}
               onChange={inputVal => setValue({reminder : inputVal})}
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
              label='Add Task'
              onClick={submit}
            />
        </Form>
    </section>
  )
}

export default AddNewTask