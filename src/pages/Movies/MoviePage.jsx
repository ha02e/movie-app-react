import React, { useState, useEffect } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useSearchParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { Container, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
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
  const [selectedItem, setSelectedItem] = useState("Popularity");
  const [sortBy, setSortBy] = useState("");
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const keyword = query.get("q");

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });
  console.log("dddd", data);

  const { data: genreData } = useMovieGenreQuery();

  const handleSortByClick = (selectedValue) => {
    setSelectedItem(selectedValue); // 클릭된 항목의 값을 선택된 값으로 설정
    setSortBy(selectedValue);
  };

  const sortedMovies =
    data?.results.sort((a, b) => {
      // "popularity.desc"를 기준으로 내림차순 정렬
      if (sortBy === "Popularity") {
        return b.popularity - a.popularity;
      }
      // "release_date.desc"를 기준으로 내림차순 정렬
      if (sortBy === "The Latest") {
        return new Date(b.release_date) - new Date(a.release_date);
      }
      // 기본적으로는 인기순으로 정렬
      return b.popularity - a.popularity;
    }) || [];

  const filteredMovies = sortedMovies.filter((movie) => {
    if (selectedGenre.length === 0) {
      // 선택된 장르가 없으면 모든 영화를 보여줍니다.
      return true;
    } else {
      // 선택된 장르에 속하는 영화만 필터링합니다.
      return selectedGenre.every((genreId) =>
        movie.genre_ids.includes(genreId)
      );
    }
  });

  const handleGenreClick = (genreId) => {
    const index = selectedGenre.indexOf(genreId);
    if (index === -1) {
      // 선택되지 않은 장르일 경우 추가
      setSelectedGenre([...selectedGenre, genreId]);
    } else {
      // 선택된 장르일 경우 제거
      const updatedGenre = [...selectedGenre];
      updatedGenre.splice(index, 1);
      setSelectedGenre(updatedGenre);
    }
  };

  // console.log("selected!!", selectedGenre);

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  useEffect(() => {
    if (data) {
      setTotalPages(data.total_pages);
    }
  }, [data]);

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
              <DropdownButton title={selectedItem}>
                <Dropdown.Item onClick={() => handleSortByClick("Popularity")}>
                  Popularity
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortByClick("The Latest")}>
                  The Latest
                </Dropdown.Item>
              </DropdownButton>
            </Col>
            <Col lg={12} xs={12}>
              <h4>Genre</h4>
              <div class="genre-button-section">
                {genreData?.map((item) => (
                  <button
                    className={`genre-button ${
                      selectedGenre.includes(item.id) ? "selected" : ""
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
              {filteredMovies.map((movie, index) => (
                <Col key={index} lg={4} xs={12}>
                  <MovieCard movie={movie} />
                </Col>
              ))}
            </Row>
            <ReactPaginate
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPages} //전체페이지
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
