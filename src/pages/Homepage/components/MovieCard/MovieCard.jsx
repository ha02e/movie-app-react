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
        <h2>{movie.title}</h2>
        <div>
          {movie.genre_ids.map((id) => (
            <Badge bg="light" text="dark">
              {id}
            </Badge>
          ))}
        </div>
        <div>
          <div>{movie.vote_average}</div>
          <div>{movie.popularity}</div>
          <div>{movie.adult ? "over 18" : "under 18"}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
