import { createContext } from "react";

export type Api = {
  apiKey: string;
  /*
   image url in the api constists of : base_url (from api = https://image.tmdb.org/t/p/), a file_size (w500) and a file_path(vertialImgUrl/horizontalImgUrl) (/kqjL17yufvn9OVLyXYpvtyrFfak.jpg)
   example: https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
   */
  base_url: string;
  genres: string[];
};

export const ApiContext = createContext<Api>(null);
