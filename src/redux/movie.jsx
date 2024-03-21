import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recommendations: {
    results: [],
    hasMore: false,
    totalResults: 0,
    page: 0,
    totalPages: 0,
    isFetching: false,
  },
};

const movieSlice = createSlice({
  name: "movieSlice",
  initialState,
  reducers: {
    getMovie: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    fetchedMovie: (state, action) => {
      const { recommendations } = action.payload;
      const results =
        recommendations && recommendations.results
          ? recommendations.results.slice(0, 10)
          : [];

      return {
        ...state,
        ...action.payload,
        recommendations: {
          ...recommendations,
          results,
        },
        isFetching: false,
      };
    },
    resetState: (state) => {
      return initialState;
    },
  },
});

export const { getMovie, fetchedMovie, resetState } = movieSlice.actions;
export default movieSlice.reducer;
