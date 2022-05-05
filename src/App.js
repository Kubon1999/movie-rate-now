import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import axios from "axios";
import ApiContext from "./ApiContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useEffect, useState } from "react";
import Browse from "./Browse.js";

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
  const [apiConfiguration, setApiConfiguration] = useState();

  useEffect(() => {
    axios.get(url).then((response) => {
      setApiConfiguration(response.data);
    });
  }, [url]);

  return (
    <div className="App">
      <ApiContext.Provider value={apiConfiguration}>
        <div className="content">
          <Browse />
        </div>
      </ApiContext.Provider>
    </div>
  );
}

export default App;
