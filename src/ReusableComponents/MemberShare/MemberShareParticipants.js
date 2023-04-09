import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';
import DotsMenu from '../DotsMenu';
import UserAvatar from '../UserAvatar';
import { useRef } from 'react';
import useTargetAction from '../../customHooks/useTargetAction';

const MemberShareParticipants = ({ items, type, options }) => {
  const SelectItems = items.filter((item) => item);
  const { info: user } = useSelector(selectUser);

  return (
    <ul className={`MemberShare__Participants ${type}`}>
      {SelectItems.length === 0 ? (
        <p className="no-Items-msg">No Items on display</p>
      ) : (
        <>
          {SelectItems.map((item) => {
            const { participant } = item;

            return (
              <li className="Participant" key={participant._id}>
                {user.name !== participant.name && options?.length !== 0 && (
                  <DotsMenu options={options} targetId={item._id} />
                )}
                <UserAvatar />
                <span className="Username">
                  {user.name === participant.name ? 'Me' : participant.name}
                </span>
              </li>
            );
          })}
        </>
      )}
    </ul>
  );
};

export default MemberShareParticipants;
