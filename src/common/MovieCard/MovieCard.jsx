import React from "react";
import "./MovieCard.style.css";
import Badge from "react-bootstrap/Badge";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();
  // console.log("ggg", genreData);

  const showGenre = (genreIdList) => {
    if (!genreData) {
      return [];
    }

    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });

    return genreNameList;
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}` +
          ")",
      }}
      className="movie-card"
    >
      <div className="overlay">
        <div className="age">
          <span>{movie.adult ? "18" : "ALL"}</span>
        </div>
        <h2 className="movie-title">{movie.title}</h2>
        <div className="genre">
          {showGenre(movie.genre_ids).map((genre, index) => (
            <Badge bg="light" text="dark" key={index}>
              {genre}
            </Badge>
          ))}
        </div>
        <div className="movie-info">
          <div className="movie-star">
            <span className="material-symbols-rounded">stars</span>
            {movie.vote_average}
          </div>
          <div className="favorite">
            <span className="material-symbols-rounded">favorite</span>
            {movie.popularity}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
