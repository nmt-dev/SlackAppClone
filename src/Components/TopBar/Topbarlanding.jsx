import React from "react";
import Btn from "../General/Button";
import Logo from "../General/Logo";
import logo from "../../Assets/Images/SlackLogo.png";
import styles from "./Topbarlanding.module.scss";

function TopBarLanding() {
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
            <li>
              <i className="las la-home"></i>HOME
            </li>
            <li>
              <i className="las la-tools"></i>SERVICES
            </li>
            <li>
              <i className="las la-dollar-sign"></i>PRICING
            </li>
            <li>
              <i className="las la-phone"></i>CONTACT
            </li>
            <li>
              <Btn className={styles.button} content={"Get Started"} />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default TopBarLanding;
