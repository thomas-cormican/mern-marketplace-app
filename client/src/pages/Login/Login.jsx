import React, { useContext } from "react";
import Styles from "./login.module.css";
import AuthForm from "../../components/AuthForm/AuthForm";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

function Login() {
  const { auth } = useContext(AuthContext);

  if (auth.user) {
    return <Navigate replace to="/" />;
  }

  if (auth.fetching) {
    return <LoadingSpinner />;
  }

  return (
    <div className={Styles.login}>
      <section className={Styles.loginSection}>
        <h2>Login</h2>
        <div className={Styles.formWrapper}>
          <AuthForm />
        </div>
      </section>
    </div>
  );
}

export default Login;
