import React from "react";
import Logo from "../../Components/General/Logo";
import profilepic from "../../Assets/Images/profilepic.png";
import SearchBar from "../../Components/TopBar/SearchBar";
import styles from "../TopBar/TopBar.module.scss";

import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import nameFormatter from "../../Utils/Nameformatter";
import { MessengerContext } from "../../Context/MessengerContext";
function TopBar({ setAuth }) {
  const { messenger, setMessenger } = useContext(MessengerContext);
  function logOutUser() {
    setAuth(null);
    setMessenger("");
  }
  const { userHeaders, setUserHeaders } = useContext(UserContext);
  return (
    <>
      <div className={styles.contain}>
        <i id={styles.history} class="las la-history"></i>
        <SearchBar />
        <i id={styles.question} class="lar la-question-circle"></i>
        <Logo link={profilepic} logocontainerclassname={styles.logocontain} />
        <p onClick={logOutUser} className={styles.username}>
          Hello {nameFormatter(userHeaders.uid)}!
        </p>
      </div>
    </>
  );
}

export default TopBar;
