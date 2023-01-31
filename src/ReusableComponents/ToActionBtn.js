import CustomLink from "./CustomLink";

const ToActionBtn = ({ label, linkTo = "/" }) => {
  return (
    <CustomLink className="toActionBtn btn" to={linkTo}>
      {label}
    </CustomLink>
  );
};

export default ToActionBtn;
