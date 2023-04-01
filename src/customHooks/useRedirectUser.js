import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';

const useRedirectUser = (condition, URL) => {
  const navigate = useNavigate();
  const redirectUser = useCallback(() => {
    navigate(URL);
  }, [URL, navigate]);

  useEffect(() => {
    if (condition) redirectUser();
  }, [condition, redirectUser]);
};
export default useRedirectUser;
