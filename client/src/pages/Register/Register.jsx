import React from "react";
import Styles from "./register.module.css";
import AuthForm from "../../components/AuthForm/AuthForm";

function Register() {
  return (
    <div className={Styles.register}>
      <section className={Styles.registerSection}>
        <h2>Registration</h2>
        <div className={Styles.formWrapper}>
          <AuthForm signup />
        </div>
      </section>
    </div>
  );
}

export default Register;
