import React, { useState, useContext } from "react";
import Styles from "./topbar.module.css";
import { Link } from "react-router-dom";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

function Topbar({ onMenuToggle }) {
  const { auth, logout } = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [closeSearch, setCloseSearch] = useState(true);
  const [searching, setSearching] = useState(false);

  const handleChange = async (e) => {
    setSearchValue(e.target.value);
    setSearching(true);
    try {
      if (e.target.value.length > 0) {
        const response = await axios.get(`/posts?title=${e.target.value}`);
        console.log(response);
        setSearchResults(response.data.posts);
        setSearching(false);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={Styles.topbar}>
      <div className={Styles.topbarLeft}>
        <form className={Styles.searchBar}>
          <div
            className={Styles.overlay}
            style={closeSearch ? { display: "none" } : { display: "block" }}
            onClick={() => {
              setCloseSearch(true);
            }}
          ></div>
          <div className={Styles.searchBarWrapper}>
            <AiOutlineSearch />
            <input
              onChange={handleChange}
              onClick={() => setCloseSearch(false)}
              type="text"
              placeholder="Search"
            />
            <div
              className={Styles.searchResultsWrapper}
              style={closeSearch ? { display: "none" } : { display: "block" }}
            >
              <div className={Styles.searchResults}>
                {searchResults.length !== 0 ? (
                  searchResults.map((searchResult) => (
                    <Link to={`/post/${searchResult._id}`}>
                      <div
                        onClick={() => setCloseSearch(true)}
                        className={Styles.searchResult}
                      >
                        <img
                          className={Styles.searchImage}
                          src={`/postImages/${searchResult.images[0]}`}
                          alt={searchResult.title}
                        />
                        <span className={Styles.searchResultTitle}>
                          {searchResult.title}
                        </span>
                        <span className={Styles.searchResultPrice}>
                          €{searchResult.price}
                        </span>
                      </div>
                    </Link>
                  ))
                ) : searchValue.length === 0 || searching ? (
                  <span>Type to search.</span>
                ) : (
                  <span>No posts found.</span>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className={Styles.topbarRight}>
        <span
          onClick={() => onMenuToggle((prev) => !prev)}
          className={Styles.menuButton}
        >
          <AiOutlineMenu />
        </span>
        <div className={Styles.auth}>
          {auth.fetching ? (
            <></>
          ) : auth.user === null ? (
            <>
              <Link to="/login">
                <span className={Styles.authLogin}>Login</span>
              </Link>
              <Link to="/register">
                <span className={Styles.authSignup}>Sign Up</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/create">
                <span className={Styles.authSignup}>Create a posting</span>
              </Link>
              <Link to={`/profile/${auth.user._id}`}>
                <span className={Styles.authSignup}>Your posts</span>
              </Link>
              <span onClick={logout} className={Styles.authLogin}>
                Logout
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
