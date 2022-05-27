import { useState, useContext } from "react";
import ApiContext from "../ApiContext";
import { Movie } from "./Movie";
import MovieModal from "./MovieModal";

const MovieCard = (props: { movie: Movie }) => {
  const apiConfiguration = useContext(ApiContext);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {/* --- MovieCard --- */}
      <figure
        onClick={() => {
          toggleModal();
        }}
      >
        <img
          src={
            apiConfiguration.images.base_url +
            "w500/" +
            props.movie.verticalImgUrl +
            "?api_key=" +
            apiConfiguration.apiKey
          }
          className="rounded"
          alt={props.movie.description}
        />

        <figcaption className="fig-container">
          <div className="fig-item-100">
            <h2> {props.movie.title} </h2>
          </div>
          <div className="fig-item">
            <i className="fa fa-star" aria-hidden="true" />
          </div>
          <div className="fig-item">
            <p>{props.movie.rate}</p>
          </div>
        </figcaption>
      </figure>
      {/* --- MovieModal --- */}
      {showModal ? (
        <MovieModal movie={props.movie} toggleModal={toggleModal} />
      ) : null}
    </>
  );
};

export default MovieCard;
