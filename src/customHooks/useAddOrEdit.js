import { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { getPrevLocation } from "../features/prevLocation/prevLocationSlice";

const useAddOrEdit = (id, selector, setValues) => {

    const selectItemId = useParams()[id];
    const selectItem = useSelector(state => selector(state, Number(selectItemId)));

    useEffect(()=>{
  
      Boolean(selectItem) && 
      setValues(selectItem);
  
    },[selectItem]);

    const { mode } = useSelector(getPrevLocation);
    return mode;

}

export default useAddOrEdit