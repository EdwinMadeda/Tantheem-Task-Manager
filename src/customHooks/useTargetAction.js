import { useEffect } from "react";

const useTargetAction = (callback, ref, eventName) => {

    if(ref?.current){
        window.addEventListener( eventName , e =>{
               const result = ref?.current?.contains(e.target);
                    !result && callback(result);
        });
    }

}

export default useTargetAction