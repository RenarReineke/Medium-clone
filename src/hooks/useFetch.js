import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import useLocalStorage from './useLocalStorage';

export default (url) => {
  const baseUrl = 'https://conduit.productionready.io/api';
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState({});
  const [token] = useLocalStorage('token');

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      return;
    }
    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : '',
        },
      },
    };
    axios(baseUrl + url, requestOptions)
      .then((res) => {
        console.log('Fetch success', res);
        setIsLoading(false);
        setResponse(res.data);
      })
      .catch((error) => {
        console.log('Fetch error', error);
        setIsLoading(false);
        setError(error.response.data);
      });
  }, [isLoading, token, options, url]);

  return [{ response, error, isLoading }, doFetch];
};
