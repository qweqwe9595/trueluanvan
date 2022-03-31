import React, { useReducer } from "react";
import { initMoviesState, moviesReducer } from "./movieReducer";

export const TheMovieDBContext = React.createContext();

export function TheMovieDbProvider({ children }) {
  const [movies, dispatch] = useReducer(moviesReducer, initMoviesState);

  return (
    <TheMovieDBContext.Provider value={[movies, dispatch]}>
      {children}
    </TheMovieDBContext.Provider>
  );
}
