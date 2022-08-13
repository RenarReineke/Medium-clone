import React, { useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import Feed from '../components/Feed';
import Pagination from '../components/Pagination';
import { getPaginator, limit } from '../utils';
import { useLocation } from 'react-router-dom';
import PopularTags from '../components/PopularTags';
import Loading from '../components/Loading';
import ErrorMessages from '../components/ErrorMessages';
import FeedToggler from '../components/FeedToggler';

const YourFeed = () => {
  let location = useLocation();
  const [currentPage, offset] = getPaginator(location.search);
  const apiUrl = `/articles/feed?limit=${limit}&offset=${offset}`;
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage]);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1>Medium clone</h1>
          <p>A place to share knowledge</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler />
            {isLoading && <Loading />}
            {error && <ErrorMessages />}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles} />
                <Pagination
                  total={response.articlesCount}
                  limit={limit}
                  url={`${location.pathname}`}
                  currentPage={currentPage}
                />
              </>
            )}
          </div>
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourFeed;
