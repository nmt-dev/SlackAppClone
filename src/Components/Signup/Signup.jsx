import React from "react";
import styles from "../Signup/Signup.module.scss";
import Input from "../General/Input";
import Btn from "../General/Button";
import Img from "../General/Img";
import team1 from "../../Assets/Images/team1.png";
import TopBarLanding from "../TopBar/Topbarlanding";

function SignUp() {
  return (
    <>
      <TopBarLanding />
      <div className={styles.container}>
        <div className={styles.signupcontainer}>
          <h1>
            Sign Up to <span className={styles.mat}>MatSlack</span>
          </h1>
          <h6>Already a member? Log In</h6>
          <form>
            <div className={styles.inputicon}>
              <Input
                className={styles.inputfield}
                type={"email"}
                placeholder={"Email"}
                error={""}
                errorclassname={styles.error}
              />{" "}
              <i id={styles.icons} class="las la-envelope"></i>
            </div>
            <div className={styles.inputicon}>
              <Input
                className={styles.inputfield}
                type={"password"}
                placeholder={"Password"}
              />
              <i id={styles.icons} class="las la-lock"></i>
            </div>
            <div className={styles.inputicon}>
              <Input
                className={styles.inputfield}
                type={"password"}
                placeholder={"Confirm Password"}
                error={""}
                errorclassname={styles.error}
              />
              <i id={styles.icons} class="las la-lock"></i>
            </div>
            <Btn className={styles.button} content={"Create an account"} />
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
