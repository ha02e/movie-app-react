import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";

const Banner = () => {
  const { data } = usePopularMoviesQuery();
  console.log("dddd", data);
  return <div></div>;
};

export default Banner;
