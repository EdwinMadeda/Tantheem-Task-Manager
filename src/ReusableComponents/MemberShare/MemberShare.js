import { FaUsers } from 'react-icons/fa';
import { GrSend } from 'react-icons/gr';
import { BiMailSend } from 'react-icons/bi';
import { BiHide } from 'react-icons/bi';
import { useMemo, useState } from 'react';
import MemberShareParticipants from './MemberShareParticipants';
import InviteForm from './InviteForm';
import './MemberShare.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';
import SentInvites from './Invites';

const MemberShare = ({ selectTeam }) => {
  const { id: teamId, createdBy, ledBy, members } = selectTeam;
  const participants = useMemo(() => ({ ledBy, members }), [ledBy, members]);
  const [participantsVisible, setParticipantsVisible] = useState(false);
  const [inviteFormVisible, setInviteFormVisible] = useState(false);
  const [sentInvitesVisible, setSentInvitesVisible] = useState(false);
  const [inviteDefaultValues, setInviteDefaultValues] = useState(null);

  const {
    info: { _id: userId },
  } = useSelector(selectUser);
  let optionEntries = { leadership: null, membership: null },
    teamInvites = null;

  if (participants.ledBy !== null) {
    const {
      adminRights: { leadership, membership, invites },
    } = participants.ledBy.find((item) => item?.participant?._id === userId);

    optionEntries = {
      leadership: leadership.map((item, index) => ({
        id: index,
        name: item,
        onClick: (_, userId) => {},
      })),
      membership: membership.map((item, index) => ({
        id: index,
        name: item,
        onClick: (_, userId) => {},
      })),
    };

    teamInvites = invites;
  }

  return (
    <>
      <div className="MemberShare">
        <button
          className="MembersBtn MemberShare__Btn"
          onClick={() => {
            setParticipantsVisible((prev) => !prev);
            setSentInvitesVisible(false);
          }}
        >
          {participantsVisible ? (
            <BiHide className="icon" />
          ) : (
            <FaUsers className="icon" />
          )}
          <p>Participants</p>
        </button>

        {Boolean(teamInvites) && (
          <>
            <button
              className="ShareBtn MemberShare__Btn Invite__Btn"
              onClick={() => {
                setInviteFormVisible(true);
                setInviteDefaultValues(null);
              }}
            >
              <GrSend className="icon" />
              <p>Invite</p>
            </button>
            <button
              className="ShareBtn MemberShare__Btn Invite__Btn"
              onClick={() => {
                setSentInvitesVisible((prev) => !prev);
                setParticipantsVisible(false);
              }}
            >
              <BiMailSend className="icon" />
              <p>Sent Invites</p>
            </button>
          </>
        )}

        {participantsVisible && (
          <div>
            {participants.ledBy !== null && (
              <MemberShareParticipants
                items={participants.ledBy}
                type="ledBy"
                options={optionEntries.leadership}
              />
            )}

            {participants.members !== null && (
              <MemberShareParticipants
                items={participants.members}
                type="members"
                options={optionEntries.membership}
              />
            )}
          </div>
        )}

        {inviteFormVisible && Boolean(teamInvites) ? (
          <InviteForm
            onClose={() => setInviteFormVisible(false)}
            teamId={teamId}
            teamInvites={teamInvites}
            defaultValues={inviteDefaultValues}
            resetDefaultValues={() => setInviteDefaultValues(null)}
          />
        ) : (
          <></>
        )}

        {sentInvitesVisible && (
          <SentInvites
            inviteOnClick={(defaultValues) => {
              setInviteFormVisible(true);
              setInviteDefaultValues(defaultValues);
            }}
          />
        )}
      </div>
    </>
  );
};

export default MemberShare;
