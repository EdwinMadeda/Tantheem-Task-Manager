import { useEffect, useState } from 'react';
import { selectProjectsStatus } from '../projectsSlice';

import Form, {
  InputText,
  InputTextArea,
  InputDate,
  InputSubmit,
} from '../../../reusableComponents/Form';
import { useNavigate } from 'react-router';
import useCacheValues from '../../../customHooks/useCacheValues';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import LoadingSpinner from '../../../reusableComponents/LoadingSpinner';

const ProjectsForm = ({
  formTitle,
  formAction,
  submitLabel,
  defaultValues = {},
  disabled = false,
  reduxDispatch,
}) => {
  const { cachedValues, resetCacheValues } = useCacheValues(defaultValues);

  const navigate = useNavigate();
  const formStatus = useSelector(selectProjectsStatus)[formAction];
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
      <section className="AddOrEditProject AddNewItem main">
        <Form className="AddOrEditProject__Form" title={formTitle}>
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

export default ProjectsForm;
