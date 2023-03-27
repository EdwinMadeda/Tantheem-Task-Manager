import { useCallback, useEffect, useReducer } from 'react';
import { PRIORITY } from '../../../utils/constants';

import Form, {
  InputText,
  InputTextArea,
  InputBell,
  InputRadio,
  InputDate,
  InputSubmit,
} from '../../../reusableComponents/Form';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';
import useCacheValues from '../../../customHooks/useCacheValues';

const reducer = (state, action) => {
  switch (action.type) {
    case 'setValue':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const TasksForm = ({
  formTitle,
  submitLabel,
  defaultValues = {},
  disabled = false,
  reduxDispatch,
}) => {
  const { cachedValues, resetCacheValues } = useCacheValues(defaultValues);

  const [{ reminder, priority }, dispatch] = useReducer(reducer, {
    reminder: cachedValues.reminder ?? false,
    priority: cachedValues.priority ?? PRIORITY.LOW,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: cachedValues,
  });

  const onSubmit = (fieldData) => {
    try {
      reduxDispatch({ ...fieldData, reminder, priority }).unwrap();
      resetCacheValues();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="AddOrEditTask AddNewItem main">
      <Form className="AddOrEditTask__Form" title={formTitle}>
        <InputText
          label="Name"
          name="name"
          type="text"
          errors={errors}
          register={register}
          rules={{
            required: 'This field is required.',
            minLength: {
              value: 2,
              message: "This field shouldn't be less than 2 characters.",
            },
          }}
        />
        <InputTextArea
          label="Description"
          name="description"
          errors={errors}
          register={register}
          rules={{}}
        />

        {/* <InputSelect
          label="Group Into"
          id="group-into"
          value={state.startDate}
          onChange={(inputVal) => setValue({ startDate: inputVal })}
          disabled={disabled}
        /> */}

        <InputDate
          label="Start date"
          name="startDate"
          errors={errors}
          register={register}
          rules={{}}
        />

        <InputDate
          label="End date"
          name="endDate"
          errors={errors}
          register={register}
          rules={{}}
        />

        <InputBell
          label="Set Reminder"
          value={reminder}
          onChange={(inputVal) =>
            dispatch({ type: 'setValue', payload: { reminder: inputVal } })
          }
          disabled={disabled}
        />

        <InputRadio
          label="Priority"
          name="priority"
          defaultValue={priority}
          onChange={(inputVal) =>
            dispatch({ type: 'setValue', payload: { priority: inputVal } })
          }
          options={[
            { name: 'Low', value: PRIORITY.LOW },
            { name: 'Medium', value: PRIORITY.MEDIUM },
            { name: 'High', value: PRIORITY.HIGH },
          ]}
          disabled={disabled}
        />

        <InputSubmit
          label={submitLabel}
          onClick={handleSubmit(onSubmit)}
          disabled={disabled}
        />
      </Form>
    </section>
  );
};

export default TasksForm;
