import { useState, useContext } from "react";
import ApiContext from "../ApiContext";
import { Movie } from "./Movie";
import MovieModal from "./MovieModal";

const MovieCard = (movie: Movie) => {
  const apiConfiguration = useContext(ApiContext);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* --- MovieCard --- */}
      <figure
        onClick={() => {
          setShowModal(true);
        }}
      >
        <img
          src={movie.vertialImgUrl}
          className="rounded"
          alt={movie.description}
        />

        <figcaption className="fig-container">
          <div className="fig-item-100">
            <h2> {movie.title} </h2>
          </div>
          <div className="fig-item">
            <i className="fa fa-star" aria-hidden="true" />
          </div>
          <div className="fig-item">
            <p>{movie.rate}</p>
          </div>
        </figcaption>
      </figure>
      {/* --- MovieModal --- */}
      <MovieModal {...movie} />
    </>
  );
};

export default MovieCard;
