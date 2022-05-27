import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import axios from "axios";
import ApiContext from "./ApiContext";
import { useEffect, useState } from "react";
import { MantineProvider } from "@mantine/core";
import BottomNavbar from "./BottomNavbar";
import Home from "./Home/Home.js";
import Social from "./Social/Social.js";
import Person from "./Person/Person.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopNavbar from "./TopNavbar";
import Movies from "./Movies/Movies";
import { genres } from "./Movie/Movie";

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
  const url =
    "https://api.themoviedb.org/3/configuration?api_key=8fec1c7af2cd769b4da8683430f356c5";
  const [apiConfiguration, setApiConfiguration] = useState({ loading: true });

  useEffect(() => {
    axios.get(url).then((response) => {
      const temp = new Object(response.data);
      temp.apiKey = "8fec1c7af2cd769b4da8683430f356c5";
      temp.loading = false;
      setApiConfiguration(temp);
    });
  }, [url]);

  useEffect(() => {
    if (!apiConfiguration.loading) {
      requestGenres("tv");
      requestGenres("movie");
    }
  }, [apiConfiguration]);

  async function requestGenres(movieOrTv) {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/${movieOrTv}/list?api_key=${apiConfiguration.apiKey}`
      )
      .then((response) => {
        response.data.genres.map((genre) => {
          genres[genre.id] = genre.name;
        });
        const temp = new Object(apiConfiguration);
        temp[movieOrTv] = genres;
        setApiConfiguration(temp);
      });
  }

  return (
    <div>
      <MantineProvider
        theme={{ colorScheme: "dark" }}
        withGlobalStyles
        withNormalizeCSS
      >
        <ApiContext.Provider value={apiConfiguration}>
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
    </div>
  );
}

export default App;
