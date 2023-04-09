import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import Form, {
  InputText,
  InputTextArea,
  InputSubmit,
} from '../../../reusableComponents/Form';
import useCacheValues from '../../../customHooks/useCacheValues';
import { useSelector } from 'react-redux';
import { selectTeamsStatus } from '../slice/teamsSlice';
import { useForm } from 'react-hook-form';
import LoadingSpinner from '../../../reusableComponents/LoadingSpinner';

const TeamsForm = ({
  formTitle,
  formAction,
  submitLabel,
  defaultValues = {},
  disabled = false,
  reduxDispatch,
  isOverlay,
  onClose,
}) => {
  const { cachedValues, resetCacheValues } = useCacheValues(defaultValues);

  const navigate = useNavigate();
  const formStatus = useSelector(selectTeamsStatus)[formAction];
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
      <section
        className={`AddOrEditTeam AddNewItem main ${
          isOverlay ? 'overlay' : ''
        }`}
      >
        <Form
          className="AddOrEditTeam__Form"
          title={formTitle}
          onBackBtnClick={onClose}
        >
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

export default TeamsForm;
