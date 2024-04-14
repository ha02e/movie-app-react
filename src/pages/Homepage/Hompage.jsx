import React from "react";
import Banner from "./components/Banner/Banner";
import TopRatedMovieSlide from "./components/TopRatedMovieSlide/TopRatedMovieSlide";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";
import UpcomingMovieSlide from "./components/UpcomingMovieSlide/UpcomingMovieSlide";
import Footer from "../../layout/Footer/Footer";

//1. 배너 - popular 영화를 들고와서 첫번째 아이템을 보여주기
//2. popular movie
//3. top rated movie
//4. upcoming movie

const Hompage = () => {
  return (
    <div>
      <Banner />
      <TopRatedMovieSlide />
      <PopularMovieSlide />
      <UpcomingMovieSlide />
      <Footer />
    </div>
  );
};

export default Hompage;
