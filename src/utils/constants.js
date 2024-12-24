
const GOOGLE_API_KEY = "AIzaSyBkTSiwfHDi6hMtoVoQ-u6eXP7uLWttYfI";

export const YOUTUBE_VIDEO_URL =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" +
  GOOGLE_API_KEY;

export const SEARCH_API_URL = "https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q="

export const COMMENT_API_URL = "https://www.googleapis.com/youtube/v3/commentThreads?key="+GOOGLE_API_KEY+"&textFormat=plainText&part=snippet&videoId="
export const COMMENT_API_URL_EXT = "&maxResults=100&pageToken="

export const CHANNEL_LOGO_URL = "https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id="
export const CHANNEL_LOGO_URL_EXT = "&key="+GOOGLE_API_KEY

export const SEARCH_VIDEO_URL = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=200&q="
export const SEARCH_VIDEO_URL_EXT = "&key="