import { useEffect } from "react";
import { useParams, useLocation } from "react-router";
import { useSelector } from "react-redux";

const useAddOrEdit = (id, selector, setValues) => {

    const location = useLocation();
    const selectItemId = useParams()[id];
    const selectItem = useSelector(state => selector(state, Number(selectItemId)));

    useEffect(()=>{
  
      Boolean(selectItem) && 
      setValues(selectItem);
  
    },[selectItem]);

    return location.state?.mode;

}

export default useAddOrEdit