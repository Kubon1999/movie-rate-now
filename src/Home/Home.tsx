import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { ApiContext } from "../ApiContext";
import { Link } from "react-router-dom";
import "../style/Home.css";
import MovieCard from "../Movie/MovieCard";
import { Movie } from "../Types";

const Home = () => {
  const apiConfiguration = useContext(ApiContext);
  const [movies, setMovies] = useState<Movie[]>(null);

  useEffect(() => {
    requestMovies();
  }, []);

  async function requestMovies() {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiConfiguration.apiKey}`
      )
      .then((response) => {
        // convert movies from api -> type Movie (Movie.tsx)
        const moviesArray: Movie[] = response.data.results.map((movie) => {
          return {
            id: movie.id,
            title: movie.original_title,
            year: parseInt(movie.release_date.substring(0, 4)),
            description: movie.overview,
            genreIds: movie.genre_ids,
            rate: movie.vote_average,
            numberOfVotes: movie.vote_count,
            popularity: movie.popularity,
            horizontalImgUrl: movie.backdrop_path,
            verticalImgUrl: movie.poster_path,
          };
        });
        setMovies(moviesArray);
      });
  }

  return (
    <ul className="featured-videos-grid">
      <li className="text">
        <h1>
          <i>Watch the new teaser trailer for</i>{" "}
        </h1>
        <h1>
          <b>Avatar: The Way of Water.</b>
        </h1>
        <p>
          Experience it only in cinemas December 16, 2022. brand-new teaser
          trailer for Avatar: The Way of Water.
        </p>
      </li>
      <li className="video">
        <iframe
          src={`https://www.youtube.com/embed/6AvFHlKS6OE`}
          height="432px"
          width="100%"
          frameBorder="0"
          allow="autoplay"
          title="video-player"
        ></iframe>
      </li>
      <li className="small-text">
        <h1>
          <i>Trending movies</i>{" "}
        </h1>
        <h1>
          <b>NOW</b>
        </h1>
        <p>Click to watch trailer, get rating and more!</p>
      </li>
      <li className="cards">{movies && <MovieCard movie={movies[0]} />}</li>
      <li className="cards">{movies && <MovieCard movie={movies[1]} />}</li>
      <li className="cards">{movies && <MovieCard movie={movies[2]} />}</li>
      <li className="cards">{movies && <MovieCard movie={movies[3]} />}</li>
      <li className="cards">{movies && <MovieCard movie={movies[4]} />}</li>

      {/* <li className="w-3">
        <Link to="/vertical-video">
          <figure>
            <img src="img/vertical-img.png" alt="DB Bench Flys" />
            <figcaption>
              <h2>DB Bench Flys</h2>
            </figcaption>
          </figure>
        </Link>
      </li> */}
    </ul>
  );
};
export default Home;
