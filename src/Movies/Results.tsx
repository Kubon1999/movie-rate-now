import MovieCard from "../Movie/MovieCard";
import { Movie } from "../Types";

const Results = (props: { movies: Movie[] }) => {
  return (
    <>
      {props.movies.map((movie, key) => {
        return (
          <div className="item" key={key}>
            <MovieCard movie={movie} />
          </div>
        );
      })}
    </>
  );
};

export default Results;
