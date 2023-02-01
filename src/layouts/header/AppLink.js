import CustomLink from "../../reusableComponents/CustomLink";

const AppLink = ({ item, dispatch, setIsMobile }) => {
  const onClick = () => {
    dispatch({ type: "setActive", payload: item.id });
    dispatch({ type: "setCurrPath", payload: item.path });
    setIsMobile(false);
  };
  const statusActive = item.isActive ? "active" : "";
  return (
    <li className={`App-link ${statusActive}`} onClick={onClick}>
      <CustomLink to={item.path}>{item.label}</CustomLink>
    </li>
  );
};

export default AppLink;
