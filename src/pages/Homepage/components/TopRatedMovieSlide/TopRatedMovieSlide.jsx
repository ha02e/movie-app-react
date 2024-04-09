import React from "react";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "react-multi-carousel/lib/styles.css";
import "./TopRatedMovieSlide.style.css";
import { useTopRatedMoviesQuery } from "../../../../hooks/useTopRatedMovies";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const TopRatedMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopRatedMoviesQuery();

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
    <div className="top-movie-section">
      <Container fluid>
        <Row>
          <Col md={2} className="title">
            <span class="material-symbols-rounded">emoji_events</span>
            <h3>
              <span className="text-point">Top</span> Movies
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

export default TopRatedMovieSlide;
