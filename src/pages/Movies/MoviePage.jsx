import React from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { Container, Row, Col } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";

//경로
//1. nav바에서 클릭해서 온 경우 -> keyword 없음 / popularMovie 보여주기
//2. 검색 keyword를 입력해서 온 경우 -> keyword와 관련된 영화들을 보여줌

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");

  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword });
  // console.log("dddd", data);

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
      <Container>
        <Row>
          <Col lg={4} xs={12}>
            filter
          </Col>
          <Col lg={8} xs={12}>
            <Row>
              {data?.results.map((movie, index) => (
                <Col key={index} lg={4} xs={12}>
                  <MovieCard movie={movie} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MoviePage;
