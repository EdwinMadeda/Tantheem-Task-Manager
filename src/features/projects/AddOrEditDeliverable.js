import { useReducer } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectOneProject } from "./projectsSlice";
import { STATUS, PRIORITY } from "./projectsSlice";

import Form, { InputText,
               InputTextArea,
               InputRadio,
               InputDate,
               InputSubmit} from "../../reusableComponents/Form";

const initialState = {
    projectId : undefined,
    deliverable : {
        name: '',
        description: '',
        status: STATUS.TO_DO,
        priority : undefined,
        startDate: '',
        endDate: '',
    }
};

const init = () => initialState;

const reducer = (state, action) => {

   switch(action.type){
      case 'init' : init();
      case 'setDeliverableValue': return {...state, project : {...state.deliverable, ...action.payload}};
      default: return state;
   }
}

const AddNewDeliverable = () => {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const { projectId } = useParams();
  const { selectProject } = useSelector(state => selectOneProject(state, Number(projectId)));
  
  console.log(selectProject);

  const setDeliverableValue = (payload) => {
      dispatch({ type: 'setDeliverableValue', payload });
  }

  const submit = () =>{
     console.log(state);
  }

  return (
    <section className='AddNewDeliverable AddNewItem main'>
        <Form className='AddNewDeliverable__Form'
              parentName={selectProject.name}
              title={`Add New Deliverable`}>
                
           <InputText
              label='Name'
              id='name'
              value={state.name}
              onChange={inputVal => setDeliverableValue({name : inputVal})}
            />
           <InputTextArea 
               label='Description'
               id='description'
               value={state.description}
               onChange={inputVal => setDeliverableValue({description : inputVal})}
           />

          <InputDate
               label='Start date'
               id='due-date'
               value={state.startDate}
               onChange={inputVal => setDeliverableValue({dueDate : inputVal})}
           />

           <InputDate
               label='End date'
               id='due-date'
               value={state.endDate}
               onChange={inputVal => setDeliverableValue({dueDate : inputVal})}
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
              label='Add Deliverable'
              onClick={submit}
            />
        </Form>
    </section>
  )
}

export default AddNewDeliverable