
const GOOGLE_API_KEY = "AIzaSyD7AS6YMvFdPomjG4pbto9P79_L1oQwRK8";

export const YOUTUBE_VIDEO_URL =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" +
  GOOGLE_API_KEY;

export const SEARCH_API_URL = "https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q="

export const COMMENT_API_URL = "https://www.googleapis.com/youtube/v3/commentThreads?key="+GOOGLE_API_KEY+"&textFormat=plainText&part=snippet&videoId="
export const COMMENT_API_URL_EXT = "&maxResults=100&pageToken="

export const CHANNEL_LOGO_URL = "https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id="

export const CHANNEL_LOGO_URL_EXT = "&key="+GOOGLE_API_KEY