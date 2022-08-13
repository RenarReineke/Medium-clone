import { useEffect, useContext } from 'react';
import useFetch from '../hooks/useFetch';
import { CurrentUserContext } from '../contexts/currentUserContext';
import useLocalStorage from '../hooks/useLocalStorage';

const CurrentUserChecker = ({ children }) => {
  const [{ response }, doFetch] = useFetch('/user');
  const [, dispath] = useContext(CurrentUserContext);
  const [token] = useLocalStorage('token');

  useEffect(() => {
    if (!token) {
      dispath({ type: 'SET_UNAUTHORIZED' });
      // setCurrentUser((state) => ({
      //   ...state,
      //   isLoggedIn: false,
      // }));
      return;
    }
    doFetch();
    dispath({ type: 'LOADING' });
    // setCurrentUser((state) => ({
    //   ...state,
    //   isLoading: true,
    // }));
  }, [doFetch]);

  useEffect(() => {
    if (!response) {
      return;
    }
    dispath({ type: 'SET_AUTHORIZED', payload: response.user });
    // setCurrentUser((state) => ({
    //   ...state,
    //   isLoading: false,
    //   isLoggedIn: true,
    //   currentUser: response.user,
    // }));
  }, [response]);
  return children;
};

export default CurrentUserChecker;
