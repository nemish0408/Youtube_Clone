import { useState } from "react";
import axios from "axios";

const useLoadMoreVideos = (baseURL, nextPageToken, setNextPageToken) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadMore = async () => {
    // console.log(nextPageToken);
    
    if (!nextPageToken || loading) return;

    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}&pageToken=${nextPageToken}`);
      const newVideos = response.data.items || [];
      setData((prevData) => [...prevData, ...newVideos]);
      setNextPageToken(response.data.nextPageToken || "");
      
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, loadMore };
};

export default useLoadMoreVideos;
