import React, { useEffect } from "react";
import MessageHistory from "../Parts/MessageHistory/MessageHistory";
import Textarea from "../Parts/TextArea/TextArea";
import SideBar from "../Parts/SideBar/Sidebar";
import TopBar from "../Parts/TopBar/Topbar";
import styles from "./SlackPage.module.scss";
import { UserContext } from "../Context/UserContext";
import { useContext, useState } from "react";
import { ChannelsContext } from "../Context/ChannelsContext";
import { OpennerContext } from "../Context/OpennerContext";
import PopUp from "../Components/PopUp/PopUp";
import API from "../Utils/API";
import { UsersContext } from "../Context/UsersContext";
import nameFormatter from "../Utils/Nameformatter";

function SlackPage() {
  const { userHeaders, setUserHeaders } = useContext(UserContext);
  const { isOpen, setIsOpen } = useContext(OpennerContext);
  const { usersList, setUsersList } = useContext(UsersContext);
  let arrayofObjects;
  let useremails;
  let formattedemails;

  const axiosGet = async () => {
    const getUsers = await API.get("/users", {
      headers: userHeaders,
    }).catch((error) => {
      console.log(error);
    });
    if (getUsers.status === 200) {
      arrayofObjects = getUsers.data.data;
      useremails = arrayofObjects.map((a) => a.uid);
      formattedemails = useremails.map((a) => nameFormatter(a));
      setUsersList(formattedemails);
    }
    console.log(getUsers.data.data);
    console.log(`userslist ${usersList}`);
  };
  useEffect(() => {
    axiosGet();
  }, []);

  return (
    <>
      {isOpen && <PopUp />}
      <div className={styles.contain}>
        <div className={styles.topbar}>
          <TopBar />
        </div>
        <div className={styles.sidebar}>
          <SideBar />
        </div>
        <div className={styles.messagehistory}>
          {}
          <MessageHistory />
        </div>
        <div className={styles.textarea}>
          <Textarea />
        </div>
        {/* <Btn onClick={togglePop()} content={"toggle"} /> */}
      </div>
    </>
  );
}

export default SlackPage;
