import React from "react";
import Styles from "./home.module.css";
import Post from "../../components/Post/Post";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { postCategories } from "../../utils/postData";
import { Link } from "react-router-dom";
import usePosts from "../../hooks/usePosts";

function Home() {
  const { posts, deletePost, fetchingPosts } = usePosts("posts");
  let postLinkArray = [];

  for (let i = 0; i < postCategories.length; i += 4) {
    postLinkArray.push(postCategories.slice(i, i + 4));
  }

  if (fetchingPosts) {
    return <LoadingSpinner />;
  }

  return (
    <div className={Styles.home}>
      <section className={Styles.categories}>
        <h2>Categories</h2>
        <div className={Styles.categoriesWrapper}>
          {postLinkArray.map((row) => {
            return (
              <div className={Styles.categoryRow}>
                {row.map((category) => {
                  return (
                    <Link to={`/search/${category}`}>
                      <span className={Styles.category}>{category}</span>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
      </section>
      <section className={Styles.postsSection}>
        <h2>Recent Posts</h2>
        {posts.length === 0 && (
          <p className={Styles.noPostsMessage}>No posts yet.</p>
        )}
        {posts.map((post) => {
          return (
            <div className={Styles.postContainer}>
              <Post onDeletePost={deletePost} post={post} />
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default Home;
