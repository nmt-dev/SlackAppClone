import React from "react";
import Input from "../General/Input";
import Logo from "../General/Logo";
import logo from "../../Assets/Images/SlackLogo.png";
import styles from "./Login.module.scss";
import Btn from "../General/Button";

//<i class="las la-eye"></i>
function UserLogin() {
  return (
    <div className={styles.logincontainer}>
      <Logo
        logocontainerclassname={styles.logo}
        link={logo}
        pcontent={"MATSLACK"}
      />
      <h3>We suggest using the email address you use at work.</h3> <br></br>
      <form>
        <i id={styles.icons} class="las la-envelope"></i>
        <Input
          className={styles.inputfield}
          type={"email"}
          placeholder={"Email"}
          error={""}
          errorclassname={styles.error}
        />
        <br></br>
        <i id={styles.icons} class="las la-lock"></i>
        <>
          <Input
            className={styles.inputfield}
            type={"password"}
            placeholder={"Password"}
            error={""}
            errorclassname={styles.error}
          />
          <i id={styles.eye} class="las la-eye-slash"></i>
          <h6>Forgot password?</h6>
        </>
        <Btn className={styles.button} content={"SIGN IN"} />
      </form>
    </div>
  );
}

export default UserLogin;
