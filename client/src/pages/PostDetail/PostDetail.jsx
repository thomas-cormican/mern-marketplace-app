import React, { useState, useEffect } from "react";
import Styles from "./postDetail.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
import {
  AiOutlineClockCircle,
  AiOutlineUser,
  AiOutlineShareAlt,
} from "react-icons/ai";
import dateFormat from "dateformat";
import { CopyToClipboard } from "react-copy-to-clipboard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/posts/${id}`);
        setPost(response.data.post);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [id]);

  const handleSlide = (e) => {
    const { id } = e.target;
    if (id === "rightArrow") {
      setCurrentImage((prev) => {
        if (prev === post.images.length - 1) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }
    if (id === "leftArrow") {
      setCurrentImage((prev) => {
        if (prev === 0) {
          return post.images.length - 1;
        } else {
          return prev - 1;
        }
      });
    }
  };

  if (!post) {
    return <LoadingSpinner />;
  }

  return (
    <div className={Styles.postDetail}>
      <div className={Styles.imageSlider}>
        <img
          className={Styles.image}
          src={`/postImages/${post?.images[currentImage]}`}
          alt={post?.title}
        />
        <span
          onClick={handleSlide}
          id="leftArrow"
          className={`${Styles.arrow} ${Styles.leftArrow}`}
        >
          <BsFillArrowLeftSquareFill />
        </span>
        <span
          onClick={handleSlide}
          id="rightArrow"
          className={`${Styles.arrow} ${Styles.rightArrow}`}
        >
          <BsFillArrowRightSquareFill />
        </span>
      </div>
      <div className={Styles.postBody}>
        <h1>{post?.title}</h1>
        <span className={Styles.postDateUsername}>
          <AiOutlineClockCircle />{" "}
          <span className={Styles.postDate}>
            {dateFormat(post?.createdAt, "mmmm d, yyyy")}
          </span>
          <AiOutlineUser />
          <span className={Styles.postUsername}>{post?.author.username}</span>
        </span>
        <span className={Styles.price}>
          Price:{" "}
          <span className={Styles.priceNumber}>
            €{parseInt(post?.price).toLocaleString("en-US")}
          </span>
        </span>
        <CopyToClipboard text={window.location.href}>
          <span className={Styles.share}>
            <AiOutlineShareAlt />
          </span>
        </CopyToClipboard>
        <p className={Styles.description}>{post.description}</p>
        <div className={Styles.contact}>
          <span className={Styles.email}>
            <span>Email:</span>
            {post.contact.email}
          </span>
          <span className={Styles.phone}>
            <span>Phone:</span>
            {post.contact.phone}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
