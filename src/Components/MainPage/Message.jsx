import React from "react";
import Img from "../General/Img";
import profilepic from "../../Assets/Images/profilepic.png";
import styles from "./Message.module.scss";
import { getDate, getTime } from "../../Utils/DateTimeFormatter";

function Message({ message, sender, time }) {
  return (
    <>
      <div className={styles.contain}>
        <Img link={profilepic} logocontainerclassname={styles.imgcontain} />
        <div className={styles.sendertime}>
          <div className={styles.sender}>{sender}</div>
          <div className={styles.ttime}>{`${getDate(time)} ${getTime(
            time
          )} GMT+8`}</div>
        </div>
        <div className={styles.textmessage}>
          <div>{message}</div>
        </div>
      </div>
    </>
  );
}

export default Message;
