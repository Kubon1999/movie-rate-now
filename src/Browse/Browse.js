import axios from "axios";
import ApiContext from "../ApiContext";
import { useEffect, useContext, useState } from "react";
import { Select } from "@mantine/core";
import Results from "./Results";

const Browse = () => {
  //get the trending data from api
  //api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>
  const apiConfiguration = useContext(ApiContext);
  const [movies, setMovies] = useState({ loading: true });
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState({ name: "Action", id: 28 });

  useEffect(() => {
    if (!apiConfiguration.loading) {
      requestCategories();
      requestMovies();
    }
  }, [apiConfiguration]);

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
        setMovies(response.data);
      });
  }

  async function requestCategories() {
    //fetch categories from the api
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
        <Select
          label="Category"
          placeholder="Choose"
          searchable
          nothingFound="Not found"
          data={categories}
          clearable
          className="py-3 px-4"
          onChange={(e) => {
            setCategory(e);
          }}
        />
      ) : null}

      <Results movies={movies} />
    </>
  );
};

export default Browse;
