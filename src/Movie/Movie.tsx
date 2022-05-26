export interface Movie {
  id: number;
  title: string;
  year: number;
  description: string;
  categories: string[];
  rate: number;
  numberOfVotes: number;
  /* 
  imgUrl in the api constists of : base_url (from api = https://image.tmdb.org/t/p/), a file_size (w500) and a file_path (/kqjL17yufvn9OVLyXYpvtyrFfak.jpg)
  example: https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg 
  */
  horizontalImgUrl: string;
  vertialImgUrl: string;
  listOfTrailerUrl?: string[] /* a movie might not have any videos/trailers */;
}
