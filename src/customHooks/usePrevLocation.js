import { useLocation } from "react-router";

const usePrevLocation = (mode = 'view') => {
    const location = useLocation();
    return {
        prevLocation : location.state?.prevLocation ?? location.pathname,
        mode,
    }
}

export default usePrevLocation