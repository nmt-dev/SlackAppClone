import React from "react";
import Logo from "../../Components/General/Logo";
import profilepic from "../../Assets/Images/profilepic.png";
import SearchBar from "../../Components/TopBar/SearchBar";
import styles from "../TopBar/TopBar.module.scss";

function TopBar() {
  return (
    <>
      <div className={styles.contain}>
        <i id={styles.history} class="las la-history"></i>
        <SearchBar />
        <i id={styles.question} class="lar la-question-circle"></i>
        <Logo link={profilepic} logocontainerclassname={styles.logocontain} />
      </div>
    </>
  );
}

export default TopBar;
