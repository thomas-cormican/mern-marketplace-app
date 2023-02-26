import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const usePosts = (url) => {
  const [posts, setPosts] = useState([]);
  const [fetchingPosts, setFetchingPosts] = useState(true);

  const getPosts = useCallback(
    async (postsUrl = url, signal) => {
      try {
        const response = await axios.get(postsUrl, { signal });
        setPosts(response.data.posts);
        setFetchingPosts(false);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
    [url]
  );

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getPosts(url, signal);
    return () => {
      console.log("aborting request");
      controller.abort();
    };
  }, [url, getPosts]);

  const deletePost = (postId) => {
    setPosts((prev) => {
      return prev.filter((post) => post._id !== postId);
    });
  };

  return { posts, setPosts, deletePost, fetchingPosts, getPosts };
};

export default usePosts;
