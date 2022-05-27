import MovieCard from "../Movie/MovieCard";
import { useState, useContext } from "react";
import axios from "axios";
import ApiContext from "../ApiContext";
import { Movie } from "../Movie/Movie";

const Results = (props: { movies: Movie[] }) => {
  const [moviesVideoId, setMoviesVideoId] = useState([]);
  const apiConfiguration = useContext(ApiContext);

  return (
    <div className="flex-container">
      {props.movies.map((movie, key) => {
        return (
          <div className="item" key={key}>
            <MovieCard movie={movie} />
          </div>
        );
      })}
    </div>
  );
};

export default Results;
