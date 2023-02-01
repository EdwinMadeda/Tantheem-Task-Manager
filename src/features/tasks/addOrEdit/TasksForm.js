import { PRIORITY } from "../../../constants";
import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router";
import { useState } from "react";

import Form, {
  InputText,
  InputTextArea,
  InputBell,
  InputRadio,
  InputDate,
  InputSubmit,
} from "../../../reusableComponents/Form";

const initialState = {
  name: "",
  description: "",
  teamId: undefined,
  startDate: "",
  endDate: "",
  reminder: false,
  isComplete: false,
  priority: PRIORITY.HIGH,
};

const init = () => initialState;
const reducer = (state, action) => {
  switch (action.type) {
    case "init":
      init();
    case "setValue":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const TasksForm = ({
  formTitle,
  submitLabel,
  defaultValues = false,
  disabled = false,
  reduxDispatch,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const setValue = (payload) => {
    dispatch({ type: "setValue", payload });
  };

  useEffect(() => {
    Boolean(defaultValues) && setValue(defaultValues);
  }, [defaultValues]);

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    try {
      reduxDispatch(state);
    } catch (error) {
      setError(`Could not ${formTitle.toLowerCase()}`);
    } finally {
      !error && navigate(-1);
    }
  };

  return (
    <section className="AddOrEditTask AddNewItem main">
      <Form className="AddOrEditTask__Form" title={formTitle}>
        <InputText
          label="Name"
          id="name"
          value={state.name}
          onChange={(inputVal) => setValue({ name: inputVal })}
          disabled={disabled}
        />
        <InputTextArea
          label="Description"
          id="description"
          value={state.description}
          onChange={(inputVal) => setValue({ description: inputVal })}
          disabled={disabled}
        />

        <InputDate
          label="Start date"
          id="due-date"
          value={state.startDate}
          onChange={(inputVal) => setValue({ dueDate: inputVal })}
          disabled={disabled}
        />

        <InputDate
          label="End date"
          id="due-date"
          value={state.endDate}
          onChange={(inputVal) => setValue({ dueDate: inputVal })}
          disabled={disabled}
        />

        <InputBell
          label="Set Reminder"
          value={state.reminder}
          onChange={(inputVal) => setValue({ reminder: inputVal })}
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

        <InputSubmit
          label={submitLabel}
          onClick={onSubmit}
          disabled={disabled}
        />
      </Form>
    </section>
  );
};

export default TasksForm;
