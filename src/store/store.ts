import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useSelector as rawUseSelector,
} from "react-redux";
import { reducer as configurationsReducer } from "../features/configurations/slice/configurations";
import { reducer as searchMovieReducer } from "../features/global/header/slice/searchMovie";
import { reducer as discoverMoviesReducer } from "../features/home/slice/discoverMovies";
import { reducer as discoverTVShowsReducer } from "../features/home/slice/discoverTVs";
import { genresReducer } from "../features/home/slice/genres/index";
import { upcomingReducer } from "../features/home/slice/upcomings/index";
import { reducer as loadingReducer } from "../features/loading/slice/loading";
import { popularitiesReducer } from "../features/loading/slice/popularities/index";
import { reducer as userReducer } from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    user: userReducer,
    contents: discoverMoviesReducer,
    discoverTVShows: discoverTVShowsReducer,
    popularities: popularitiesReducer,
    searchMovies: searchMovieReducer,
    upcomings: upcomingReducer,
    configurations: configurationsReducer,
    genres: genresReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// typed useSelector
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
