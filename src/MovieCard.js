import { useContext, useEffect } from "react";
import ApiContext from "./ApiContext";

const MovieCard = () => {
  const apiConfiguration = useContext(ApiContext);

  useEffect(() => {
    console.log("apiConfiguration");
    console.log(apiConfiguration);
  }, [apiConfiguration]);

  if (apiConfiguration) return apiConfiguration.images.base_url;
  return <h1> this is my card</h1>;
};

export default MovieCard;
