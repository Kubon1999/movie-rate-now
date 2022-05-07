import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ApiContext from "./ApiContext";
import { Image } from "react-bootstrap/Image";

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
  //width of an poster must be 150 (original = 390) (150/390 = 0.38)
  // so height will be 577 (original) = (570*0.38 = 216)
  return (
    <>
      {posterUrl ? (
        <img
          src={posterUrl}
          className="rounded"
          alt={data.title}
          width="140"
          height="216"
        />
      ) : (
        <p>loading img</p>
      )}
    </>
  );
};

export default MovieCard;
