import { useEffect, useReducer, useState } from "react";
import { STATUS } from "../projectsSlice";
import { PRIORITY } from "../../../constants";

import Form, {
  InputText,
  InputTextArea,
  InputBell,
  InputRadio,
  InputDate,
  InputSubmit,
} from "../../../reusableComponents/Form";
import { Navigate, useNavigate } from "react-router";

const initialState = {
  name: "",
  description: "",
  status: STATUS.TO_DO,
  priority: undefined,
  teamId: undefined,
  startDate: "",
  endDate: "",
  deliverables: [],
};

const init = () => initialState;

const reducer = (state, action) => {
  switch (action.type) {
    case "init":
      init();
    case "setProjectValue":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const ProjectsForm = ({
  formTitle,
  submitLabel,
  defaultValues = false,
  disabled = false,
  reduxDispatch,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const setProjectValue = (payload) => {
    dispatch({ type: "setProjectValue", payload });
  };
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    Boolean(defaultValues) && setProjectValue(defaultValues);
  }, [defaultValues]);

  const submit = (e) => {
    e.preventDefault();
    try {
      reduxDispatch(state);
    } catch (error) {
      setError(`Failed to ${submitLabel.toLowerCase()}`);
    } finally {
      !error && navigate(-1);
    }
  };

  return (
    <section className="AddOrEditProject AddNewItem main">
      <Form className="AddOrEditProject__Form" title={formTitle}>
        <InputText
          label="Name"
          id="name"
          value={state.name}
          onChange={(inputVal) => setProjectValue({ name: inputVal })}
          disabled={disabled}
        />

        <InputTextArea
          label="Description"
          id="description"
          value={state.description}
          onChange={(inputVal) => setProjectValue({ description: inputVal })}
          disabled={disabled}
        />

        <InputDate
          label="Start date"
          id="due-date"
          value={state.startDate}
          onChange={(inputVal) => setProjectValue({ dueDate: inputVal })}
          disabled={disabled}
        />

        <InputDate
          label="End date"
          id="due-date"
          value={state.endDate}
          onChange={(inputVal) => setProjectValue({ dueDate: inputVal })}
          disabled={disabled}
        />

        <InputBell
          label="Set Reminder"
          value={state.reminder}
          onChange={(inputVal) => setProjectValue({ reminder: inputVal })}
          disabled={disabled}
        />

        <InputRadio
          label="Priority"
          id="priority"
          options={[
            { name: "Low", value: PRIORITY.LOW },
            { name: "Medium", value: PRIORITY.MEDIUM },
            { name: "High", value: PRIORITY.HIGH },
          ]}
          disabled={disabled}
        />

        <InputSubmit label={submitLabel} onClick={submit} disabled={disabled} />
      </Form>
    </section>
  );
};

export default ProjectsForm;
