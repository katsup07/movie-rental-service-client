/* eslint-disable react/prop-types */
import React from 'react';
import Joi from 'joi-browser';
import { saveMovie, getMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import Form from './common/form';

class MovieForm extends Form {
  state = {
    data: { title: '', genreId: '', numberInStock: '', dailyRentalRate: '' },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().min(2).required().label('Genre'),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label('Number In Stock'),
    dailyRentalRate: Joi.number().min(0).max(10).required().label('Rate'),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === 'new') return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (error) {
      if (error.response && error.response === 404)
        this.props.history.replace('/not-found');
    }
  }

  /* Populates the form with existing movie objects */
  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    if (!movie.genre) movie.genre = {};
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    console.log('doSubmit...');
    await saveMovie(this.state.data);
    this.props.history.push(`/movies`);
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number In Stock')}
          {this.renderInput('dailyRentalRate', 'Rate')}
          {this.renderButton('save')}
        </form>
      </div>
    );
  }
}

export default MovieForm;
