import React, { useCallback, useEffect } from "react";
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
import { MessengerMessagesContext } from "../Context/MessagesContext copy";
import { UpdateContext } from "../Context/SendMessageContext";

function SlackPage({ auth, setAuth }) {
  const { userHeaders, setUserHeaders } = useContext(UserContext);
  const {
    isOpen,
    setIsOpen,
    isOpenChannel,
    setIsOpenChannel,
    isOpenChannelMembers,
  } = useContext(OpennerContext);
  const { usersList, setUsersList } = useContext(UsersContext);
  const { messenger, setMessenger } = useContext(MessengerContext);
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);
  const { userMessages, setUserMessages } = useContext(MessagesContext);
  const { messengerObject, setMessengerObject } = useContext(
    MessengerObjectContext
  );
  const { messengerMessages, setMessengerMessages } = useContext(
    MessengerMessagesContext
  );
  const { sendMessageUpdate, setSendMessageUpdate } = useContext(UpdateContext);
  const {
    userChannels,
    setUserChannels,
    chosenChannel,
    selectedChannel,
    channelMembers,
    setChannelMembers,
  } = useContext(ChannelsContext);

  const [update, setUpdate] = useState(null); //1
  const [directMessages, setDirectMessages] = useState([]); //2
  const [DMs, setDMs] = useState();

  let mesObj;
  const updateMeWhenMessageIsSent = () => {
    setUpdate(!update);
    console.log("messages updated");
  };

  // const updateMeWhenMessageIsSent = useCallback(() => {
  //   setUpdate("messages update");
  //   console.log("messages updated");
  // });

  const axiosGetUsers = async () => {
    const getUsers = await API.get("/users", {
      headers: userHeaders,
    }).catch((error) => {
      console.log(error);
    });
    if (getUsers.status === 200) {
      setUsersList(getUsers.data.data);
    }
  };

  const axiosGetUserChannels = async () => {
    const getChannels = await API.get("/channels", {
      headers: userHeaders,
    }).catch((error) => {
      console.log(error);
    });
    if (getChannels.status === 200) {
      setUserChannels(getChannels.data);

      console.log(getChannels.data);
    }
  };
  //get userchannels
  useEffect(() => {
    if (loggedInUser) {
      axiosGetUserChannels();
      console.log("updated user channels");
    }
  }, [loggedInUser, update, messenger]);

  const axiosGetChannelDetails = async () => {
    const getChannelDetails = await API.get(`/channels/${messengerObject.id}`, {
      headers: userHeaders,
    }).catch((err) => {
      console.log(`getchanneldetails ${err}`);
    });
    if (getChannelDetails.status === 200) {
      console.log(getChannelDetails.data.data.channel_members);
      setChannelMembers(getChannelDetails.data.data.channel_members);
    }
  };

  useEffect(() => {
    if (messengerObject) axiosGetChannelDetails();
  }, [messengerObject]);
  //get users
  useEffect(() => {
    axiosGetUsers();
    console.log("updated user list");
  }, [userHeaders, update]);

  //get selected DMed
  useEffect(() => {
    if (messenger) {
      if (JSON.stringify(messenger).includes("@")) {
        mesObj = usersList.find((obj) => obj.uid === messenger);
        setMessengerObject(mesObj);
      } else {
        mesObj = userChannels.data.find((obj) => obj.name === messenger);
        setMessengerObject(mesObj);
        console.log(userChannels.data.length);
      }
    }
  }, [messenger]);

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
