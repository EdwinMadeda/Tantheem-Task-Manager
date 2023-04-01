import { useEffect, useReducer, useState } from 'react';
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
import useCacheValues from '../../../customHooks/useCacheValues';
import { useSelector } from 'react-redux';
import { selectTasksStatus } from '../taskSlice';
import { useNavigate } from 'react-router';
import LoadingSpinner from '../../../reusableComponents/LoadingSpinner';

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
  formAction,
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

  const navigate = useNavigate();
  const formStatus = useSelector(selectTasksStatus)[formAction];
  const [formResponse, setFormResponse] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: cachedValues,
  });

  const onSubmit = async (fieldData) => {
    try {
      const values = {
        name: fieldData.name,
        description: fieldData.description,
        startDate: fieldData.startDate,
        endDate: fieldData.endDate,
        reminder,
        priority,
      };

      await reduxDispatch({ ...values });
      resetCacheValues();
      navigate(-1);
    } catch (error) {
      setFormResponse({ msg: `${formTitle} failed | ${error}`, type: 'error' });
    }
  };

  useEffect(() => {
    if (formStatus === 'pending') {
      setFormResponse({
        msg: `${formTitle} in Progress. Please wait`,
        type: 'inProgress',
      });
    }
  }, [formStatus, formTitle]);

  return (
    <>
      {formStatus === 'pending' && <LoadingSpinner />}
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
    </>
  );
};

export default TasksForm;
