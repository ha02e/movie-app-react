import React from "react";
import { useParams } from "react-router-dom";
import { Alert, Spinner, Container, Row, Col, Badge } from "react-bootstrap";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import "./MovieDetailPage.style.css";

const MovieDetailPage = () => {
  let { id } = useParams();

  const { data, isLoading, isError, error } = useMovieDetailQuery({ id });
  console.log("dddd", data);

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
    <div>
      <div
        style={{
          backgroundImage: `url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data.backdrop_path})`,
        }}
        className="bg-section"
      >
        <Container className="movie-detail-section">
          <Row>
            <Col lg={4} xs={12} className="movie-poster">
              <img
                src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${data.poster_path}`}
                alt="movie-poster"
              />
            </Col>
            <Col lg={8} xs={12}>
              <div>
                <div className="movie-detail-age">
                  <span>{data.adult ? "18" : "ALL"}</span>
                </div>
                <h1 className="movie-detail-title">
                  {data.title}&nbsp;({data.release_date.split("-")[0]})
                </h1>
                <div className="movie-detail-icon">
                  <div>
                    <span class="material-symbols-rounded">schedule</span>&nbsp;
                    {data.runtime}mins
                  </div>
                  <div>
                    <span className="material-symbols-rounded">stars</span>
                    &nbsp;
                    {data.vote_average}
                  </div>
                  <div>
                    <span className="material-symbols-rounded">favorite</span>
                    &nbsp;
                    {data.popularity}
                  </div>
                </div>
              </div>
              <div className="movie-overview">{data.overview}</div>
              <div className="movie-detail-genre">
                {data.genres.map((genre) => (
                  <Badge bg="light" text="dark" key={genre.id}>
                    {genre.name}
                  </Badge>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default MovieDetailPage;
