import MovieCard from "../Movie/MovieCard";
import ReactPlayer from "react-player";
import { useState, useContext } from "react";
import axios from "axios";
import ApiContext from "../ApiContext";
import { Movie } from "../Movie/Movie";

const Results = ({ movies }) => {
  const [moviesVideoId, setMoviesVideoId] = useState([]);
  const apiConfiguration = useContext(ApiContext);

  async function requestMovieVideos(movieIndex, movieId, setter) {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiConfiguration.apiKey}`
      )
      .then((response) => {
        const temp = moviesVideoId;
        temp[movieIndex] = response.data.results[0].key;
        setter(temp);
      });
  }

  return (
    <div className="flex-container">
      {!movies.loading ? (
        movies.results.map((element, key) => {
          if (key % 2) {
            return (
              <div className="item" key={key}>
                <MovieCard movie={element} />
              </div>
            );
          }
          // if (key % 4 && element.media_type == "movie") {
          //   requestMovieVideos(key, element.id, setMoviesVideoId);
          //   console.log(key);
          //   console.log(element.id);
          //   const final_url_backdrop =
          //     apiConfiguration.images.base_url +
          //     "/w1280/" +
          //     element.poster_path +
          //     "?api_key=" +
          //     apiConfiguration.apiKey;
          //   return (
          //     <div className="item-2" key={key}>
          //       <img
          //         src={final_url_backdrop}
          //         alt={
          //           element.media_type == "tv" ? element.name : element.title
          //         }
          //       />
          //       <h5>{element.original_title}</h5>
          //     </div>
          //   );
          // }
          return (
            <div className="item" key={key}>
              <MovieCard data={element} />
            </div>
          );
        })
      ) : (
        <p>loading... </p>
      )}
    </div>
  );
};

export default Results;
