import React, { useState, useEffect, useContext } from "react";
import Styles from "./layout.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Topbar from "../../components/Topbar/Topbar";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Notification from "../../components/Notification/Notification";
import Footer from "../../components/Footer/Footer";

function Layout() {
  const { auth } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(document.body.clientHeight);
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(document.body.clientHeight);
    });
  }, []);

  return (
    <div>
      <div className={Styles.layoutWrapper}>
        <div className={Styles.layout}>
          <div
            className={Styles.sideBar}
            style={
              windowWidth < 1040 && !openMenu
                ? { display: "none", height: windowHeight }
                : { display: "block", height: windowHeight }
            }
          >
            <Navbar onMenuToggle={setOpenMenu} />
            <div
              onClick={() => setOpenMenu((prev) => !prev)}
              className={Styles.navbarOverlay}
              style={openMenu ? { display: "block" } : { diplay: "none" }}
            ></div>
          </div>
          <div className={Styles.mainContainer}>
            <Topbar onMenuToggle={setOpenMenu} />
            <div className={Styles.main}>
              {auth.fetching ? (
                <LoadingSpinner />
              ) : (
                <>
                  <main>
                    <Outlet />
                  </main>
                </>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
      {auth.notification && <Notification />}
    </div>
  );
}

export default Layout;
