import { useEffect, useReducer, useState } from 'react';
import { selectProjectsStatus } from '../projectsSlice';

import Form, {
  InputText,
  InputTextArea,
  InputDate,
  InputSubmit,
  InputRadio,
  InputSelect,
} from '../../../reusableComponents/Form';
import { useNavigate } from 'react-router';
import useCacheValues from '../../../customHooks/useCacheValues';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import LoadingSpinner from '../../../reusableComponents/LoadingSpinner';
import { selectAllTeams } from '../../teams/slice/teamsSlice';
import { selectUser } from '../../user/userSlice';
import AddBtn from '../../../reusableComponents/AddBtn';
import AddTeam from '../../teams/addOrEdit/AddTeam';

const ProjectsForm = ({
  formTitle,
  formAction,
  submitLabel,
  defaultValues = {},
  disabled = false,
  reduxDispatch,
}) => {
  const { cachedValues, resetCacheValues } = useCacheValues(defaultValues);
  const [{ projectType, teamId, isCreateTeam }, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'setProjectType':
          return { ...state, projectType: action.payload };
        case 'setTeamId':
          return { ...state, teamId: action.payload };
        case 'setIscreateTeam':
          const { isCreateTeam, teamId = null } = action.payload;

          return { ...state, isCreateTeam };
        default:
          return state;
      }
    },
    {
      projectType: 'individual',
      teamId: null,
      isCreateTeam: false,
    }
  );

  const navigate = useNavigate();
  const formStatus = useSelector(selectProjectsStatus)[formAction];
  const [formResponse, setFormResponse] = useState(null);

  const {
    info: { _id: userId },
  } = useSelector(selectUser);
  const createdTeams = useSelector(selectAllTeams).filter(
    ({ createdBy }) => createdBy._id === userId
  );

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

          <InputRadio
            label="Project Type"
            name="projectType"
            defaultValue={projectType}
            onChange={(inputVal) => {
              dispatch({ type: 'setProjectType', payload: inputVal });
            }}
            options={[
              { name: 'Individual', value: 'individual' },
              { name: 'Team Based', value: 'teamBased' },
            ]}
            disabled={disabled}
          />

          {projectType === 'teamBased' && (
            <>
              <InputSelect
                label="Team Incharge"
                id="teamIncharge"
                name="teamIncharge"
                value={teamId}
                options={createdTeams.map(({ id, name }) => ({
                  label: name,
                  value: id,
                }))}
                onChange={(inputVal) => {
                  dispatch({ type: 'setTeamId', payload: inputVal });
                }}
                placeholder="Select a team"
                disabled={disabled}
              />
              <AddBtn
                label="Create Team"
                onClick={() => {
                  dispatch({
                    type: 'setIscreateTeam',
                    payload: { isCreateTeam: true },
                  });
                }}
              />
            </>
          )}

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
      {isCreateTeam && (
        <AddTeam
          isOverlay={true}
          onClose={(teamId = null) =>
            dispatch({
              type: 'setIscreateTeam',
              payload: { isCreateTeam: false, teamId },
            })
          }
        />
      )}
    </>
  );
};

export default ProjectsForm;
