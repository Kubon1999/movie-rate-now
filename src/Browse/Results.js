import MovieCard from "./MovieCard";
const Results = ({ movies }) => {
  return (
    <div className=" row gx-3 gy-3 ">
      {movies ? (
        movies.results.map((element, key) => {
          if (key % 2) {
            return (
              <div className="col col-md movieCardL" key={key}>
                <MovieCard data={element} />
              </div>
            );
          }
          return (
            <div className="col col-md movieCardR" key={key}>
              <MovieCard data={element} />
            </div>
          );
        })
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default Results;
