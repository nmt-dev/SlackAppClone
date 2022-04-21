import React, { useEffect } from "react";
import MessageHistory from "../../Parts/MessageHistory/MessageHistory";
import Textarea from "../../Parts/TextArea/TextArea";
import SideBar from "../../Parts/SideBar/Sidebar";
import TopBar from "../../Parts/TopBar/Topbar";
import styles from "./SlackPage.module.scss";
import { useContext, useState } from "react";
import { OpennerContext } from "../../Context/OpennerContext";
import PopUp from "../../Components/PopUp/PopUp";
import API from "../../Utils/API";

import { LoggedInUserContext } from "../../Context/LoggedInUserContext";

function SlackPage({ setAuth }) {
  const { userHeaders, setUsersList } = useContext(LoggedInUserContext);

  const { isOpen, isOpenChannel, isOpenChannelMembers } =
    useContext(OpennerContext);

  const [update, setUpdate] = useState(null); //1

  function updateMeWhenMessageIsSent() {
    setUpdate(!update);
    console.log("messages updated");
  }

  //get users
  useEffect(() => {
    API.get("/users", {
      headers: userHeaders,
    })
      .then((response) => {
        setUsersList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userHeaders, update]);

  return (
    <>
      {(isOpen || isOpenChannel || isOpenChannelMembers) && (
        <PopUp updateMe={updateMeWhenMessageIsSent} />
      )}
      <div className={styles.contain}>
        <div className={styles.topbar}>
          <TopBar setAuth={setAuth} />
        </div>
        <div className={styles.sidebar}>
          <SideBar update={update} />
        </div>
        <div className={styles.messagehistory}>
          {}
          <MessageHistory
            updateMe={updateMeWhenMessageIsSent}
            update={update}
          />
        </div>
        <div className={styles.textarea}>
          <Textarea updateMe={updateMeWhenMessageIsSent} />
        </div>
      </div>
    </>
  );
}

export default SlackPage;
