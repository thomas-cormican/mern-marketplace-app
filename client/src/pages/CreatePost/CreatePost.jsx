import React, { useContext } from "react";
import Styles from "./createPost.module.css";
import PostForm from "../../components/PostForm/PostForm";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

function CreatePost() {
  const { auth } = useContext(AuthContext);

  if (!auth.user) {
    return <Navigate replace to="/login" />;
  }

  return (
    <div className={Styles.createPost}>
      <h2>Create a posting</h2>
      <PostForm />
    </div>
  );
}

export default CreatePost;
