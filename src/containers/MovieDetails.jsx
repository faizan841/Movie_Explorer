import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovie, resetState } from "../redux/movie";

import Loader from "../components/Loader";
import Movie from "../components/Movie";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { movie } = useSelector((store) => store);
  const { genres } = useSelector((store) => store.genres);

  useEffect(() => {
    const movieId = id ? parseInt(id, 10) : 0;
    console.log(movieId);
    dispatch(getMovie(movieId));

    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (id !== movie.id?.toString()) {
      dispatch(getMovie(id ? parseInt(id, 10) : 0));
    }
  }, [id, movie.id]);

  console.log(id);

  return movie.isFetching ? (
    <Loader />
  ) : (
    <Movie movie={movie} genres={genres} />
  );
};

export default MovieDetails;
