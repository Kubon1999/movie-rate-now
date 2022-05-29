import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import {Api, ApiContext} from "./ApiContext";
import { useEffect, useState } from "react";
import { MantineProvider } from "@mantine/core";
import BottomNavbar from "./BottomNavbar";
import Home from "./Home/Home.js";
import Social from "./Social/Social.js";
import Person from "./Person/Person.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopNavbar from "./TopNavbar";
import Movies from "./Movies/Movies";
import axios from "axios";

firebase.initializeApp({
  apiKey: "AIzaSyDVrBdO44BUwk5YcqWFkdpVGsJUwkawGas",
  authDomain: "movie-rate-now.firebaseapp.com",
  projectId: "movie-rate-now",
  storageBucket: "movie-rate-now.appspot.com",
  messagingSenderId: "836171860164",
  appId: "1:836171860164:web:19b7e7064506351eea2191",
  measurementId: "G-LNKNC93RZ4",
});

function App() {
  /* state for api context */
  const [isLoading, setIsLoading] = useState(true);
  const [api, setApi] = useState<Api>();

  /* first - request base_url from the api */
  useEffect(() => {
    async function setBaseUrl() {
      try {
        // api key
        const apiKey = "8fec1c7af2cd769b4da8683430f356c5";
        //get base_url
        let requestedBaseUrl = await axios.get(
          `https://api.themoviedb.org/3/configuration?api_key=${apiKey}`
        );
        // get genres
        let requestedGenres = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
        );
        let genresArr: string[] = [];
        requestedGenres.data.genres.map((genre) => {
          genresArr[genre.id] = genre.name;
        });
        // set apikey, base_url, genres
        setApi({
          apiKey: apiKey,
          base_url: requestedBaseUrl.data.images.base_url,
          genres: genresArr,
        });
        // api loaded - load the page
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    setBaseUrl();
  }, []);

  return (
    <div>
      {!isLoading ? (
        <MantineProvider
          theme={{ colorScheme: "dark" }}
          withGlobalStyles
          withNormalizeCSS
        >
          <ApiContext.Provider value={api}>
            <BrowserRouter>
              <TopNavbar />
              <Routes>
                <Route path="/" element={<Movies />} />
                <Route path="/home" element={<Home />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/social" element={<Social />} />
                <Route path="/person" element={<Person />} />
              </Routes>
              <BottomNavbar />
            </BrowserRouter>
          </ApiContext.Provider>
        </MantineProvider>
      ) : (
        <h1>
          Ups! Our service is temporarly down! Try to refresh the page if it
          does not work - Come back later.
        </h1>
      )}
    </div>
  );
}

export default App;
