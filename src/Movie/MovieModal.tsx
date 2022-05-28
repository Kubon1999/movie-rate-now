import axios from "axios";
import ApiContext from "../ApiContext";
import { useContext, useEffect, useState } from "react";
import MovieVideo from "./MovieVideo";
import { Movie } from "../Types";
import "../style/Modal.css";

const MovieModal = (props: { movie: Movie; toggleModal: Function }) => {
  const apiConfiguration = useContext(ApiContext);
  const [videoLoaded, setVideoLoaded] = useState(false);
  let bgImageUrl = `${apiConfiguration.base_url}/w1280/${props.movie.verticalImgUrl}?api_key=${apiConfiguration.apiKey}`;

  useEffect(() => {
    requestMovieVideos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* function that gets all the trailers/videos available for the movie */
  async function requestMovieVideos() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${props.movie.id}/videos?api_key=${apiConfiguration.apiKey}`
      )
      .then((response) => {
        props.movie.listOfTrailerUrl = response.data.results.map((video) => {
          if (video.site === "YouTube") {
            return video.key;
          }
        });
        setVideoLoaded(true);
      });
  }

  return (
    <div className="modal-view">
      <div
        className="modal-card"
        style={{
          backgroundImage: `url(${bgImageUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {videoLoaded ? (
          <MovieVideo videoUrl={props.movie.listOfTrailerUrl[0]} />
        ) : null}
        <div className="modal-card-item">
          <h1>
            <b>{props.movie.title}</b>
          </h1>
        </div>
        <div className="modal-card-item">
          <p id="release-date">{props.movie.year}</p>
          {props.movie.genreIds.map((genreId, key) => {
            //return max: 3 genres to not make a list of 7 genres in one movie
            return (
              <p className="genre-name" key={key}>
                {apiConfiguration.genres[genreId]}
              </p>
            );
          })}
        </div>
        <div className="modal-card-item">
          <i className="fa fa-star" aria-hidden="true"></i>
          <h3>{props.movie.rate}</h3>
          <p>{props.movie.numberOfVotes} votes</p>
        </div>
        <div className="modal-card-item">
          <p>
            {
              /* change later to scrollable description */ props.movie.description.substring(
                0,
                250
              )
            }
          </p>
        </div>
        <i
          className="fa fa-times"
          aria-hidden="true"
          onClick={() => props.toggleModal()}
        ></i>
      </div>
    </div>
  );
};
export default MovieModal;
