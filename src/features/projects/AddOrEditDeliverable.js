import { useReducer } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectOneProject, selectProjectById } from "./projectsSlice";
import { STATUS } from "./projectsSlice";
import { PRIORITY } from "../../constants";

import Form, {
  InputText,
  InputTextArea,
  InputRadio,
  InputDate,
  InputSubmit,
} from "../../reusableComponents/Form";
import useAddOrEdit from "../../customHooks/useAddOrEdit";

const initialState = {
  projectId: undefined,
  deliverable: {
    name: "",
    description: "",
    status: STATUS.TO_DO,
    priority: undefined,
    startDate: "",
    endDate: "",
  },
};

const init = () => initialState;

const reducer = (state, action) => {
  switch (action.type) {
    case "init":
      init();
    case "setDeliverableValue":
      return { ...state, project: { ...state.deliverable, ...action.payload } };
    default:
      return state;
  }
};

const AddNewDeliverable = () => {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const { projectId } = useParams();
  const { selectProject } = useSelector((state) =>
    selectOneProject(state, Number(projectId))
  );
  const setDeliverableValue = (payload) => {
    dispatch({ type: "setDeliverableValue", payload });
  };

  const { mode } = useAddOrEdit(
    "delivarableId",
    selectProjectById,
    (values) => () => {
      console.log(values);
    }
  );

  const submit = () => {
    console.log(state);
  };

  return (
    <section className="AddNewDeliverable AddNewItem main">
      <Form
        className="AddNewDeliverable__Form"
        title={`Deliverable`}
        mode={mode}
      >
        <InputText
          label="Name"
          id="name"
          value={state.name}
          onChange={(inputVal) => setDeliverableValue({ name: inputVal })}
        />
        <InputTextArea
          label="Description"
          id="description"
          value={state.description}
          onChange={(inputVal) =>
            setDeliverableValue({ description: inputVal })
          }
        />

        <InputDate
          label="Start date"
          id="due-date"
          value={state.startDate}
          onChange={(inputVal) => setDeliverableValue({ dueDate: inputVal })}
        />

        <InputDate
          label="End date"
          id="due-date"
          value={state.endDate}
          onChange={(inputVal) => setDeliverableValue({ dueDate: inputVal })}
        />

        <InputRadio
          label="Priority"
          id="priority"
          options={[
            { name: "Low", value: PRIORITY.LOW },
            { name: "Medium", value: PRIORITY.MEDIUM },
            { name: "High", value: PRIORITY.HIGH },
          ]}
        />

        <InputSubmit label={`${mode} Deliverable`} onClick={submit} />
      </Form>
    </section>
  );
};

export default AddNewDeliverable;
