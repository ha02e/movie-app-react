import React from "react";
import { useParams } from "react-router-dom";
import {
  Alert,
  Spinner,
  Container,
  Row,
  Col,
  Badge,
  Tabs,
  Tab,
} from "react-bootstrap";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import { useMovieReviewsQuery } from "../../hooks/useMovieReviews";
import { useMovieRecommendationsQuery } from "../../hooks/useMovieRecommendations";
import MovieCard from "../../common/MovieCard/MovieCard";
import "./MovieDetailPage.style.css";

const MovieDetailPage = () => {
  let { id } = useParams();

  const { data, isLoading, isError, error } = useMovieDetailQuery({ id });
  console.log("dddd", data);

  const { data: reviewData } = useMovieReviewsQuery({ id });
  console.log("reviews~~", reviewData);
  // console.log("reviews ddd~~", reviewData[0].author_details.avatar_path);

  const renderStarRating = (rating) => {
    const stars = [];
    const roundedRating = Math.round(rating);

    for (let i = 0; i < 10; i++) {
      if (i < roundedRating) {
        stars.push("★");
      } else {
        stars.push("☆");
      }
    }

    return stars.join("");
  };

  const { data: recommendData } = useMovieRecommendationsQuery({ id });
  console.log("recommendData@", recommendData);

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
      <Container className="movie-menu-section">
        <Row>
          <Col>
            <Tabs
              defaultActiveKey="profile"
              id="justify-tab-example"
              className="mb-3"
              justify
            >
              <Tab eventKey="review" title="Review">
                {reviewData &&
                  reviewData.map((review) => (
                    <Row key={review.id} className="movie-review">
                      <Col lg={2} xs={12} className="avatar-img">
                        <img
                          src={`https://media.themoviedb.org/t/p/w100_and_h100_face${review.author_details.avatar_path}`}
                        />
                      </Col>
                      <Col lg={10} xs={12}>
                        <div className="review-detail">
                          <p>
                            {renderStarRating(review.author_details.rating)}
                          </p>
                          &nbsp;
                          <p>{review.author}</p>&nbsp;
                          <p>{review.created_at.split("T")[0]}</p>
                        </div>

                        <p>{review.content}</p>
                      </Col>
                    </Row>
                  ))}
              </Tab>
              <Tab eventKey="recommend" title="Recommend Movies">
                <div className="movie-recommendations-container">
                  {recommendData.map((movie, index) => (
                    <div key={index} className="movie-card-wrapper">
                      <MovieCard movie={movie} />
                    </div>
                  ))}
                </div>
              </Tab>
              <Tab eventKey="video" title="Trailer">
                Tab content for Loooonger Tab
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MovieDetailPage;
