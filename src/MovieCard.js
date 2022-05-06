import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ApiContext from "./ApiContext";

const MovieCard = (props) => {
  const { data } = props;
  const apiConfiguration = useContext(ApiContext);
  const [posterUrl, setPosterUrl] = useState("");

  useEffect(() => {
    if (apiConfiguration) {
      //get the poster of a movie
      //example:
      //https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
      //base_url + size + path + apikey
      const base_url = apiConfiguration.images.base_url;
      const final_url =
        base_url +
        "/w500/" +
        data.poster_path +
        "?api_key=" +
        apiConfiguration.apiKey;
      setPosterUrl(final_url);
    }
  }, [apiConfiguration]);

  //if (apiConfiguration) return apiConfiguration.images.base_url;
  //console.log(data);
  return (
    <>
      {posterUrl ? <img src={posterUrl} /> : <p>loading img</p>}
      <h1> {data.title} </h1>
    </>
  );
};

export default MovieCard;
