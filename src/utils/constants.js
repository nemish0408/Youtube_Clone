
const GOOGLE_API_KEY = "AIzaSyD7AS6YMvFdPomjG4pbto9P79_L1oQwRK8";

export const YOUTUBE_VIDEO_URL =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" +
  GOOGLE_API_KEY;

export const SEARCH_API_URL =
  "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=";
export const SEARCH_API_URL_EXT = "&type=video&key=" + GOOGLE_API_KEY;
