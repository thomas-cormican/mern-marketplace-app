import React, { useState, useEffect } from "react";
import Styles from "./search.module.css";
import { useParams } from "react-router-dom";
import Post from "../../components/Post/Post";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import usePosts from "../../hooks/usePosts";

function Search() {
  const { category } = useParams();
  const { posts, deletePost, fetchingPosts, getPosts } = usePosts(
    `/posts?category=${category}`
  );
  const [filter, setFilter] = useState({
    sort: "-createdAt",
    category,
    lte: null,
    gte: null,
  });

  useEffect(() => {
    getPosts();
  }, [category, getPosts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let queryString = "";
    Object.entries(filter).forEach(([key, value], index) => {
      if (value != null) {
        if (index === 0) {
          queryString += `?${key}=${value}`;
        } else {
          queryString += `&${key}=${value}`;
        }
      }
    });

    try {
      getPosts(`/posts${queryString}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={Styles.search}>
      <h2>{category} for sale</h2>
      <div className={Styles.searchBody}>
        <div className={Styles.filters}>
          <h3>Filters</h3>
          <form onSubmit={handleSubmit} className={Styles.filterForm}>
            <label>Sort by</label>
            <select name="sort" value={filter.sort} onChange={handleChange}>
              <option value="-createdAt">Newest</option>
              <option value="+createdAt">Oldest</option>
              <option value="-price">Highest price</option>
              <option value="+price">Lowest price</option>
            </select>
            <label>Price</label>
            <div className={Styles.priceInputs}>
              <input
                name="gte"
                value={filter.gte}
                onChange={handleChange}
                type="number"
                placeholder="min"
              />
              <input
                name="lte"
                value={filter.lte}
                onChange={handleChange}
                type="number"
                placeholder="max"
              />
            </div>
            <button>Filter</button>
          </form>
        </div>
        <div className={Styles.itemList}>
          {fetchingPosts && <LoadingSpinner />}
          {!fetchingPosts && posts.length === 0 && (
            <p className={Styles.noPostsMessage}>No posts found.</p>
          )}
          {posts.map((post) => (
            <Post post={post} onDeletePost={deletePost} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
