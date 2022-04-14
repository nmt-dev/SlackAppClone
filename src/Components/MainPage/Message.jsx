import React, { useState } from "react";
import Img from "../General/Img";
import profilepic from "../../Assets/Images/profilepic.png";
import { Time, Today } from "../../Utils/Utils";
import styles from "./Message.module.scss";
import { useContext } from "react";
import { MessagesContext } from "../../Context/MessagesContext";

function Message({ message, sender, time }) {
  // 2022-04-12T10:36:30.854Z
  const [converter, setConverter] = useState(JSON.stringify(time));

  function getDate() {
    const monthSent = converter.slice(
      converter.indexOf("-") + 1,
      converter.lastIndexOf("-")
    );

    const daySent = converter.slice(
      converter.lastIndexOf("-") + 1,
      converter.indexOf("T")
    );

    const yearSent = converter.slice(1, 3);

    let dateSent = monthSent + "-" + daySent + "-" + yearSent;

    return dateSent;
  }
  function getTime() {
    const hours = parseInt(
      converter.slice(converter.indexOf("T") + 1, converter.indexOf(":"))
    );
    const minutes = converter.slice(
      converter.indexOf(":") + 1,
      converter.lastIndexOf(":")
    );
    let timeSent;
    let phHours = hours + 8;

    if (phHours + 8 === 24) {
      timeSent = `0:${minutes} AM`;
    }
    if (phHours + 8 < 12) {
      timeSent = `${phHours}:${minutes} AM`;
    }
    if (phHours + 8 === 12) {
      timeSent = `${phHours}:${minutes} NN`;
    }
    if (phHours + 8 > 12) {
      timeSent = `${phHours - 12}:${minutes} PM`;
    }

    return timeSent;
  }

  return (
    <>
      <div className={styles.contain}>
        <Img link={profilepic} logocontainerclassname={styles.imgcontain} />
        <div className={styles.sendertime}>
          <div className={styles.sender}>{sender}</div>
          <div
            className={styles.ttime}
          >{`${getDate()} ${getTime()} GMT+8`}</div>
          {/* <Time ttime={styles.ttime} /> */}
        </div>
        <div className={styles.textmessage}>
          <div>{message}</div>
        </div>
        {/* <Today ddate={styles.ddate} /> */}
      </div>
    </>
  );
}

export default Message;
