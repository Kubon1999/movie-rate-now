import axios from "axios";
import ApiContext from "../ApiContext";
import { useEffect, useContext, useState } from "react";
import { Select, SegmentedControl } from "@mantine/core";
import Results from "./Results";

const Movies = () => {
  //get the trending data from api
  //api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>
  const apiConfiguration = useContext(ApiContext);
  const [movies, setMovies] = useState();
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState({ name: "Action", id: 28 });

  /* on first load of api load categories and movies*/
  useEffect(() => {
    if (!apiConfiguration.loading) {
      requestCategories();
      requestMovies();
    }
  }, [apiConfiguration]);

  /* every time user changes movie category request new movies from this category */
  useEffect(() => {
    if (!apiConfiguration.loading) {
      requestMovies();
    }
  }, [category]);

  async function requestMovies() {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiConfiguration.apiKey}&language=en-US&with_genres=${category.id}`
      )
      .then((response) => {
        // convert movies from api -> type Movie (Movie.tsx)
        console.log(response.data.results);
        const moviesArray = response.data.results.map((movie) => {
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

  async function requestCategories() {
    // fetch categories from the api
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiConfiguration.apiKey}`
      )
      .then((response) => {
        const categoriesForSelect = response.data.genres.map((elem, key) => {
          return { label: elem.name, value: elem, key: key };
        });
        setCategories(categoriesForSelect);
      });
  }

  return (
    <>
      {categories ? (
        <>
          <Select
            label="Category"
            placeholder="Choose genre"
            searchable
            nothingFound="Not found"
            data={categories}
            clearable
            className="py-3 px-4"
            onChange={(e) => {
              setCategory(e);
            }}
          />
          {movies && <Results movies={movies} />}
        </>
      ) : null}
    </>
  );
};

export default Movies;
