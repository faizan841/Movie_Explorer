import {
  delay,
  all,
  call,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { API_KEY } from "../config";
import { getPopularMovies, fetchedPopularMovies } from "../redux/movies";
import TheMovieDbApi from "../lib/api";
import { fetchedSearchMovies, searchMovies } from "../redux/search";
import { fetchedGenres, getGenres } from "../redux/genres";
import { getMovie, fetchedMovie } from "../redux/movie";

const api = new TheMovieDbApi(API_KEY);

function* fetchGenres() {
  yield put(fetchedGenres(yield call(api.getGenres)));
}

function* fetchSearchMovies(action) {
  yield delay(500);

  yield put(fetchedSearchMovies(yield call(api.searchMovies, action.payload)));
}

function* fetchPopularMovies(action) {
  yield put(
    fetchedPopularMovies(yield call(api.getPopularMovies, action.payload))
  );
}

function* fetchMovie(action) {
  yield put(fetchedMovie(yield call(api.getMovie, action.payload)));
}

export default function* watcherSaga() {
  yield all([
    yield takeEvery(getMovie.type, fetchMovie),
    yield takeEvery(getPopularMovies.type, fetchPopularMovies),
    yield takeEvery(getGenres.type, fetchGenres),
    yield takeLatest(searchMovies.type, fetchSearchMovies),
  ]);
}
