import axios from "axios";
import ApiContext from "../ApiContext";
import { useContext } from "react";
import { Movie } from "./Movie";

const MovieModal = (movie: Movie) => {
  const apiConfiguration = useContext(ApiContext);
  console.log(movie);
  /* function that gets all the trailers/videos available for the movie */
  async function requestMovieVideos() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiConfiguration.apiKey}`
      )
      .then((response) => {
        /* set Movie videos/trailers */
        const videosArray = response.data.results[0];
        movie.listOfTrailerUrl = videosArray.map((video) => {
          return video.key;
        });
        // setter(response.data.results[0].key);
      });
  }

  return (
    <h1> rgegr</h1>
    // <div className="modal-view">
    //   <div
    //     className="modal-card"
    //     style={{
    //       backgroundImage: `url(${backdropUrl})`,
    //       backgroundPosition: "center",
    //       backgroundSize: "cover",
    //       backgroundRepeat: "no-repeat",
    //     }}
    //   >
    //     {readableTrailerVideoLogic()}
    //     <div className="modal-card-item">
    //       <h1>{data.media_type == "tv" ? data.name : data.title}</h1>
    //     </div>
    //     <div className="modal-card-item">
    //       <p id="release-date">
    //         {data.media_type == "tv"
    //           ? data.first_air_date.substring(0, 4)
    //           : data.release_date.substring(0, 4)}
    //       </p>
    //       {readableGenres()}
    //     </div>
    //     <div className="modal-card-item">
    //       <i className="fa fa-star" aria-hidden="true"></i>
    //       <h3>{data.vote_average}</h3>
    //       <p>{data.vote_count} votes</p>
    //     </div>
    //     <div className="modal-card-item">
    //       <p>
    //         {
    //           /* change later to scrollable description */ data.overview.substring(
    //             0,
    //             250
    //           )
    //         }
    //       </p>
    //     </div>
    //     <i
    //       className="fa fa-times"
    //       aria-hidden="true"
    //       onClick={() => setShowModal(!showModal)}
    //     ></i>
    //   </div>
    // </div>
  );
};
export default MovieModal;
