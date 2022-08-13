import React from 'react';
import { Link } from 'react-router-dom';
import { range } from '../utils';
import classNames from 'classnames';

const PaginationItem = ({ page, url, currentPage }) => {
  const liClasses = classNames({
    'page-item': true,
    active: currentPage === page,
  });

  return (
    <li className={liClasses}>
      <Link to={url} className="page-link">
        {page}
      </Link>
    </li>
  );
};

const Pagination = ({ total, limit, url, currentPage }) => {
  const pagesCount = Math.ceil(total / limit);
  const pages = range(1, pagesCount);
  console.log('PAGE-COUNT: ', pagesCount);
  console.log('PAGES: ', pages);

  return (
    <ul className="pagination">
      {pages.map((page) => (
        <PaginationItem
          key={page}
          page={page}
          url={`${url}?page=${page}`}
          currentPage={currentPage}
        />
      ))}
    </ul>
  );
};

export default Pagination;
