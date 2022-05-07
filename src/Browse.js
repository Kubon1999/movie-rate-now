import axios from "axios";
import MovieCard from "./MovieCard";
import ApiContext from "./ApiContext";
import { useEffect, useContext, useState } from "react";
import { Select } from "@mantine/core";

const Browse = () => {
  //get the trending data from api
  //api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>
  const apiConfiguration = useContext(ApiContext);
  const [trendingMovies, setTrendingMovies] = useState();
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState();

  useEffect(() => {
    if (apiConfiguration) {
      //fetch trending movies from api
      axios
        .get(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${apiConfiguration.apiKey}`
        )
        .then((response) => {
          setTrendingMovies(response.data);
        });
      setCategory("Trending");
      //fetch categories from the api
      axios
        .get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiConfiguration.apiKey}`
        )
        .then((response) => {
          let categoriesNames = response.data.genres.map((elem, key) => {
            return elem.name;
          });
          categoriesNames.push("Trending");
          setCategories(categoriesNames);
        });
    }
  }, [apiConfiguration]);

  return (
    <div className="container">
      {categories ? (
        <Select
          label="Category"
          placeholder="Pick one"
          searchable
          nothingFound="Not found"
          data={categories}
          clearable
          className="py-3 px-4"
          value={category}
          onChange={setCategory}
        />
      ) : null}
      <div className=" row gx-3 gy-3 ">
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
