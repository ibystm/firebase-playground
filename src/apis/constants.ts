export const API_KEY_QUERY_STRINGS = `api_key=${process.env.REACT_APP_TMDB_API_KEY}`;

const languages = {
  ja: "language=ja",
};

export const requests = {
  configuration: `/configuration?${API_KEY_QUERY_STRINGS}`,
  discoverMovie: `/discover/movie?${languages.ja}&${API_KEY_QUERY_STRINGS}`,
  searchMovie: (keyword: string) =>
    `/search/movie?${languages.ja}&${API_KEY_QUERY_STRINGS}&query=${keyword}`,
  getMovieVideos: (movieId: string) =>
    `/movie/${movieId}/videos?${languages.ja}&${API_KEY_QUERY_STRINGS}`,
};
