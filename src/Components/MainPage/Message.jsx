import React from "react";
import Img from "../General/Img";
import profilepic from "../../Assets/Images/profilepic.png";
import styles from "./Message.module.scss";
import { getDate, getTime } from "../../Utils/DateTimeFormatter";
import { AvatarGenerator } from "random-avatar-generator";

function Message({ message, sender, time }) {
  const generator = new AvatarGenerator();
  return (
    <>
      <div className={styles.contain}>
        <img
          className={styles.imgcontain}
          src={generator.generateRandomAvatar(`${sender}`)}
        />
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
