import { useSelector } from "react-redux";
import { selectAllProjects } from "../projects/projectsSlice";
import { selectAllTasks } from "../tasks/taskSlice";
import { selectAllTeams } from "../teams/teamsSlice";
import SearchFeature from "./SearchFeature";
import { selectSearchText } from "./searchSlice";
import { searchItems } from "../../constants";

import "./Search.css";

const Search = () => {
  const searchText = useSelector(selectSearchText).toLowerCase();

  const tasks = searchItems(useSelector(selectAllTasks), searchText);
  const projects = searchItems(useSelector(selectAllProjects), searchText);
  const teams = searchItems(useSelector(selectAllTeams), searchText);

  const initialItems = [
    {
      label: "Tasks",
      path: "/mytasks",
      subName: "subTasks",
      subLabel: "Sub Tasks",
      contents: searchItems(useSelector(selectAllTasks), searchText),
    },
    {
      label: "Projects",
      path: "/myprojects",
      subName: "deliverables",
      subLabel: "Sub Tasks",
      contents: searchItems(useSelector(selectAllProjects), searchText),
    },
    {
      label: "Teams",
      path: "/teams",
      subName: "",
      subLabel: "",
      contents: searchItems(useSelector(selectAllTeams), searchText),
    },
  ];

  return (
    <section className="Search main">
      {initialItems.map((item) => (
        <SearchFeature
          key={item.label}
          label={item.label}
          contents={item.contents}
          path={item.path}
          subName={item.subName}
          subLabel={item.subLabel}
        />
      ))}
    </section>
  );
};

export default Search;
