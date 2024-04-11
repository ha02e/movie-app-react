import React, { useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useSearchParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { Container, Row, Col } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import "./MoviePage.style.css";

//경로
//1. nav바에서 클릭해서 온 경우 -> keyword 없음 / popularMovie 보여주기
//2. 검색 keyword를 입력해서 온 경우 -> keyword와 관련된 영화들을 보여줌

//페이지네이션 설치
//page state 만들기
//페이지네이션 클릭할 때마다 page 바꿔주기
//page 값이 바뀔 때마다 useSearchMovie에 page까지 넣어서 fetch

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const keyword = query.get("q");

  const { data: genreData } = useMovieGenreQuery();

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });
  // console.log("dddd", data);

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

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
            <Col className="sort-section" lg={12} xs={12}>
              <h4>Sort By</h4>
              <select class="form-select" aria-label="Default select example">
                <option selected value="1">
                  Popularity
                </option>
                <option value="2">The Latest</option>
              </select>
            </Col>
            <Col lg={12} xs={12}>
              <h4>Genre</h4>
              <div class="genre-button-section">
                {genreData?.map((item) => (
                  <button
                    className={`genre-button ${
                      selectedGenre === item.id ? "selected" : ""
                    }`}
                    key={item.id}
                    onClick={() => handleGenreClick(item.id)}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </Col>
          </Col>
          <Col lg={8} xs={12}>
            <Row>
              {data?.results.map((movie, index) => (
                <Col key={index} lg={4} xs={12}>
                  <MovieCard movie={movie} />
                </Col>
              ))}
            </Row>
            <ReactPaginate
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={data?.total_pages} //전체페이지
              forcePage={page - 1}
              previousLabel="<"
              nextLabel=">"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MoviePage;
