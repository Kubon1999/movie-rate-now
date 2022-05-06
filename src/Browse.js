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
    <div className=" container">
      <div className=" row gx-1 gy-1 ">
        {trendingMovies ? (
          trendingMovies.results.map((element, key) => {
            if (key % 2) {
              return (
                <div className="col col-md movieCardL" key={key}>
                  <MovieCard data={element} />
                </div>
              );
            }
            return (
              <div className="col col-md movieCardR" key={key}>
                <MovieCard data={element} />
              </div>
            );
          })
        ) : (
          <p>loading...</p>
        )}
      </div>
    </div>
  );
};

export default Browse;
