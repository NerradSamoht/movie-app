export const key = process.env.API_KEY;
export const baseUrl = "https://api.themoviedb.org/3/movie/";
export const backdropUrl = "https://image.tmdb.org/t/p/w1280";
export const posterUrl = "https://image.tmdb.org/t/p/w185";
export const personUrl = "https://api.themoviedb.org/3/person";

export const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${key}&language=en-US&page=1&include_adult=true&query=`;
