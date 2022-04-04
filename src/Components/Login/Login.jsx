import React from "react";
import Input from "../General/Input";
import styles from "./Login.module.scss";
import Btn from "../General/Button";

//<i class="las la-eye"></i>
function UserLogin() {
  return (
    <div className={styles.logincontainer}>
      <h3>
        Log in to <span className={styles.mat}>MatSlack</span>
      </h3>
      <form>
        <div className={styles.inputicon}>
          <i id={styles.icons} class="las la-envelope"></i>
          <Input
            className={styles.inputfield}
            type={"email"}
            placeholder={"Email"}
            error={""}
            errorclassname={styles.error}
          />
        </div>
        <div className={styles.inputicon}>
          <i id={styles.icons} class="las la-lock"></i>
          <Input
            className={styles.inputfield}
            type={"password"}
            placeholder={"Password"}
            error={""}
            errorclassname={styles.error}
          />
          <i id={styles.eye} class="las la-eye-slash"></i>
        </div>
        <h6>Forgot password?</h6>
        <Btn className={styles.button} content={"SIGN IN"} />
      </form>
    </div>
  );
}

export default UserLogin;
