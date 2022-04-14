import React from "react";
import styles from "./Interlocutor.module.scss";
import Img from "../General/Img";
import profilepic from "../../Assets/Images/profilepic.png";
import { MessengerContext } from "../../Context/MessengerContext";
import { useContext } from "react";
import nameFormatter from "../../Utils/Nameformatter";
function Kausap() {
  const { messenger, setmessenger } = useContext(MessengerContext);
  return (
    <div className={styles.contain}>
      <div className={styles.imgname}>
        <Img link={profilepic} logocontainerclassname={styles.imgcontain} />
        {messenger && (
          <h1 className={styles.textkausap}>{nameFormatter(messenger)}</h1>
        )}
      </div>
      <i id={styles.call} class="las la-phone"></i>
    </div>
  );
}

export default Kausap;
