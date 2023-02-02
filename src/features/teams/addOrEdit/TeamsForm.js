import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useReducer } from "react";

import Form, {
  InputText,
  InputTextArea,
  InputSubmit,
} from "../../../reusableComponents/Form";

const initialState = {
  name: "",
  description: "",
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

const TeamsForm = ({
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

    console.log(state);

    try {
      reduxDispatch(state);
    } catch (error) {
      setError(`Could not ${formTitle.toLowerCase()}`);
    } finally {
      !error && navigate(-1);
    }
  };

  return (
    <section className="AddOrEditTeam AddNewItem main">
      <Form className="AddOrEditTeam__Form" title={formTitle}>
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

        <InputSubmit label={submitLabel} onClick={onSubmit} />
      </Form>
    </section>
  );
};

export default TeamsForm;
