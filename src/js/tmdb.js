const key = process.env.API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/movie/";

const api = id => {
  (upcoming = () => {
    return `${BASE_URL}upcoming?api_key=${key}&language=en&page=1`;
  }),
    (movies = () => {
      return `${BASE_URL}${id}?api_key=${key}`;
    }),
    (cast = () => {
      return `${BASE_URL}${id}/credits?api_key=${key}`;
    });
};
