import httpService from './httpService.js';
import config from '../config.json';

const { apiUrl } = config;

export const genres = getGenres();

export function getGenres() {
  return httpService.get(`/genres`);
}

/* export const genres = [
  { _id: '633054dc9bc19381d9428b15', name: 'Action' },
  { _id: '633054dc9bc19381d9428b0c"', name: 'Comedy' },
  { _id: '633054dc9bc19381d9428b27', name: 'Thriller' },
  { _id: '633054dc9bc19381d9428b1e"', name: 'Romance' },
]; */

/* export function getGenres() {
  return genres.filter((g) => g);
} */
