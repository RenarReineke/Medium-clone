import classNames from 'classnames';
import React from 'react';
import useFetch from '../hooks/useFetch';

function AddToFavorites({ isFavorited, favoritesCount, articleSlug }) {
  const apiUrl = `/articles/${articleSlug}/favorite`;
  const [{ response }, doFetch] = useFetch(apiUrl);
  const favoritesCountWithResponse = response
    ? response.article.favoritesCount
    : favoritesCount;
  const isFavoritedWithResponse = response
    ? response.article.isFavorited
    : isFavorited;

  const handleLike = (event) => {
    event.preventDefault();
    doFetch({
      method: isFavoritedWithResponse ? 'delete' : 'post',
    });
  };
  const buttonClasses = classNames({
    btn: true,
    'btn-sm': true,
    'btn-primary': isFavoritedWithResponse,
    'btn-outline-primary': !isFavoritedWithResponse,
  });

  return (
    <div className="buttonClasses" onClick={handleLike}>
      <i className="ion-heart" />
      <span>&nbsp; {favoritesCountWithResponse}</span>
    </div>
  );
}

export default AddToFavorites;
