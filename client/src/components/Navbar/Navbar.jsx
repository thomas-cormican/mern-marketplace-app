import React, { useState, useEffect, useContext } from "react";
import Styles from "./navbar.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../context/AuthContext";

function Navbar({ onMenuToggle }) {
  const { auth, logout } = useContext(AuthContext);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowHeight(window.innerHeight);
    });
  });

  const toggleMenu = () => {
    onMenuToggle(false);
  };

  return (
    <nav className={Styles.navbar} style={{ height: windowHeight }}>
      <Link onClick={toggleMenu} to="/">
        <div className={Styles.logo}>
          <img className={Styles.logoImage} src={logo} alt="logo" />
          <h1>Dragon Market</h1>
        </div>
      </Link>
      <div className={Styles.subtext}>
        The premier online platform for buying and selling goods. Whether you're
        looking for a new addition to your collection, a rare vintage find, or a
        practical item for daily use, you'll find it all here.
      </div>
      <ul className={Styles.links}>
        {!auth.user ? (
          <>
            <Link onClick={toggleMenu} to="/login">
              <li>Login</li>
            </Link>
            <Link onClick={toggleMenu} to="/register">
              <li>Sign Up</li>
            </Link>
          </>
        ) : (
          <>
            <li onClick={logout}>Logout</li>
            <Link onClick={toggleMenu} to={`/profile/${auth.user._id}`}>
              <li>Your posts</li>
            </Link>
            <Link onClick={toggleMenu} to="/create">
              <li>Create Posting</li>
            </Link>
          </>
        )}

        <Link onClick={toggleMenu} to="/">
          <li>Info</li>
        </Link>
        <Link onClick={toggleMenu} to="/">
          <li>FAQ</li>
        </Link>
        <Link onClick={toggleMenu} to="/">
          <li>Donate</li>
        </Link>
      </ul>
      <div>
        <h3>Subscribe to mailing list</h3>
        <form className={Styles.subscribeForm}>
          <input type="text" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
