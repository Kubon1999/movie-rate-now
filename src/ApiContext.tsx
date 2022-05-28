import { createContext } from "react";
import axios from "axios";

// export type Api = {
//   apiKey: string;
//   /*
//   image url in the api constists of : base_url (from api = https://image.tmdb.org/t/p/), a file_size (w500) and a file_path(vertialImgUrl/horizontalImgUrl) (/kqjL17yufvn9OVLyXYpvtyrFfak.jpg)
//   example: https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
//   */
//   base_url: string;
//   initialize: (api: Api) => { apiKey: string; base_url: string };
//   requestGenres: (api: Api) => typeof genres;
//   genres: typeof genres;
// };

export class Api {
  apiKey: string;
  /*
   image url in the api constists of : base_url (from api = https://image.tmdb.org/t/p/), a file_size (w500) and a file_path(vertialImgUrl/horizontalImgUrl) (/kqjL17yufvn9OVLyXYpvtyrFfak.jpg)
   example: https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
   */
  base_url: string;
  genres: string[];

  constructor(apiKey: string) {
    //set api key
    this.apiKey = apiKey;
    this.genres = [];
  }

  async initialize(): Promise<boolean> {
    //get & set base_url
    return await axios
      .get(`https://api.themoviedb.org/3/configuration?api_key=${this.apiKey}`)
      .then((response) => {
        this.base_url = response.data.images.base_url;
        return true;
      })
      .catch(function (error) {
        console.log(error.toJSON());
        return false;
      });
  }

  async requestGenres() {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}`
      )
      .then((response) => {
        response.data.genres.map((genre) => {
          this.genres[genre.id] = genre.name;
        });
      });
  }
}

const ApiContext = createContext<Api | null>(null);

export default ApiContext;
