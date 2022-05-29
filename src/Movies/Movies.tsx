import axios from "axios";
import { ApiContext } from "../ApiContext";
import { useEffect, useContext, useState } from "react";
import { Select } from "@mantine/core";
import Results from "./Results";
import { Movie } from "../Types";

type genresToChooseFrom = {
  label: string;
  value: number;
  key: number;
};

const Movies = () => {
  //get the trending data from api
  //api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>
  const apiConfiguration = useContext(ApiContext);
  const [movies, setMovies] = useState<Movie[]>();
  const [genresList, setGenresList] = useState<genresToChooseFrom[]>();
  const [selectedGenre, setSelectedGenre] = useState(28); // 28 - action

  /* on first load of api load categories and movies*/
  useEffect(() => {
    if (apiConfiguration != null) {
      requestGenres();
      requestMovies();
    }
  }, [apiConfiguration]);

  /* every time user changes movie genre request new movies from this genre */
  useEffect(() => {
    if (apiConfiguration) {
      requestMovies();
    }
  }, [selectedGenre]);

  async function requestMovies() {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiConfiguration.apiKey}&language=en-US&with_genres=${selectedGenre}`
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

  async function requestGenres() {
    // fetch genres from the api
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiConfiguration.apiKey}`
      )
      .then((response) => {
        const genresToSelect: genresToChooseFrom[] = response.data.genres.map(
          (elem, key) => {
            return { label: elem.name, value: elem.id, key: key };
          }
        );
        setGenresList(genresToSelect);
      });
  }

  return (
    <>
      {genresList ? (
        <>
          <Select
            label="Category"
            placeholder="Choose genre"
            searchable
            nothingFound="Not found"
            data={genresList}
            clearable
            className="py-3 px-4"
            onChange={(e: number) => {
              setSelectedGenre(e);
            }}
          />
          {movies && <Results movies={movies} />}
        </>
      ) : null}
    </>
  );
};

export default Movies;
