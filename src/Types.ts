export type Movie = {
  id: number;
  title: string;
  year: number;
  description: string;
  genreIds: number[];
  rate: number;
  numberOfVotes: number;
  popularity: number;
  /* 
  image url in the api constists of : base_url (from api = https://image.tmdb.org/t/p/), a file_size (w500) and a file_path(vertialImgUrl/horizontalImgUrl) (/kqjL17yufvn9OVLyXYpvtyrFfak.jpg)
  example: https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg 
  */
  horizontalImgUrl: string;
  verticalImgUrl: string;
  listOfTrailerUrl?: string[] /* a movie might not have any videos/trailers */;
  adult: boolean;
};
