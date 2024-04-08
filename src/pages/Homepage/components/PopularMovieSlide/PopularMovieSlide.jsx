import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";
import "./PopularMovieSlide.style.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1980 },
    items: 5,
    // slidesToSlide: 3, // optional, default to 1.
  },
  desktop2: {
    breakpoint: { max: 1980, min: 1024 },
    items: 3,
    // slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    // slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    // slidesToSlide: 1, // optional, default to 1.
  },
};

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
            <h3>Popular Movies</h3>
          </Col>
          <Col md={10}>
            <Carousel
              swipeable={true}
              draggable={true}
              centerMode={true}
              infinite={true}
              responsive={responsive}
              containerClass="carousel-container"
              itemClass="carousel-item-padding-40-px"
              removeArrowOnDeviceType={["tablet", "mobile"]}
            >
              {data.results.map((movie, index) => (
                <MovieCard movie={movie} key={index} />
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PopularMovieSlide;
