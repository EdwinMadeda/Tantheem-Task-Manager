import { Link } from 'react-router-dom';
const CustomLink = (props) => {
  return (
    <Link
      className={props.className}
      to={props.to}
      state={props.state}
      onClick={props.onClick}
    >
      {props.children}
    </Link>
  );
};

export default CustomLink;
