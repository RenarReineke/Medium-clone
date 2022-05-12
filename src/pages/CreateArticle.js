import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleForm from '../components/ArticleForm';
import useFetch from '../hooks/useFetch';
import { CurrentUserContext } from '../contexts/currentUserContext';

const CreateArticle = () => {
  const apiUrl = '/articles';
  const [{ response, error }, doFetch] = useFetch(apiUrl);

  const initialValues = {
    title: '',
    body: '',
    descriptio: '',
    tagList: [],
  };

  const [currentUserState] = useContext(CurrentUserContext);
  const navigate = useNavigate;
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const handleSubmit = (arcticle) => {
    doFetch({ method: 'post', data: { arcticle } });
  };

  useEffect(() => {
    if (!response) return;
    setIsSuccessfullSubmit(true);
  }, [response]);

  if (!currentUserState.isLoggedIn) {
    navigate('/');
    return;
  }
  if (isSuccessfullSubmit) {
    navigate(`/articles/${response.arcticle.slug}`);
    return;
  }

  return (
    <div>
      <ArticleForm
        initialValues={initialValues}
        errors={(error && error.errors) || {}}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateArticle;
