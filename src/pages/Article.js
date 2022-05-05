import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ErrorMessages from '../components/ErrorMessages';
import Loading from '../components/Loading';
import TagList from '../components/TagList';
import useFetch from '../hooks/useFetch';

const Article = () => {
  let params = useParams();
  const apiUrl = `/articles/${params.slug}`;
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  return (
    <div className="article-page">
      <div className="banner">
        {!isLoading && response && (
          <div className="container">
            <h1>{response.article.title}</h1>
            <div className="article-meta">
              <Link to={`/profiles/${response.article.author.username}`}>
                <img
                  src={`/profiles/${response.article.author.image}`}
                  alt=""
                />
              </Link>
            </div>
            <div className="info">
              <Link to={`/profiles/${response.article.author.username}`}>
                {response.article.author.username}
              </Link>
            </div>
            <div className="data">{response.article.createdAt}</div>
          </div>
        )}
      </div>
      <div className="container page">
        {isLoading && <Loading />}
        {error && <ErrorMessages />}
        {!isLoading && response && (
          <div className="row article-content">
            <div className="col-xs-12">
              <p>{response.article.body}</p>
              <TagList tags={response.article.tagList} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;
