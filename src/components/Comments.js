import React, { useEffect } from "react";
import { COMMENT_API_URL, COMMENT_API_URL_EXT } from "../utils/constants";

const Comments = ({ id }) => {
  const url = COMMENT_API_URL + id + COMMENT_API_URL_EXT;
  const data = async () => {
    const response = await fetch(url);
    const json = await response.json();
    // console.log(json);
  };
  useEffect(()=>{
    data()
  },[])

  return <div>Comments</div>;
};

export default Comments;
