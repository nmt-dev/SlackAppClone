import React, { useEffect } from "react";
import MessageHistory from "../Parts/MessageHistory/MessageHistory";
import Textarea from "../Parts/TextArea/TextArea";
import SideBar from "../Parts/SideBar/Sidebar";
import TopBar from "../Parts/TopBar/Topbar";
import styles from "./SlackPage.module.scss";
import { useNavigate } from "react-router-dom";

function SlackPage() {
  return (
    <>
      <div className={styles.contain}>
        <div className={styles.topbar}>
          <TopBar />
        </div>
        <div className={styles.sidebar}>
          <SideBar />
        </div>
        <div className={styles.messagehistory}>
          <MessageHistory />
        </div>
        <div className={styles.textarea}>
          <Textarea />
        </div>
      </div>
    </>
  );
}

export default SlackPage;
