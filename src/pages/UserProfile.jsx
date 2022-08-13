import React from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate, useLocation, NavLink } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import UserArticles from './UserArticles';

function UserProfile() {
  let params = useParams();
  let location = useLocation();

  const slug = params.slug;
  //ToDo: проверить, откуда брать url
  const url = params.url;
  const isFavorites = location.pathname.includes('favorites');
  const apiUrl = `/profiles/${slug}`;
  const [{ response }, doFetch] = useFetch();

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (!response) {
    return null;
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <image className="user-img" alt="" src={response.profile.image} />
              <h4>{response.profile.username}</h4>
              <p>{response.profile.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <NavLink
                    to={`/profiles/${response.profile.username}`}
                    className="nav-link"
                  >
                    My posts
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={`/profiles/${response.profile.username}/favorites`}
                    className="nav-link"
                  >
                    Favorites posts
                  </NavLink>
                </li>
              </ul>
            </div>
            <UserArticles
              username={response.profile.username}
              location={location}
              isFavorites={isFavorites}
              url={url}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
