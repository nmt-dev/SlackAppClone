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
import { MessengerContext } from "../Context/MessengerContext";
import { LoggedInUserContext } from "../Context/LoggedInUserContext";
import { MessagesContext } from "../Context/MessagesContext";
import { MessengerObjectContext } from "../Context/MessengerObjectContext";

function SlackPage() {
  const { userHeaders, setUserHeaders } = useContext(UserContext);
  const { isOpen, setIsOpen } = useContext(OpennerContext);
  const { usersList, setUsersList } = useContext(UsersContext);
  const { messenger, setMessenger } = useContext(MessengerContext);
  const { loggedIn, setLoggedIn } = useContext(LoggedInUserContext);
  const { userMessages, setUserMessages } = useContext(MessagesContext);
  const { messengerObject, setMessengerObject } = useContext(
    MessengerObjectContext
  );
  let arrayofObjects;
  let useremails;
  let mesObj;

  const axiosGetUsers = async () => {
    const getUsers = await API.get("/users", {
      headers: userHeaders,
    }).catch((error) => {
      console.log(error);
    });
    if (getUsers.status === 200) {
      arrayofObjects = getUsers.data.data;
      mesObj = arrayofObjects.find((obj) => obj.uid === messenger);
      useremails = arrayofObjects.map((a) => a.uid);
      setUsersList(useremails);
      // setMessengerObject(arrayofObjects.find((obj) => (obj.uid = messenger)));
      setMessengerObject(mesObj);
    }
  };
  const axiosGetMessages = async () => {
    const getMessages = await API.get(
      `/messages?receiver_id=${loggedIn}&receiver_class=User`,
      { headers: userHeaders }
    ).catch((err) => {
      console.log(`retrieve message error ${err}`);
    });
    if (getMessages.status === 200) {
      setUserMessages(getMessages.data);
    }
  };

  useEffect(() => {
    axiosGetUsers();
    axiosGetMessages();
  }, [isOpen]);

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
      </div>
    </>
  );
}

export default SlackPage;
