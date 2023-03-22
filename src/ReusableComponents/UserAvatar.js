import defaultUserImg from '../assets/images/default_user_img.png';
import Avatar from 'react-avatar-edit';
import { useEffect, useState } from 'react';

const UserAvatar = ({
  src = null,
  width = 36,
  height = 36,
  style,
  onClick,
  title = '',
}) => {
  return (
    <img
      src={src ?? defaultUserImg}
      alt="User Avatar"
      className="User-avatar"
      height={width}
      width={height}
      style={style}
      onClick={onClick}
      title={title}
    />
  );
};

export const AvatarSelector = (props) => {
  const [matches, setMatches] = useState(
    window.matchMedia('(min-width: 568px)').matches
  );

  useEffect(() => {
    window
      .matchMedia('(min-width: 568px)')
      .addEventListener('change', (e) => setMatches(e.matches));
  }, []);

  const width = !matches ? 250 : props?.width ?? 400;
  const height = !matches ? 180 : props?.height ?? 200;

  return (
    <div
      className="Avatar-Selector"
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <Avatar
        width={width}
        height={height}
        src={null}
        lineWidth={5}
        shadingColor="#333"
        closeIconColor="#333"
        shadingOpacity={0.8}
        exportAsSquare={true}
        exportQuality={1}
        backgroundColor="#fff"
        mimeTypes="image/jpeg,image/png,image/gif,image/svg,image/tiff"
        {...props}
      />
    </div>
  );
};

export default UserAvatar;
