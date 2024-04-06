import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  console.log("dddd", data);

  if (isLoading) {
    <Spinner animation="border" role="status" variant="warning">
      <span className="visually-hidden">Loading...</span>
    </Spinner>;
  }
  if (isError) {
    <Alert variant="danger">{error.message}</Alert>;
  }

  return <div>Banner</div>;
};

export default Banner;
