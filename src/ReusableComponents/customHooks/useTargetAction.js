import { useEffect } from "react";

const useTargetAction = (callback, ref, eventName) => {

    useEffect(()=>{
        if(ref?.current){
            window.addEventListener( eventName , e =>{
                    callback(ref?.current?.contains(e.target))
            });
        }
    },[ref]);

}

export default useTargetAction