import React, { useEffect } from "react";
import MessageHistory from "../Parts/MessageHistory/MessageHistory";
import Textarea from "../Parts/TextArea/TextArea";
import SideBar from "../Parts/SideBar/Sidebar";
import TopBar from "../Parts/TopBar/Topbar";
import styles from "./SlackPage.module.scss";
import { UserContext } from "../Context/UserContext";
import { useContext, useState } from "react";
import { ChannelsContext } from "../Context/ChannelsContext";

function SlackPage() {
  const { userHeaders, setUserHeaders } = useContext(UserContext);

  const [userChannels, setUserChannels] = useState();
  const myChannels = { userChannels, setUserChannels };

  useEffect(() => {}, []);

  return (
    <>
      <ChannelsContext.Provider myChannels={myChannels}>
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
      </ChannelsContext.Provider>
    </>
  );
}

export default SlackPage;
