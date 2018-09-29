const key = "?api_key=" + process.env.API_KEY;
const param = "&language=en&page=1&include_adult=true";
const base = "https://api.themoviedb.org/3";
const image = "https://image.tmdb.org/t/p";

export const personUrl = id => `${base}/person/${id}${key}`;
export const searchUrl = term =>
  `${base}/search/multi${key}${param}&query=${term}`;
export const upcomingUrl = () => `${base}/movie/upcoming${key}${param}`;
export const backdropUrl = path => `${image}/w1280/${path}`;
export const posterUrl = path => `${image}/w185/${path}`;
export const movieUrl = id => `${base}/movie/${id}${key}`;
export const creditsUrl = id => `${base}/movie/${id}/credits${key}`;
export const filmographyUrl = id => `${base}/person/${id}/credits${key}`;
