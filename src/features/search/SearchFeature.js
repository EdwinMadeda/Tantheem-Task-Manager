import React from "react";
import CustomLink from "../../reusableComponents/CustomLink";

import { useSelector } from "react-redux";
import { selectSearchText } from "./searchSlice";
import { searchItems } from "../../constants";

const SearchFeature = ({
  label,
  contents,
  path,
  subName = "",
  subLabel = "",
}) => {
  const searchText = useSelector(selectSearchText);
  const sub = searchItems(contents[0]?.[subName] ?? [], searchText);
  const SearchFeatureItem = ({ item }) => {
    return (
      <li>
        <h2 className="SearchFeature__ItemName">
          <CustomLink to={`${path}/${item.id}`}>{item.name}</CustomLink>
        </h2>
        <p className="SearchFeature__ItemDescription">{item.description}</p>
        {sub.length > 0 && (
          <div className="SearchFeature__MarchingSub">
            <h3 className="SearchFeature__MarchingSub_Title">
              Marching {subLabel} ({sub.length})
            </h3>
          </div>
        )}
      </li>
    );
  };

  return (
    <>
      {contents.length > 0 && (
        <div className="SearchFeature">
          <h2 className="SearchFeature__Title">{label}</h2>
          <ul className="SearchFeature__Content">
            {contents.map((item) => (
              <SearchFeatureItem key={item.id} item={item} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default SearchFeature;
