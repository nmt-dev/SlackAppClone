import React, { useState } from "react";
import Input from "../General/Input";
import styles from "./Login.module.scss";
import Btn from "../General/Button";
import Success from "../Success";
import { useNavigate } from "react-router-dom";
import API from "../../Utils/API";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
//<i class="las la-eye"></i>
function UserLogin({ auth, setAuth }) {
  const { userHeaders, setUserHeaders } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const response = await API.post("/auth/sign_in", {
      email,
      password,
    }).catch((error) => {
      console.log(error.response.data.errors);
      setPasswordError(error.response.data.errors);
    });
    if (response.status === 200) {
      console.log(response.headers);
      setUserHeaders(response.headers);
      setIsLoading(true);
      setTimeout(() => {
        setAuth(!null);
      }, 5500);
    }
  };
  function Home() {
    navigate("/");
  }
  return (
    <>
      {isLoading && (
        <Success
          content={"LogIn Successful!"}
          success={"Opening MatSlack"}
          page={"SlackPage"}
        />
      )}
      <div className={styles.wrapper}>
        <div className={styles.logincontainer}>
          <h1>
            Log in to{" "}
            <span onClick={Home} className={styles.mat}>
              MatSlack
            </span>
          </h1>
          <form onSubmit={HandleSubmit}>
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
                error={passwordError}
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
    </>
  );
}

export default UserLogin;
