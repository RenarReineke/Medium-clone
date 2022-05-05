import React, { useEffect } from 'react';
import Loading from '../components/Loading';
import ErrorMessages from '../components/ErrorMessages';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';

const PopularTags = () => {
  const [{ response, error, isLoading }, doFetch] = useFetch('/tags');

  useEffect(() => {
    console.log('START EFFECT: ');
    doFetch();
  }, [doFetch]);

  console.log('RESPTAGS: ', response, isLoading);

  if (isLoading || !response) return <Loading />;
  if (error) return <ErrorMessages />;

  return (
    <div className="sidebar">
      <p>Popular tags</p>
      <div className="tag-list">
        {response.tags.map((tag) => (
          <Link to={`tags/${tag}`} className="tag-default tag-pill" key={tag}>
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
