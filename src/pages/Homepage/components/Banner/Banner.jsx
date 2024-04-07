import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./Banner.style.css";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
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
      <Swiper
        effect={"fade"}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2800,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, EffectFade]}
        loop={true}
        className="mySwiper"
      >
        {data?.results.slice(0, 5).map((movie, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                backgroundImage: `url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${movie.backdrop_path})`,
              }}
              className="banner-section"
            >
              <div className="text-white banner-text-section">
                <h1>{movie.title}</h1>
                <div className="movie-info">
                  <p>
                    <span className="material-symbols-rounded">event</span>
                    {movie.release_date}
                  </p>

                  <p>
                    <span className="material-symbols-rounded">stars</span>
                    {movie.vote_average}
                  </p>

                  <p>
                    <span className="material-symbols-rounded">favorite</span>
                    {movie.vote_count}
                  </p>
                </div>
                <p className="overview">{movie.overview}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
