import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import {
  deleteParticipantInvite,
  selectInviteStatus,
  selectSentInvites,
} from '../../features/teams/slice/inviteSlice';
import DeleteBtn from '../DeleteBtn';

const SentInvites = ({ inviteOnClick }) => {
  const invites = useSelector(selectSentInvites);
  const deleteInviteStatus =
    useSelector(selectInviteStatus)['deleteParticipantInvite'];

  return (
    <ul className={`MemberShare__SentInvites`}>
      {invites.length === 0 ? (
        <p className="no-Items-msg">No Items on display</p>
      ) : (
        <>
          {invites.map((item) => (
            <li className="SentInvite" key={item.id}>
              <p
                className="SentInvite__Text"
                onClick={() =>
                  inviteOnClick({
                    inviteId: item.id,
                    nameOrEmail: item.participant.name,
                    role:
                      item.role === 'teamLead'
                        ? 'toLeadership'
                        : item.role === 'member'
                        ? 'toMembership'
                        : null,
                    adminRights: item.adminRights,
                    memberRights: item.memberRights,
                  })
                }
              >
                <strong>Invitee: </strong>
                <span>{item.participant.name},</span>
                <strong>Date Sent: </strong>
                <span>
                  {format(new Date(item.createdAt), `E do MMM,yyyy - h:mm a`)},
                </span>
                <strong>Status: </strong>
                <span> {item.status} </span>
              </p>

              <DeleteBtn
                action={deleteParticipantInvite(item.id)}
                status={deleteInviteStatus}
              />
            </li>
          ))}
        </>
      )}
    </ul>
  );
};
export default SentInvites;
