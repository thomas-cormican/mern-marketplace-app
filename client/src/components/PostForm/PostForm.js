import React, { useState, useRef } from "react";
import Styles from "./postForm.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { postCategories } from "../../utils/postData";

function PostForm() {
  const [post, setPost] = useState({
    title: "",
    description: "",
    contact: {
      email: "",
      phone: "",
    },
    category: null,
    price: null,
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInput = useRef();
  const navigate = useNavigate();

  const onSelectFile = (e) => {
    let files = [];
    Array.from(e.target.files).forEach((file) => {
      files.push(file);
    });
    setSelectedFiles(files);
  };

  const removeImage = (index) => {
    setSelectedFiles((prev) => {
      let newArray = prev.filter((image, i) => {
        return !(i === index);
      });

      return newArray;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => {
      if (name === "email" || name === "phone") {
        return { ...prev, contact: { ...prev.contact, [name]: value } };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let postFormData = new FormData();
    postFormData.append("title", post.title);
    postFormData.append("description", post.description);
    postFormData.append("category", post.category);
    postFormData.append("price", post.price);
    postFormData.append("email", post.contact.email);
    postFormData.append("phone", post.contact.phone);
    selectedFiles.forEach((file) => postFormData.append("photo", file));

    try {
      const response = await axios({
        url: "/posts",
        method: "post",
        data: postFormData,
      });
      navigate(`/post/${response.data.createdPost._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={Styles.postForm}>
      <form onSubmit={handleSubmit}>
        <input
          value={post.title}
          onChange={handleChange}
          name="title"
          className={Styles.titleInput}
          type="text"
          placeholder="Title"
          required
        />
        <textarea
          value={post.description}
          onChange={handleChange}
          name="description"
          className={Styles.descInput}
          rows="7"
          type="text"
          placeholder="Description"
          required
        />
        <label htmlFor="price">Price in €</label>
        <input
          value={post.price}
          onChange={handleChange}
          name="price"
          className={Styles.priceInput}
          type="number"
          placeholder="Price"
          required
        />
        <label htmlFor="">Contact</label>
        <input
          className={Styles.contactInput}
          value={post.contact.phone}
          onChange={handleChange}
          name="phone"
          type="text"
          placeholder="Phone number"
        />
        <input
          className={Styles.contactInput}
          value={post.contact.email}
          onChange={handleChange}
          name="email"
          placeholder="Email"
        />
        <label htmlFor="categories">Category</label>
        <select
          className={Styles.categoryInput}
          value={post.category}
          onChange={handleChange}
          name="category"
          id="categories"
          required
        >
          <option disabled selected value>
            Category
          </option>
          {postCategories.map((category) => (
            <option value={category}>{category}</option>
          ))}
        </select>
        <label className={Styles.fileInputLabel} htmlFor="fileInput">
          Upload Images
        </label>
        <input
          id="fileInput"
          onChange={onSelectFile}
          className={Styles.fileInput}
          type="file"
          multiple="multiple"
          ref={fileInput}
        />
        <div className={Styles.previewList}>
          {selectedFiles.map((file, index) => {
            return (
              <div className={Styles.previewImageWrapper}>
                <img
                  className={Styles.previewImage}
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                />
                <span
                  onClick={() => removeImage(index)}
                  className={Styles.removeImage}
                >
                  <AiFillCloseCircle />
                </span>
              </div>
            );
          })}
        </div>

        <button className={Styles.submitButton} type="submit">
          Post
        </button>
      </form>
    </div>
  );
}

export default PostForm;
