import React, { useEffect, useContext } from "react";
import Styles from "./profile.module.css";
import Post from "../../components/Post/Post";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import usePosts from "../../hooks/usePosts";

function Profile() {
  const { userId } = useParams();
  const { posts, deletePost, fetchingPosts, getPosts } = usePosts(
    `/posts?user=${userId}`
  );
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    getPosts();
  }, [userId, getPosts]);

  if (!auth.user) {
    return <Navigate replace to="/login" />;
  }

  if (fetchingPosts) {
    return <LoadingSpinner />;
  }

  return (
    <div className={Styles.profile}>
      <h2>Your posts</h2>
      <div>
        {posts.length === 0 && (
          <p className={Styles.noPostsMessage}>No posts yet.</p>
        )}
        {posts.map((post) => {
          return (
            <div className={Styles.postContainer}>
              <Post post={post} onDeletePost={deletePost} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
