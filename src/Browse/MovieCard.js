import Modal from "../Modal";
import { useContext, useEffect, useState } from "react";
import ApiContext from "../ApiContext";
import axios from "axios";

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
    if (!data.media_type) {
      data.media_type = "movie";
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

  function readableTrailerVideoLogic() {
    if (showVideo && videoUrl) {
      //if you should show video and there exists an trailer
      //then show video
      return (
        <div className="modal-card-item">
          <iframe
            src={`https://www.youtube.com/embed/${videoUrl}`}
            height="100%"
            width="100%"
            frameBorder="0"
            allow="autoplay"
          ></iframe>
        </div>
      );
    } else if (!videoUrl) {
      //the trailer does not exist
      //then dont show any option
      return null;
    } else {
      return (
        <i
          className="fa fa-play-circle"
          aria-hidden="true"
          onClick={() => setShowVideo(true)}
        ></i>
      );
    }
  }

  function readableGenres() {
    return data.genre_ids.map((genre) => {
      //return max: 3 genres to not make a list of 7 genres in one movie
      return apiConfiguration[data.media_type]
        .slice(0, 4)
        .map((genre_2, key) => {
          if (genre === genre_2.id) {
            return (
              <p className="genre-name" key={key}>
                {genre_2.name}
              </p>
            );
          }
        });
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
          <figcaption className="fig-container">
            <div className="fig-item-100">
              <h2> {data.media_type == "tv" ? data.name : data.title}</h2>
            </div>
            <div className="fig-item">
              <i className="fa fa-star" aria-hidden="true"></i>
            </div>
            <div className="fig-item">
              <p>{data.vote_average}</p>
            </div>
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
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              {readableTrailerVideoLogic()}
              <div className="modal-card-item">
                <h1>{data.media_type == "tv" ? data.name : data.title}</h1>
              </div>
              <div className="modal-card-item">
                <p id="release-date">
                  {data.media_type == "tv"
                    ? data.first_air_date.substring(0, 4)
                    : data.release_date.substring(0, 4)}
                </p>
                {readableGenres()}
              </div>
              <div className="modal-card-item">
                <i className="fa fa-star" aria-hidden="true"></i>
                <h3>{data.vote_average}</h3>
                <p>{data.vote_count} votes</p>
              </div>
              <div className="modal-card-item">
                <p>
                  {
                    /* change later to scrollable description */ data.overview.substring(
                      0,
                      250
                    )
                  }
                </p>
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
