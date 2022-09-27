/* eslint-disable react/prop-types */
import React, { Component } from 'react';

const SearchBox = ({ onHandleSearch }) => (
  <form id="form">
    <input
      type="search"
      name="query"
      id="query"
      className="form-control search-bar"
      placeholder="Search..."
      onInput={(e) => onHandleSearch(e.currentTarget.value)}
    />
  </form>
);
export default SearchBox;
