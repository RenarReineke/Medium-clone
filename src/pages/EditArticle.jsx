import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArticleForm from '../components/ArticleForm';
import { CurrentUserContext } from '../contexts/currentUserContext';
import useFetch from '../hooks/useFetch';

const EditArticle = () => {
  const navigate = useNavigate();
  const slug = useParams().slug;
  const apiUrl = `/articles/${slug}`;
  const [currentUserState] = useContext(CurrentUserContext);

  const [{ response: fetchArticleResponse }, doFetchArticle] = useFetch(apiUrl);
  const [
    { response: updateArticleResponse, error: updateArticleError },
    doUpdateArticle,
  ] = useFetch(apiUrl);

  const [initialValues, setInitialValues] = useState(null);

  const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);

  const handleSubmit = (article) => {
    console.log('hadlSubmit: ', article);
    doUpdateArticle({
      method: 'put',
      data: { article },
    });
  };

  useEffect(() => {
    doFetchArticle();
  }, [doFetchArticle]);

  useEffect(() => {
    if (!fetchArticleResponse) return;

    setInitialValues({
      title: fetchArticleResponse.title,
      description: fetchArticleResponse.description,
      body: fetchArticleResponse.body,
      tagList: fetchArticleResponse.tagList,
    });
  }, [fetchArticleResponse]);

  useEffect(() => {
    if (!updateArticleResponse) return;
    setIsSuccessfulSubmit(true);
  }, [updateArticleResponse]);

  if (currentUserState.isLoggedIn === false) {
    navigate('/');
    return;
  }

  if (isSuccessfulSubmit) {
    navigate(`/articles/${slug}`);
    return;
  }

  return (
    <ArticleForm
      onSubmit={handleSubmit}
      errors={(updateArticleError && updateArticleError.errors) || {}}
      initialValues={initialValues}
    />
  );
};

export default EditArticle;
