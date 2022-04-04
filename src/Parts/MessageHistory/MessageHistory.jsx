import React from "react";
import styles from "../MessageHistory/MessageHistory.module.scss";
import Message from "../../Components/MainPage/Message";
import Kausap from "../../Components/MainPage/Interlocutor";
function MessageHistory() {
  return (
    <>
      <Kausap />
      <Message />
    </>
  );
}

export default MessageHistory;
