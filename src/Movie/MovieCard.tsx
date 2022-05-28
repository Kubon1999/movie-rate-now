import { useState, useContext, useEffect } from "react";
import ApiContext from "../ApiContext";
import { Movie } from "../Types";
import MovieModal from "./MovieModal";
import { LoadingOverlay } from "@mantine/core";

const MovieCard = (props: { movie: Movie }) => {
  const apiConfiguration = useContext(ApiContext);
  const [showModal, setShowModal] = useState(false);
  //const [loading, setLoading] = useState(true);

  // imitate loading
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {/* --- MovieCard --- */}
      {apiConfiguration ? (
        <figure
          onClick={() => {
            toggleModal();
          }}
        >
          <img
            src={
              apiConfiguration.base_url +
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
      ) : (
        <LoadingOverlay visible={true} />
      )}
      {/* --- MovieModal --- */}
      {showModal ? (
        <>
          {/* passing toggleModal so that the modal can send message to parent (movieCard) that it should be turn off*/}
          <MovieModal movie={props.movie} toggleModal={toggleModal} />
        </>
      ) : null}
    </>
  );
};

export default MovieCard;
