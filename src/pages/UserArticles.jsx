import React from 'react';
import { getPaginator, limit } from '../utils';
import stringify from 'query-string';
import useFetch from '../hooks/useFetch';
import { useEffect } from 'react';
import Loading from '../components/Loading';
import ErrorMessages from '../components/ErrorMessages';
import Feed from '../components/Feed';
import Pagination from '../components/Pagination';

const getApiUrl = (username, offset, isFavorites) => {
  const params = isFavorites
    ? { limit, offset, favorited: username }
    : { limit, offset, author: username };

  return `/articles?${stringify(params)}`;
};

function UserArticles({ username, location, isFavorites, url }) {
  const [offset, currentPage] = getPaginator(location.search);
  const apiUrl = getApiUrl({ username, offset, isFavorites });
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  return (
    <div>
      {isLoading && <Loading />}
      {error && <ErrorMessages />}
      {!isLoading && response && (
        <>
          <Feed articles={response.articles} />
          <Pagination
            total={response.articleCount}
            limit={limit}
            url={url}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
}

export default UserArticles;
