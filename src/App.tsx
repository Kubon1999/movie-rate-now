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
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TopNavbar from "./TopNavbar";
import Movies from "./Movies/Movies";
import { Api } from "./ApiContext";

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
  const [apiInitializationSuccessfull, setApiInitializationSuccessfull] =
    useState(false);
  let api = new Api("8fec1c7af2cd769b4da8683430f356c5");

  useEffect(() => {
    /* first run get basic api configuration & set apiContext */
    api.initialize().then((value) => {
      console.log("eee");
      setApiInitializationSuccessfull(true);
    });
  }, []);

  useEffect(() => {
    if (apiInitializationSuccessfull) {
      api.requestGenres();
    }
  }, [apiInitializationSuccessfull]);

  return (
    <div>
      {apiInitializationSuccessfull ? (
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
        <h1>Ups! Our service is temporarly down! Come back later.</h1>
      )}
    </div>
  );
}

export default App;
