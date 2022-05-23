import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ErrorMessages from '../components/ErrorMessages';
import Loading from '../components/Loading';
import TagList from '../components/TagList';
import useFetch from '../hooks/useFetch';
import { CurrentUserContext } from '../contexts/currentUserContext';

const Article = () => {
  let params = useParams();
  let navigate = useNavigate();
  const apiUrl = `/articles/${params.slug}`;
  const [currentUserState] = useContext(CurrentUserContext);
  const [isSuccessfullDelete, setIsSuccessfullDelete] = useState(false);

  const [
    {
      response: fetchArticleResponse,
      error: fetchArticleError,
      isLoading: fetchArticleIsLoading,
    },
    doFetch,
  ] = useFetch(apiUrl);

  const [{ response: deleteArticleResponse }, doDeleteArticle] =
    useFetch(apiUrl);

  const isAuthor = () => {
    if (!fetchArticleResponse || !currentUserState.isLoggedIn) return;
    return (
      fetchArticleResponse.article.author.username ===
      currentUserState.currentUser.username
    );
  };

  const deleteArticle = () => {
    doDeleteArticle({ method: 'delete' });
  };

  console.log('isAuthor :', isAuthor());

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (!deleteArticleResponse) return;
    setIsSuccessfullDelete(true);
  }, [deleteArticleResponse]);

  if (isSuccessfullDelete) {
    navigate('/');
  }

  return (
    <div className="article-page">
      <div className="banner">
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="container">
            <h1>{fetchArticleResponse.article.title}</h1>
            <div className="article-meta">
              <Link
                to={`/profiles/${fetchArticleResponse.article.author.username}`}
              >
                <img
                  src={`/profiles/${fetchArticleResponse.article.author.image}`}
                  alt=""
                />
              </Link>
            </div>
            <div className="info">
              <Link
                to={`/profiles/${fetchArticleResponse.article.author.username}`}
              >
                {fetchArticleResponse.article.author.username}
              </Link>
            </div>
            <div className="data">{fetchArticleResponse.article.createdAt}</div>
            {isAuthor && (
              <span>
                <Link
                  className="btn btn-sm btn-outline-secondary"
                  to={`/articles/${fetchArticleResponse.article.slug}/edit`}
                >
                  <i className="ion-edit"></i>Edit Article
                </Link>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={deleteArticle}
                >
                  <i className="ion-trash-a"></i>Delete Article
                </button>
              </span>
            )}
          </div>
        )}
      </div>
      <div className="container page">
        {fetchArticleIsLoading && <Loading />}
        {fetchArticleError && <ErrorMessages />}
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="row article-content">
            <div className="col-xs-12">
              <p>{fetchArticleResponse.article.body}</p>
              <TagList tags={fetchArticleResponse.article.tagList} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;
