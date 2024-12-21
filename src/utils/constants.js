<<<<<<< HEAD
const GOOGLE_API_KEY = "AIzaSyD7AS6YMvFdPomjG4pbto9P79_L1oQwRK8";
=======
const GOOGLE_API_KEY = "AIzaSyAFTBObt3QD_IgjszqpLndXCejwxi8zuqg"
>>>>>>> 72880a1e62b8ee2fff86f1f0d8f387b6ed893fb7

export const YOUTUBE_VIDEO_URL =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" +
  GOOGLE_API_KEY;

export const SEARCH_API_URL =
  "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=";
export const SEARCH_API_URL_EXT = "&type=video&key=" + GOOGLE_API_KEY;
