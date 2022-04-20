import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBarLanding from "../../Components/TopBar/Topbarlanding";
import Btn from "../../Components/General/Button";
import Img from "../../Components/General/Img";
import team from "../../Assets/Images/team.png";
import styles from "../LandingPage/LandingPage.module.scss";

function LandingPage() {
  const navigate = useNavigate();
  function logIn() {
    navigate("/LogIn");
  }
  function signUp() {
    navigate("/SignUp");
  }
  return (
    <div className={styles.main}>
      <TopBarLanding />
      <h1 className={styles.fh1}>MatSlack is your</h1>
      <h1 className={styles.fh2}>Digital HQ</h1>
      <p className={styles.text}>
        Transform the way you work with one place for everyone and everything
        you need to get stuff done.
      </p>
      <Btn
        onClick={signUp}
        className={styles.button1}
        content={"Get Started"}
      />
      <Btn onClick={logIn} className={styles.button} content={"SIGN IN"} />
      <Img logocontainerclassname={styles.imgcontainer} link={team} />
    </div>
  );
}

export default LandingPage;
