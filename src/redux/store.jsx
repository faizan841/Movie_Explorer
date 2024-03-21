import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./search";
import genresReducer from "./genres";
import watcherSaga from "../sagas";
import createSagaMiddleware from "@redux-saga/core";
import moviesReducer from "./movies";
import movieReducer from "./movie";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    search: searchReducer,
    genres: genresReducer,
    movies: moviesReducer,
    movie: movieReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleware);
  },
});

sagaMiddleware.run(watcherSaga);

export default store;
