import Modal from "../Modal";
import { useContext, useEffect, useState } from "react";
import ApiContext from "../ApiContext";
import axios from "axios";
import ReactPlayer from "react-player";

const MovieCard = (props) => {
  const { data } = props;
  const [showModal, setShowModal] = useState(false);
  const apiConfiguration = useContext(ApiContext);
  const [posterUrl, setPosterUrl] = useState("");
  const [backdropUrl, setBackDropUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (data) {
      //get the poster of a movie
      //example:
      //https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
      //base_url + size + path + apikey
      const base_url = apiConfiguration.images.base_url;
      const final_url =
        base_url +
        "/w500/" +
        data.poster_path +
        "?api_key=" +
        apiConfiguration.apiKey;
      setPosterUrl(final_url);
      const final_url_backdrop =
        base_url +
        "/w1280/" +
        data.backdrop_path +
        "?api_key=" +
        apiConfiguration.apiKey;
      setBackDropUrl(final_url_backdrop);
    }
  }, [data.title]);

  async function requestMovieVideos(movieId, setter) {
    axios
      .get(
        `https://api.themoviedb.org/3/${data.media_type}/${movieId}/videos?api_key=${apiConfiguration.apiKey}`
      )
      .then((response) => {
        setter(response.data.results[0].key);
      });
  }

  return (
    <>
      {posterUrl ? (
        <figure
          onClick={() => {
            requestMovieVideos(data.id, setVideoUrl);
            setShowModal(!showModal);
          }}
        >
          <img src={posterUrl} className="rounded" alt={data.title} />
          <figcaption>
            <h2>{data.media_type == "tv" ? data.name : data.title}</h2>
            <p>{data.vote_average}</p>
            <p>
              {data.media_type == "tv"
                ? data.first_air_date.substring(0, 4)
                : data.release_date.substring(0, 4)}
            </p>
          </figcaption>
        </figure>
      ) : (
        <p>loading img</p>
      )}
      {showModal ? (
        <Modal>
          <div className="modal-view">
            <div
              className="modal-card"
              style={{
                backgroundImage: `url(${backdropUrl})`,
                backgroundPosition: "center",
              }}
            >
              {showVideo ? (
                <div className="modal-card-item">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoUrl}`}
                    height="100%"
                    width="100%"
                    frameBorder="0"
                    allow="autoplay"
                  ></iframe>
                </div>
              ) : (
                <i
                  className="fa fa-play-circle"
                  aria-hidden="true"
                  onClick={() => setShowVideo(true)}
                ></i>
              )}

              <div className="modal-card-item">
                <h1>{data.media_type == "tv" ? data.name : data.title}</h1>
              </div>
              <div className="modal-card-item">
                <p>
                  {data.media_type == "tv"
                    ? data.first_air_date.substring(0, 4)
                    : data.release_date.substring(0, 4)}
                </p>
              </div>
              <div className="modal-card-item">
                <p>{data.overview}</p>
              </div>
              <i
                className="fa fa-times"
                aria-hidden="true"
                onClick={() => setShowModal(!showModal)}
              ></i>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default MovieCard;
