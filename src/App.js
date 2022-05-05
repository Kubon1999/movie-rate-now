import logo from './logo.svg';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import  { useAuthState }  from 'react-firebase-hooks/auth';

import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyDVrBdO44BUwk5YcqWFkdpVGsJUwkawGas",
  authDomain: "movie-rate-now.firebaseapp.com",
  projectId: "movie-rate-now",
  storageBucket: "movie-rate-now.appspot.com",
  messagingSenderId: "836171860164",
  appId: "1:836171860164:web:19b7e7064506351eea2191",
  measurementId: "G-LNKNC93RZ4"
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
