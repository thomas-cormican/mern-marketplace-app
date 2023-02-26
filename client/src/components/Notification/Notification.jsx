import React, { useContext } from "react";
import Styles from "./notification.module.css";
import { AuthContext } from "../../context/AuthContext";

function Notification() {
  const { auth } = useContext(AuthContext);

  return <div className={Styles.notification}>{auth.notification}</div>;
}

export default Notification;
