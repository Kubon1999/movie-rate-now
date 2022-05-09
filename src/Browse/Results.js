import MovieCard from "./MovieCard";
import ReactPlayer from "react-player";
import { useState, useContext } from "react";
import axios from "axios";
import ApiContext from "../ApiContext";

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
                <MovieCard data={element} />
              </div>
            );
          }
          // if (key % 4 && element.media_type == "movie") {
          //   requestMovieVideos(key, element.id, setMoviesVideoId);
          //   console.log(key);
          //   console.log(element.id);
          //   return (
          //     <div className="item-2 video-player" key={key}>
          //       <ReactPlayer
          //         url={`https://www.youtube.com/embed/${moviesVideoId[key]}`}
          //         //playing={!key ? true : false} - changed to false it is getting annoying...
          //         playing={false}
          //         controls={false}
          //         width="280"
          //         height="216"
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
        <p>loading...</p>
      )}
    </div>
  );
};

export default Results;
