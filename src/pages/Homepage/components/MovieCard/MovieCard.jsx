import React from "react";
import "./MovieCard.style.css";
import Badge from "react-bootstrap/Badge";

const MovieCard = ({ movie }) => {
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
          {movie.genre_ids.map((id) => (
            <Badge bg="light" text="dark">
              {id}
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
