import { useEffect, useContext } from 'react';
import useFetch from '../hooks/useFetch';
import { CurrentUserContext } from '../contexts/currentUserContext';
import useLocalStorage from '../hooks/useLocalStorage';

const CurrentUserChecker = ({ children }) => {
  const [{ response }, doFetch] = useFetch('/user');
  const [, setCurrentUser] = useContext(CurrentUserContext);
  const [token] = useLocalStorage('token');

  useEffect(() => {
    if (!token) {
      setCurrentUser((state) => ({
        ...state,
        isLoggedIn: false,
      }));
      return;
    }
    doFetch();
    setCurrentUser((state) => ({
      ...state,
      isLoading: true,
    }));
  }, [setCurrentUser, doFetch]);

  useEffect(() => {
    if (!response) {
      return;
    }
    setCurrentUser((state) => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: response.user,
    }));
  }, [response]);
  return children;
};

export default CurrentUserChecker;
