import React, { useContext } from "react";
import Styles from "./post.module.css";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";

function Post({ post, onDeletePost }) {
  const { auth } = useContext(AuthContext);

  const deletePost = async () => {
    try {
      await axios.delete(`/posts/${post._id}`);
      onDeletePost(post._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={Styles.postWrapper}>
      <Link to={`/post/${post._id}`}>
        <div className={Styles.post}>
          <img
            className={Styles.postImage}
            src={`/postImages/${post.images[0]}`}
            alt={post.title}
            loading="lazy"
          />
          <div className={Styles.postInfo}>
            <div className={Styles.postInfoTop}>
              <p className={Styles.postTitle}>{post.title}</p>
              <span className={Styles.postDate}>
                posted on {dateFormat(post.createdAt, "mmmm d, yyyy")} by{" "}
                {post.author.username}
              </span>
              <p className={Styles.postDescription}>{post.description}</p>
            </div>
            <div className={Styles.postInfoBottom}>
              <span className={Styles.postPrice}>
                €{parseInt(post.price).toLocaleString("en-US")}
              </span>
            </div>
          </div>
        </div>
      </Link>
      {post.author._id === auth.user?._id && (
        <span onClick={deletePost} className={Styles.deleteButton}>
          <AiFillDelete />
        </span>
      )}
    </div>
  );
}

export default Post;
