import { useState, useEffect, useReducer } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  editParticipantInvite,
  inviteParticipant,
  selectInviteStatus,
} from '../../features/teams/slice/inviteSlice';

import { useForm } from 'react-hook-form';
import LoadingSpinner from '../LoadingSpinner';

import Form, {
  InputCheckBox,
  InputRadio,
  InputSubmit,
  InputText,
} from '../Form';
import { ADMIN_RIGHTS, MEMBER_RIGHTS } from '../../features/teams/constants';
import HelperText from '../HelperText';

const reducer = (state, action) => {
  switch (action.type) {
    case 'setRole':
      return { ...state, role: action.payload };

    case 'setAdminRights/Leadership': {
      const { checked, value } = action.payload;

      return {
        ...state,
        adminRights: {
          ...state.adminRights,
          leadership: state.adminRights.leadership.map((item) =>
            item.value === value ? { ...item, checked } : item
          ),
        },
      };
    }

    case 'setAdminRights/Membership': {
      const { checked, value } = action.payload;

      return {
        ...state,
        adminRights: {
          ...state.adminRights,
          membership: state.adminRights.membership.map((item) =>
            item.value === value ? { ...item, checked } : item
          ),
        },
      };
    }

    case 'setMemberRights': {
      const { checked, value } = action.payload;

      return {
        ...state,
        memberRights: state.memberRights.map((item) =>
          item.value === value ? { ...item, checked } : item
        ),
      };
    }

    default:
      return state;
  }
};

