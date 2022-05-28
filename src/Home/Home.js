import axios from "axios";
import { useState, useEffect, useContext } from "react";
import ApiContext from "../ApiContext";
import Results from "../Movies/Results";
import ReactPlayer from "react-player";

const Home = () => {
  const apiConfiguration = useContext(ApiContext);
  const [trendingMovies, setTrendingMovies] = useState({ loading: true });
  const [trendingTvShows, setTrendingTvShows] = useState({ loading: true });
  const [movieVideo, setMovieVideo] = useState();

  useEffect(() => {
    if (!apiConfiguration.loading) {
      requestTrending("movies", setTrendingMovies);
      requestTrending("tv", setTrendingTvShows);
    }
  }, [apiConfiguration]);

  useEffect(() => {
    if (!trendingMovies.loading) {
      requestMovieVideos(trendingMovies.results[0].id, setMovieVideo);
    }
  }, [trendingMovies]);

  async function requestTrending(productionType, setter) {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/${productionType}/day?api_key=${apiConfiguration.apiKey}`
      )
      .then((response) => {
        console.log(response.data);
        let temp = new Object(response.data);
        temp.loading = false;
        setter(temp);
      });
  }

  async function requestMovieDetails(movieId, setter) {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiConfiguration.apiKey}`
      )
      .then((response) => {
        // movieDetails = response.data;
      });
  }

  async function requestMovieVideos(movieId, setter) {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiConfiguration.apiKey}`
      )
      .then((response) => {
        console.log(response.data.results[0].key);
        setter(response.data.results[0].key);
      });
  }

  return (
    <>
      <div className="home-titles">
        <h1> Trending movies</h1>
        <Results movies={trendingMovies} />
        <h1> Trending Tv Shows</h1>
        <Results movies={trendingTvShows} />
      </div>
    </>
  );
};
export default Home;
