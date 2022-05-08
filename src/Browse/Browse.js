import axios from "axios";
import ApiContext from "../ApiContext";
import { useEffect, useContext, useState } from "react";
import { Select } from "@mantine/core";
import Results from "./Results";

const Browse = () => {
  //get the trending data from api
  //api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>
  const apiConfiguration = useContext(ApiContext);
  const [movies, setMovies] = useState();
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
  function somefunc(e) {
    console.log(e);
  }

  return (
    <>
      <div className="container">
        {categories ? (
          <div className="top-navbar">
            <Select
              label="Category"
              placeholder="Choose"
              searchable
              nothingFound="Not found"
              data={categories}
              clearable
              className="py-3 px-4"
              onChange={(e) => {
                console.log("setting new cat");
                console.log(e);
                setCategory(e);
              }}
            />
          </div>
        ) : null}

        <Results movies={movies} />
      </div>
    </>
  );
};

export default Browse;
