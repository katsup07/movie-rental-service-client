/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Like from './common/like';
import Table from './common/table';
import auth from '../services/authService';

class MoviesTable extends Component {
  // = local props that won't change throughout the lifecycle, so needn't be in state
  columns = [
    {
      path: 'title',
      label: 'Title',
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like',
      // = content() is a defined props function that takes a movie arg and returns a react "Like" element
      content: (movie) => (
        <Like
          liked={movie.liked}
          onLikeToggle={() => this.props.onLikeToggle(movie)}
        />
      ),
    }, // like button
  ];

  // deleteColumn will be rendered based on whether user is logged in or not
  deleteColumn = {
    key: 'delete',
    content: (movie) => (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => this.props.onDelete(movie)}
        type="button"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { moviePages, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        datas={moviePages}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
