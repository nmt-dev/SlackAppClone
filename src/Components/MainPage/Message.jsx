import React from "react";
import Img from "../General/Img";
import profilepic from "../../Assets/Images/profilepic.png";
import { Time, Today } from "../../Utils/Utils";
import styles from "./Message.module.scss";
import { useContext } from "react";
import { MessagesContext } from "../../Context/MessagesContext";

function Message() {
  const { userMessages, setUserMessages } = useContext(MessagesContext);

  return (
    <>
      <div className={styles.contain}>
        <Img link={profilepic} logocontainerclassname={styles.imgcontain} />
        <div className={styles.sendertime}>
          <p className={styles.sender}>SenderName</p>
          <Time ttime={styles.ttime} />
        </div>
        <div className={styles.textmessage}>
          <p>This is the message sent by member</p>
        </div>
        {/* <Today ddate={styles.ddate} /> */}
      </div>
    </>
  );
}

export default Message;
