import React from "react";
import { useParams } from "react-router-dom";

import { Post } from "../components/Post";
import axios from "../axios";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true)
  const { id } = useParams();

  React.useEffect(() => {
    axios.get(`/posts/${id}`)
    .then(res => {
      setData(res.data);
      setLoading(false);
    }).catch(err => {
      console.warn(err);
      alert('An error occurred while fetching the article.');
    })
  }, []);

  if(isLoading){
    return <Post isLoading={isLoading} isFullPost/>
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={0}
        isFullPost
      >
        <p>{data.text}</p>
      </Post>
    </>
  );
};
