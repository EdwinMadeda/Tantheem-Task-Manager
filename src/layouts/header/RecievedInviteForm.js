import { useDispatch, useSelector } from 'react-redux';
import { ADMIN_RIGHTS, MEMBER_RIGHTS } from '../../features/teams/constants';
import Form from '../../reusableComponents/Form';
import { InputSubmit } from '../../reusableComponents/Form';
import {
  acceptInvite,
  declineInvite,
  selectInviteStatus,
} from '../../features/teams/slice/inviteSlice';
import LoadingSpinner from '../../reusableComponents/LoadingSpinner';
import { useState } from 'react';
import HelperText from '../../reusableComponents/HelperText';
import { useEffect } from 'react';

const RecievedInviteForm = ({ invite, onClose }) => {
  const dispatch = useDispatch();
  const {
    sentBy,
    inviteTo,
    role,
    memberRights,
    adminRights: { leadership, membership },
  } = invite;

  const setRightsVals = (constVal, inviteVal) => {
    inviteVal = inviteVal ?? [];

    return Object.values(constVal).filter(({ value }) =>
      inviteVal.find((item) => item === value)
    );
  };

  const selectAdminRights = {
    leadership: setRightsVals(ADMIN_RIGHTS.leadership, leadership),
    membership: setRightsVals(ADMIN_RIGHTS.membership, membership),
  };

  const selectMemberRights = setRightsVals(MEMBER_RIGHTS, memberRights);

  const formStatus = useSelector(selectInviteStatus)['acceptOrDeclineInvite'];
  const [formResponse, setFormResponse] = useState(null);

  useEffect(() => {
    if (formStatus === 'pending') {
      setFormResponse({
        msg: `Operation in Progress. Please wait`,
        type: 'inProgress',
      });
    }
  }, [formStatus]);

  const onAccepted = async () => {
    try {
      await dispatch(acceptInvite(invite)).unwrap();
      setFormResponse({
        msg: `Participant Invite Acceptance was a success`,
        type: 'success',
      });
    } catch (err) {
      setFormResponse({
        msg: `Participant Acceptance failed`,
        type: 'error',
      });
    }
  };

  const onDeclined = async () => {
    try {
      await dispatch(declineInvite(invite.id)).unwrap();
      setFormResponse({
        msg: `Participant Invite Decline was a success`,
        type: 'success',
      });
    } catch (err) {
      setFormResponse({
        msg: `Participant Decline failed`,
        type: 'error',
      });
    }
  };

  return (
    <>
      {formStatus === 'pending' && <LoadingSpinner />}
      <section className="ReceivedInvite AddNewItem main overLay">
        <Form
          className="ReceivedInvite__Form"
          title="Participant Invite"
          onBackBtnClick={onClose}
        >
          {formResponse && <HelperText {...formResponse} />}
          <p className="ReceivedInvite__Intro">
            {sentBy.name} is extending an invitation for you to join{' '}
            {inviteTo.name} as a {role}.
          </p>
          <div className="ReceivedInvite__Content">
            {role === 'teamLead' && (
              <>
                <p className="ReceivedInvite__Rights__Title label__title">
                  Administrative Rights | Leadership
                </p>
                <ol className="ReceivedInvite__Rights">
                  {selectAdminRights.leadership.map(({ label, value }) => {
                    return (
                      <li
                        key={`adminRights/leadership/${value}`}
                        className="ReceivedInvite__Right"
                      >
                        {label}
                      </li>
                    );
                  })}
                  {selectAdminRights.leadership.length === 0 && <p>None</p>}
                </ol>

                <p className="ReceivedInvite__Rights__Title label__title">
                  Administrative Rights | Membership
                </p>
                <ol className="ReceivedInvite__Rights">
                  {selectAdminRights.membership.map(({ label, value }) => {
                    return (
                      <li
                        key={`adminRights/membership/${value}`}
                        className="ReceivedInvite__Right"
                      >
                        {label}
                      </li>
                    );
                  })}
                  {selectAdminRights.membership.length === 0 && <p>None</p>}
                </ol>
              </>
            )}

            {role === 'member' && (
              <>
                <p className="ReceivedInvite__Rights__Title label__title">
                  Member Rights
                </p>
                <ol className="ReceivedInvite__Rights">
                  {selectMemberRights.map(({ label, value }) => {
                    return (
                      <li
                        key={`memberRights/${value}`}
                        className="ReceivedInvite__Right"
                      >
                        {label}
                      </li>
                    );
                  })}
                  {selectMemberRights.length === 0 && <p>None</p>}
                </ol>
              </>
            )}
          </div>

          <div className="ReceivedInvite__SubmitBtns">
            <InputSubmit label="Accept" onClick={onAccepted} />
            <InputSubmit label="Decline" onClick={onDeclined} />
          </div>
        </Form>
      </section>
    </>
  );
};
export default RecievedInviteForm;
