import { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

const useAddOrEdit = (selectItem, setValues) => {
  const pathname = useParams()["*"];
  const mode = pathname.includes("edit")
    ? "Edit"
    : pathname.includes("add")
    ? "Add"
    : "View";

  useEffect(() => {
    Boolean(selectItem) && !pathname.includes("add") && setValues(selectItem);
  }, [selectItem, mode]);

  return { mode };
};

export default useAddOrEdit;
