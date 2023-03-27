import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router';

const useCacheValues = (defaultValues) => {
  const { pathname } = useLocation();
  const cachedValues =
    JSON.parse(localStorage.getItem(pathname)) ?? defaultValues;

  const setCacheValues = useCallback(() => {
    localStorage.setItem(pathname, JSON.stringify(cachedValues));
  }, [cachedValues, pathname]);

  useEffect(() => {
    setCacheValues();
  }, [setCacheValues, pathname]);

  return {
    cachedValues,
    resetCacheValues: () => {
      localStorage.removeItem(pathname);
    },
  };
};
export default useCacheValues;
