import React from "react";
import styles from "../TopBar/TopBar.module.scss";
import { useContext } from "react";
import nameFormatter from "../../Utils/Nameformatter";
import { LoggedInUserContext } from "../../Context/LoggedInUserContext";
import { MessengerMessagesContext } from "../../Context/MessagesContext";
import { AvatarGenerator } from "random-avatar-generator";
function TopBar({ setAuth }) {
  const { userHeaders } = useContext(LoggedInUserContext);
  const { setMessenger, setMessengerMessages, setMessengerObject } = useContext(
    MessengerMessagesContext
  );

  function logOutUser() {
    setAuth(null);
    setMessenger("");
    setMessengerMessages("");
    setMessengerObject("");
  }
  const generator = new AvatarGenerator();
  return (
    <>
      <div className={styles.contain}>
        <i id={styles.question} class="lar la-question-circle"></i>
        <img
          className={styles.logocontain}
          src={generator.generateRandomAvatar(nameFormatter(userHeaders.uid))}
        />
        <p onClick={logOutUser} className={styles.username}>
          Hello {nameFormatter(userHeaders.uid)}!
        </p>
      </div>
    </>
  );
}

export default TopBar;
