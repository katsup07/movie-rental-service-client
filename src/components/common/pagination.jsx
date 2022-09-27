import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'; // optimized version of underscore library

// props args destructured
const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null; // Don't show page numbers if there is only one
  const pages = _.range(1, pagesCount + 1); // doesn't include the end number itself, so need to add "+1"

  return (
    <nav aria-label="Page navigation example">
      <ul style={{ color: 'black' }} className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? 'page-item active' : 'page-item'}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// type checking: checks the prop types. isRequired() checks that they are used in component
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default Pagination;
