import axios from "axios";
import MovieCard from "./MovieCard";
import ApiContext from "./ApiContext";
import { useEffect, useContext, useState } from "react";

const Browse = () => {
  //get the trending data from api
  //api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>
  const apiConfiguration = useContext(ApiContext);
  const [trendingMovies, setTrendingMovies] = useState();

  useEffect(() => {
    if (apiConfiguration) {
      axios
        .get(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${apiConfiguration.apiKey}`
        )
        .then((response) => {
          setTrendingMovies(response.data);
        });
    }
  }, [apiConfiguration]);

  return (
    <div className="border">
      {trendingMovies ? (
        trendingMovies.results.map((element, key) => {
          return <MovieCard data={element} key={key} />;
        })
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default Browse;
