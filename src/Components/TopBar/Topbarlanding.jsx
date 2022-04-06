import React from "react";
import { useNavigate } from "react-router-dom";
import Btn from "../General/Button";
import Logo from "../General/Logo";
import logo from "../../Assets/Images/SlackLogo.png";
import styles from "./Topbarlanding.module.scss";

function TopBarLanding() {
  const navigate = useNavigate();
  function signUp() {
    navigate("/SignUp");
  }

  return (
    <>
      <div className={styles.topbarcontainer}>
        <Logo
          logocontainerclassname={styles.logo}
          link={logo}
          pcontent={"MATSLACK"}
        />
        <div className={styles.navbar}>
          <ul>
            <li className={styles.li}>
              <i className="las la-home"></i>HOME
            </li>
            <li className={styles.li}>
              <i className="las la-tools"></i>SERVICES
            </li>
            <li className={styles.li}>
              <i className="las la-dollar-sign"></i>PRICING
            </li>
            <li className={styles.li}>
              <i className="las la-phone"></i>CONTACT
            </li>
            <li className={styles.li}>
              <Btn
                onClick={signUp}
                className={styles.button}
                content={"Get Started"}
              />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default TopBarLanding;
