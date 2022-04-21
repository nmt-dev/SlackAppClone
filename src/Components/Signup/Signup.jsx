import React, { useState } from "react";
import styles from "../Signup/Signup.module.scss";
import Input from "../General/Input";
import Btn from "../General/Button";
import Img from "../General/Img";
import team1 from "../../Assets/Images/team1.png";
import TopBarLanding from "../TopBar/Topbarlanding";
import { useNavigate } from "react-router-dom";
import API from "../../Utils/API";
import Success from "../Success/Success";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPassword_Confirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorStyle, setErrorStyle] = useState(styles.inputfield);
  const [errorStyleIcon, setErrorStyleIcon] = useState(styles.icons);
  const [showPassword, setShowPassword] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (password === password_confirm) {
      const response = await API.post("/auth", {
        email,
        password,
        password_confirm,
      }).catch((error) => {
        console.log(error.response.data.errors.full_messages);
        setPasswordError(error.response.data.errors.full_messages);
      });
      console.log(response);
      if (response !== undefined) {
        setIsLoading(true);
      }
    } else {
      setPasswordError("Password does not match");
      setErrorStyle(styles.inputfielderror);
      setErrorStyleIcon(styles.iconserror);
    }
  };
  function Home() {
    navigate("/");
  }
  function logIn() {
    navigate("/LogIn");
  }
  function showMyPassword() {
    setShowPassword("text");
  }
  function hideMyPassword() {
    setShowPassword("password");
  }
  function resetInputStyle() {
    setErrorStyle(styles.inputfield);
    setErrorStyleIcon(styles.icons);
    setPasswordError("");
  }

  return (
    <>
      {isLoading && (
        <Success
          content={"Congratulations!"}
          success={"Create user account successfull"}
          redirect={"Redirecting to Log In Page"}
          page={"LogIn"}
        />
      )}
      <TopBarLanding />
      <div className={styles.container}>
        <div className={styles.signupcontainer}>
          <h1>
            Sign Up to{" "}
            <span onClick={Home} className={styles.mat}>
              MatSlack
            </span>
          </h1>
          <form onSubmit={HandleSubmit}>
            <div className={styles.inputicon}>
              <Input
                className={styles.inputfield}
                type={"email"}
                placeholder={"Email"}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                autoComplete="off"
              />{" "}
              <i id={styles.icons} class="las la-envelope"></i>
            </div>
            <div className={styles.inputicon}>
              <Input
                className={errorStyle}
                type={showPassword}
                placeholder={"Password"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                onClick={resetInputStyle}
              />
              <i
                onMouseOver={showMyPassword}
                onMouseLeave={hideMyPassword}
                id={errorStyleIcon}
                class="las la-lock"
              ></i>
            </div>
            <div className={styles.inputicon}>
              <Input
                className={errorStyle}
                type={showPassword}
                placeholder={"Confirm Password"}
                onChange={(e) => setPassword_Confirm(e.target.value)}
                value={password_confirm}
                onClick={resetInputStyle}
              />
              <i
                onMouseOver={showMyPassword}
                onMouseLeave={hideMyPassword}
                id={errorStyleIcon}
                class="las la-lock"
              ></i>
            </div>
            <p className={styles.error}>{passwordError}</p>
            <Btn
              type={"submit"}
              className={styles.button}
              content={"Create an account"}
            />
            <h6 id={styles.h6}>
              Already a member?{" "}
              <span onClick={logIn} className={styles.login}>
                Log In
              </span>
            </h6>
          </form>
        </div>
        <div className={styles.designcontainer}>
          <Img logocontainerclassname={styles.imgcontainer} link={team1} />
          <a
            className={styles.source}
            href="https://www.freepik.com/vectors/online-discussion"
          >
            Img source - www.freepik.com
          </a>
        </div>
      </div>
    </>
  );
}

export default SignUp;
