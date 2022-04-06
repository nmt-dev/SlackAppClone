import React, { useState } from "react";
import Input from "../General/Input";
import styles from "./Login.module.scss";
import Btn from "../General/Button";
import { useNavigate } from "react-router-dom";

//<i class="las la-eye"></i>
function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function HandleSubmit() {}
  function Home() {
    navigate("/");
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.logincontainer}>
        <h1>
          Log in to{" "}
          <span onClick={Home} className={styles.mat}>
            MatSlack
          </span>
        </h1>
        <form>
          <div className={styles.inputicon}>
            <i id={styles.icons} class="las la-envelope"></i>
            <Input
              className={styles.inputfield}
              type={"email"}
              placeholder={"Email"}
              error={""}
              errorclassname={styles.error}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <i id={styles.eye} class="las la-eye-slash"></i>
          </div>
          <h6>Forgot password?</h6>
          <Btn className={styles.button} content={"SIGN IN"} />
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