const InviteForm = ({
  onClose,
  teamId,
  teamInvites,
  defaultValues = null,
  resetDefaultValues,
}) => {
  const invites = {
    isAny: teamInvites?.toMembership && teamInvites?.toLeadership,
    toLeadership: !teamInvites?.toMembership && teamInvites?.toLeadership,
    toMembership: teamInvites?.toMembership && !teamInvites?.toLeadership,
  };

  const formStatus = useSelector(selectInviteStatus)['inviteParticipant'];

  const [formResponse, setFormResponse] = useState(null);
  const [{ role, memberRights, adminRights }, dispatch] = useReducer(reducer, {
    role: invites.isAny
      ? null
      : invites.toLeadership
      ? 'toLeadership'
      : invites.toMembership
      ? 'toMembership'
      : null,
    adminRights: {
      leadership: Object.values(ADMIN_RIGHTS.leadership).map(
        ({ label, value }) => ({
          label,
          value,
          checked: false,
        })
      ),
      membership: Object.values(ADMIN_RIGHTS.membership).map(
        ({ label, value }) => {
          const obj = {
            label,
            value,
            checked: false,
          };

          return value !== 'promote' ? { ...obj, checked: true } : obj;
        }
      ),
    },
    memberRights: Object.values(MEMBER_RIGHTS).map(({ label, value }) => ({
      label,
      value,
      checked: true,
    })),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nameOrEmail: defaultValues?.nameOrEmail ?? '',
    },
  });

  const reduxDispatch = useDispatch();

  const onSubmit = async ({ nameOrEmail }) => {
    const setRightsVals = (rights) =>
      rights.filter(({ checked }) => checked).map(({ value }) => value);

    const participantRights =
      role === 'toLeadership'
        ? {
            adminRights: {
              leadership: setRightsVals(adminRights.leadership),
              membership: setRightsVals(adminRights.membership),
            },
          }
        : role === 'toMembership'
        ? {
            adminRights: {
              leadership: [],
              membership: [],
            },
            memberRights: setRightsVals(memberRights),
          }
        : null;

    try {
      if (participantRights && nameOrEmail) {
        const details = {
          nameOrEmail,
          teamId,
          role,
          ...participantRights,
        };

        const asyncThunkAction = defaultValues
          ? editParticipantInvite({
              inviteId: defaultValues.inviteId,
              ...details,
            })
          : inviteParticipant(details);

        await reduxDispatch(asyncThunkAction).unwrap();
      } else throw new Error('All fields are mandatory');

      setFormResponse({
        msg: `Participant invite was a success`,
        type: 'success',
      });
      resetDefaultValues();
    } catch (error) {
      setFormResponse({
        msg: `Participant invite failed | ${error}`,
        type: 'error',
      });
    }
  };

  useEffect(() => {
    if (formStatus === 'pending') {
      setFormResponse({
        msg: `Participant invite in Progress. Please wait`,
        type: 'inProgress',
      });
    }
  }, [formStatus]);

  useEffect(() => {
    if (defaultValues) {
      const {
        role,
        adminRights: { leadership, membership },
        memberRights,
      } = defaultValues;

      dispatch({ type: 'setRole', payload: role });

      const setDefaultItems = (items, actionType) => {
        items.forEach((item) => {
          dispatch({
            type: actionType,
            payload: { checked: true, value: item },
          });
        });
      };

      setDefaultItems(leadership, 'setAdminRights/Leadership');
      setDefaultItems(membership, 'setAdminRights/Membership');
      setDefaultItems(memberRights, 'setMemberRights');
    }
  }, [defaultValues]);

  return (
    <>
      {formStatus === 'pending' && <LoadingSpinner />}
      <section className="InviteParticipant AddNewItem main overLay">
        <Form
          className="Invite__Form"
          title="Participant Invite"
          onBackBtnClick={() => {
            onClose();
            resetDefaultValues();
          }}
        >
          {formResponse && <HelperText {...formResponse} />}
          <InputText
            label="Name Or Email"
            name="nameOrEmail"
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
            disabled={Boolean(defaultValues)}
          />

          <InputRadio
            label="Role"
            name="role"
            defaultValue={role}
            onChange={(inputVal) => {
              dispatch({ type: 'setRole', payload: inputVal });
            }}
            options={[
              { name: 'Member', value: 'toMembership' },
              { name: 'Team Leader', value: 'toLeadership' },
            ]}
            disabled={!invites.isAny}
          />

          {role === 'toLeadership' && (
            <>
              {
                <>
                  <p className="label__title">
                    Administrative Rights | Leadership
                  </p>
                  {adminRights.leadership.map(({ label, value, checked }) => {
                    return (
                      <div key={`adminRights/leadership/${value}`}>
                        <InputCheckBox
                          id={`adminRights/leadership/${value}`}
                          name="adminRights/leadership"
                          value={value}
                          label={label}
                          checked={checked}
                          onChange={(inputVal) => {
                            dispatch({
                              type: 'setAdminRights/Leadership',
                              payload: inputVal,
                            });
                          }}
                          disabled={false}
                        />
                      </div>
                    );
                  })}
                </>
              }

              {
                <>
                  <p className="label__title">
                    Administrative Rights | Membership
                  </p>
                  {adminRights.membership.map(({ label, value, checked }) => {
                    return (
                      <div key={`adminRights/membership/${value}`}>
                        <InputCheckBox
                          id={`adminRights/membership/${value}`}
                          name="adminRights/membership"
                          value={value}
                          label={label}
                          checked={checked}
                          onChange={(inputVal) => {
                            dispatch({
                              type: 'setAdminRights/Membership',
                              payload: inputVal,
                            });
                          }}
                          disabled={false}
                        />
                      </div>
                    );
                  })}
                </>
              }
            </>
          )}

          {role === 'toMembership' && (
            <>
              {teamInvites?.toMembership && (
                <>
                  <p className="label__title">Member Rights</p>
                  {memberRights.map(({ label, value, checked }) => {
                    return (
                      <div key={`memberRights/${value}`}>
                        <InputCheckBox
                          id={`memberRights/${value}`}
                          name="memberRights"
                          value={value}
                          label={label}
                          checked={checked}
                          onChange={(inputVal) => {
                            dispatch({
                              type: 'setMemberRights',
                              payload: inputVal,
                            });
                          }}
                          disabled={false}
                        />
                      </div>
                    );
                  })}
                </>
              )}
            </>
          )}

          {role && <InputSubmit label="OK" onClick={handleSubmit(onSubmit)} />}
        </Form>
      </section>
    </>
  );
};

export default InviteForm;
