import * as genresAPI from './genreService';
import httpService from './httpService';
import config from '../config.json';

const { apiUrl } = config;

export function getMovies() {
  return httpService.get(`${apiUrl}/movies`);
}

export function getMovie(movieId) {
  if (!movieId) return;
  return httpService.get(`${apiUrl}/movies/${movieId}`);
}

function setMovieData(movieBody, movie) {
  // set in database
  delete movieBody._id;
  delete movieBody.__v;
  delete movieBody.genre;
  // set here
  movieBody.numberInStock = movie.numberInStock;
  movieBody.dailyRentalRate = movie.dailyRentalRate;
}

async function addGenreId(movieBody, movie) {
  const { data: genres } = await genresAPI.genres;
  const genre = genres.find((g) => g.name === movie.genreId);
  movieBody.genreId = genre._id;
}

// {title: "fasdsa", genreId: "Action", numberInStock: "1", dailyRentalRate: "1" }
export async function saveMovie(movie) {
  let id;
  const { data: movies } = await getMovies();
  let movieBody = movies.find((m) => m.title === movie.title) || {};

  // in database
  if (movieBody._id) {
    id = movieBody._id;
    setMovieData(movieBody, movie);
    await addGenreId(movieBody, movie);
    return httpService.put(`/movies/${id}`, movieBody);
  }
  // else not in database
  movieBody = { ...movie };
  await addGenreId(movieBody, movie);
  return httpService.post(`/movies/`, movieBody);
}

export function deleteMovie(id) {
  return httpService.delete(`/movies/${id}`);
}

// function setMovieData(movieBody, movie) {
//   // set in database
//   delete movieBody._id;
//   delete movieBody.__v;
//   delete movieBody.genre;
//   // set here
//   movieBody.numberInStock = movie.numberInStock;
//   movieBody.dailyRentalRate = movie.dailyRentalRate;
// }

// async function addGenreId(movieBody, movie) {
//   const { data: genres } = await genresAPI.genres;
//   const genre = genres.find((g) => g.name === movie.genreId);
//   movieBody.genreId = genre._id;
// }

// // {title: "fasdsa", genreId: "Action", numberInStock: "1", dailyRentalRate: "1" }
// export async function saveMovie(movie) {
//   const { data: movies } = await getMovies();
//   let id;
//   let movieBody = (await movies.find((m) => m.title === movie.title)) || {};

//   if (movieBody._id) {
//     id = movieBody._id;
//     console.log('in database...');
//     setMovieData(movieBody, movie);
//   } else {
//     console.log('not in database...');
//     movieBody = { ...movie };
//   }

//   // Add genreId
//   const { data: genres } = await genresAPI.genres;
//   const genre = genres.find((g) => g.name === movie.genreId);
//   movieBody.genreId = genre._id;

//   console.log('after adding genreId', movieBody);

//   const result = await httpService.put(`${apiUrl}/movies/${id}`, movieBody);
//   console.log('submitted to server', result);
//   return movieBody;
// }
