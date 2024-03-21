import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PopularMovies from "./containers/PopularMovies";
import MovieDetails from "./containers/MovieDetails";
import Layout from "./components/Layout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGenres } from "./redux/genres";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<PopularMovies />}></Route>
          <Route path="/movie/:id" element={<MovieDetails />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
