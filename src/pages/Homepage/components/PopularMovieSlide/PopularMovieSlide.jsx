import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "react-multi-carousel/lib/styles.css";
import "./PopularMovieSlide.style.css";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  if (isLoading) {
    return (
      <Spinner animation="border" role="status" variant="warning">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div className="popular-movie-section">
      <Container fluid>
        <Row>
          <Col md={2} className="title">
            <span class="material-symbols-rounded">family_star</span>
            <h3>
              <span className="text-point">Popular</span> Movies
            </h3>
          </Col>
          <Col md={10}>
            <MovieSlider movies={data.results} responsive={responsive} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PopularMovieSlide;
