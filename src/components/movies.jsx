import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { getMovies } from '../services/fakeMovieService';
import { getMovies, deleteMovie, saveMovie } from '../services/movieService';
// import { getGenres } from '../services/fakeGenreService';
import { getGenres } from '../services/genreService';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import paginate from '../utils/paginate';
import SearchBox from './common/searchBar';

class Movies extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    // In real app populating movies/genres here causes runtime errors, since takes time for server to respond and these fields remain undefined until then, so just initialize here and use componentDidMount() to supply data later.
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: null,
    sortColumn: { path: 'title', order: 'asc' },
    filterType: 'genre', // or 'search'
  };

  async componentDidMount() {
    // genres
    const { data: genres } = await getGenres();
    const updatedGenres = [
      { name: 'All Genres', _id: 'all genres' },
      ...genres,
    ];
    // movies
    const { data: movies } = await getMovies();
    this.setState({ movies, genres: updatedGenres });
  }

  async componentDidUpdate() {
    // Needed for when all movies are deleted from list or search returns no movies.
    if (this.state.movies.length === 0) {
      const { data: movies } = await getMovies();
      setTimeout(() => this.setState({ movies }), 2500);
    }
  }

  handleSort = (newSortColumn) => {
    this.setState({ sortColumn: newSortColumn });
  };

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const updatedMovies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies: updatedMovies });
    try {
      const result = await deleteMovie(movie._id);
      console.log(result);
    } catch (error) {
      // expected error type
      if (error.response && error.response.status === 404)
        toast.error('This movie has already been deleted');

      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    console.log('handling like...');
    const updateMovies = [...this.state.movies];
    const index = updateMovies.indexOf(movie);
    updateMovies[index] = { ...updateMovies[index] };
    updateMovies[index].liked = !movie.liked;
    this.setState({ movies: updateMovies });
  };

  handlePageChange = (page) => {
    console.log(`switching to page ${page}`);
    this.setState({ currentPage: page });
  };

  // TODO clear search bar after moving to genre list
  handleGenreSelect = (genre) => {
    if (this.state.filterType !== 'genre') this.toggleFilterType();
    console.log(`Displaying ${genre.name} genre...`);
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  toggleFilterType = async () => {
    const filterType = this.state.filterType === 'search' ? 'genre' : 'search';
    const { data: movies } = await getMovies();
    this.setState({ movies, filterType });
  };

  handleSearch = async (searchTerms) => {
    console.log(searchTerms.length);
    const { movies, selectedGenre, filterType } = this.state;

    // for when clearing all search terms
    if (searchTerms.length === 0) {
      const { data: movies } = await getMovies();
      return this.setState({ movies });
    }

    if (filterType !== 'search') this.toggleFilterType();

    // for when switching from genres list to search bar
    if (selectedGenre && selectedGenre._id !== 'all genres')
      this.setState({ selectedGenre: 'all genres' });

    const filteredMovies = movies.filter((m) =>
      m.title.toLowerCase().includes(searchTerms.toLowerCase())
    );
    this.setState({ movies: filteredMovies, currentPage: 1 });
  };

  getPagedData = () => {
    const { movies, selectedGenre, currentPage, sortColumn, pageSize } =
      this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter(
            (m) =>
              selectedGenre._id === m.genre._id ||
              selectedGenre._id === 'all genres'
          )
        : movies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const moviePages = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, moviePages };
  };

  render() {
    const { movies, pageSize, currentPage, genres, selectedGenre, sortColumn } =
      this.state;
    const { user } = this.props;

    if (movies.length === 0)
      return <p>No movies to display. Currently repopulating database...</p>;

    const { totalCount, moviePages } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col">
          {user && (
            <Link
              to="movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
          )}
          {/*  <button onClick={() => this.props.history.push('/movies/new')} type="button"
            className="btn btn-primary">New Movie</button> */}
          <p>Showing {totalCount} movies.</p>
          <SearchBox onHandleSearch={this.handleSearch} />
          <MoviesTable
            moviePages={moviePages}
            sortColumn={sortColumn}
            onLikeToggle={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}
export default Movies;
