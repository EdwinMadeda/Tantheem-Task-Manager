import { BsBell, BsBellFill, BsBellSlash } from 'react-icons/bs';
import { useState, useRef } from 'react';
import useTargetAction from '../customHooks/useTargetAction';

const Bell = ({
  className,
  status = false,
  onClick,
  title = '',
  disabled = false,
}) => {
  const [isHover, setIsHover] = useState(false);

  const ref = useRef(null);
  const onBellClick = () => {
    onClick(!status);
    ref.current.classList[status ? 'add' : 'remove']('animate');
  };

  useTargetAction(setIsHover, ref, 'mouseover');

  return (
    <div
      className={`${className} icon bellIcon`}
      onClick={onBellClick}
      ref={ref}
      title={title}
    >
      {!status ? (
        <BsBellSlash />
      ) : (
        <>{isHover ? <BsBellFill className="fill" /> : <BsBell />}</>
      )}
    </div>
  );
};

export default Bell;
