const initState = {
  movies: [],
  listMovies: [],
};

export default function reduser(state = initState, action) {
  switch (action.type) {
    case "ADD_MOVIES":
      return {
        ...state,
        movies: [...action.payload.movies],
      };
    case "ADD_TO_MOVIE":
      const newMovie = state.movies.find(
        (item) => item.imdbID === action.payload.id
      );
      const listMovies = [...state.listMovies, { ...newMovie }];
      return {
        ...state,
        listMovies,
      };
    case "REMOVE_TO_MOVIE":
      const filterMovie = state.listMovies.filter((item) => item.imdbID !== action.payload.id);
      return {
        ...state,
        listMovies: filterMovie,
      };
    default:
      return state;
  }
}
