import { useReducer } from "react";
import {
  STATUS,
  selectProjectById,
  selectDeliverableById,
  selectOneProject,
} from "./projectsSlice";
import { PRIORITY } from "../../constants";

import useAddOrEdit from "../../customHooks/useAddOrEdit";

import Form, {
  InputText,
  InputTextArea,
  InputBell,
  InputRadio,
  InputDate,
  InputSubmit,
} from "../../reusableComponents/Form";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

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

const AddOrEditProject = () => {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const setProjectValue = (payload) => {
    dispatch({ type: "setProjectValue", payload });
  };

  const { projectId, deliverableId } = useParams();

  const selectProject = useSelector((state) =>
    selectProjectById(state, Number(projectId))
  );

  const selectDeliverable = useSelector((state) =>
    selectDeliverableById(state, Number(projectId), Number(deliverableId))
  );

  const selectItem = Boolean(selectDeliverable)
    ? selectDeliverable
    : selectProject;

  const { mode } = useAddOrEdit(selectItem, setProjectValue);

  const submit = () => {
    console.log(state);
  };

  return (
    <section className="AddOrEditProject AddNewItem main">
      <Form
        className="AddOrEditProject__Form"
        title={
          (Boolean(selectProject) && Boolean(selectDeliverable)) ||
          (Boolean(selectProject) && mode === "Add")
            ? "Deliverable"
            : "Project"
        }
        mode={mode}
      >
        <InputText
          label="Name"
          id="name"
          value={state.name}
          onChange={(inputVal) => setProjectValue({ name: inputVal })}
          disabled={mode === "View"}
        />

        <InputTextArea
          label="Description"
          id="description"
          value={state.description}
          onChange={(inputVal) => setProjectValue({ description: inputVal })}
          disabled={mode === "View"}
        />

        <InputDate
          label="Start date"
          id="due-date"
          value={state.startDate}
          onChange={(inputVal) => setProjectValue({ dueDate: inputVal })}
          disabled={mode === "View"}
        />

        <InputDate
          label="End date"
          id="due-date"
          value={state.endDate}
          onChange={(inputVal) => setProjectValue({ dueDate: inputVal })}
          disabled={mode === "View"}
        />

        <InputBell
          label="Set Reminder"
          value={state.reminder}
          onChange={(inputVal) => setProjectValue({ reminder: inputVal })}
          disabled={mode === "View"}
        />

        <InputRadio
          label="Priority"
          id="priority"
          options={[
            { name: "Low", value: PRIORITY.LOW },
            { name: "Medium", value: PRIORITY.MEDIUM },
            { name: "High", value: PRIORITY.HIGH },
          ]}
          disabled={mode === "View"}
        />

        <InputSubmit
          label={
            mode + `${Boolean(selectDeliverable) ? "Deliverable" : "Project"}`
          }
          onClick={submit}
          disabled={mode === "View"}
        />
      </Form>
    </section>
  );
};

export default AddOrEditProject;
