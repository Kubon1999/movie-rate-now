import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import axios from "axios";
import ApiContext from "./ApiContext";
import { useEffect, useState } from "react";
import Browse from "./Browse/Browse.js";
import { MantineProvider } from "@mantine/core";
import BottomNavbar from "./BottomNavbar";
import Home from "./Home/Home.js";
import Social from "./Social/Social.js";
import Person from "./Person/Person.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

  return (
    <div>
      <MantineProvider
        theme={{ colorScheme: "dark" }}
        withGlobalStyles
        withNormalizeCSS
      >
        <ApiContext.Provider value={apiConfiguration}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Browse />} />
              <Route path="/home" element={<Home />} />
              <Route path="/browse" element={<Browse />} />
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
