import React from "react";
import styles from "./Interlocutor.module.scss";
import Img from "../General/Img";
import profilepic from "../../Assets/Images/profilepic.png";

function Kausap() {
  return (
    <div className={styles.contain}>
      <div className={styles.imgname}>
        <Img link={profilepic} logocontainerclassname={styles.imgcontain} />
        <h1 className={styles.textkausap}>SenderName</h1>
      </div>
      <i id={styles.call} class="las la-phone"></i>
    </div>
  );
}

export default Kausap;
