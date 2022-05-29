import MovieCard from "../Movie/MovieCard";
import { Movie } from "../Types";

const Results = (props: { movies: Movie[] }) => {
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
