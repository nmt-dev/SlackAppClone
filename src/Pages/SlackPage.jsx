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
import { MessengerMessagesContext } from "../Context/MessagesContext copy";

function SlackPage() {
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
  const { messengerMessages, setmessengerMessages } = useContext(
    MessengerMessagesContext
  );
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
  };

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
    axiosGetChannelDetails();
  }, [messengerObject]);

  const axiosGetChannelMessages = async (chosen) => {
    const channelMessages = await API.get(
      `messages?receiver_id=${chosen}&receiver_class=Channel`,
      { headers: userHeaders }
    ).catch((err) => {
      console.log(`retrieve message error ${err}`);
    });
    if (channelMessages.status === 200) {
      setmessengerMessages(channelMessages.data.data);
    }
  };
  //get channel messages
  useEffect(() => {
    axiosGetChannelMessages(chosenChannel);
  }, [chosenChannel, update]);

  const axiosGetMessages = async () => {
    const getMessages = await API.get(
      `/messages?receiver_id=${loggedInUser.id}&receiver_class=User`,
      { headers: userHeaders }
    ).catch((err) => {
      console.log(`retrieve message error ${err}`);
    });
    if (getMessages.status === 200) {
      setUserMessages(getMessages.data.data);
      console.log(getMessages.data.data);
      // setDMs(getMessages.data.data.map((messages) => messages.receiver.uid));
    }
  };

  const axiosGetMessengerMessages = async () => {
    if (JSON.stringify(messenger).includes("@")) {
      const getMessengerMessages = await API.get(
        `/messages?receiver_id=${messengerObject.id}&receiver_class=User`,
        { headers: userHeaders }
      ).catch((err) => {
        console.log(`retrieve message error ${err}`);
      });
      if (getMessengerMessages.status === 200) {
        setmessengerMessages(getMessengerMessages.data.data);
      }
    }
    console.log("messenger is channel");
  };

  //get users
  useEffect(() => {
    axiosGetUsers();
    console.log("updated user list");
  }, [userHeaders, update]);

  //get messages of user
  useEffect(() => {
    if (loggedInUser) {
      axiosGetMessages();
      console.log("updated user messages");
    }
  }, [loggedInUser, update]);

  //get userchannels
  useEffect(() => {
    if (loggedInUser) {
      axiosGetUserChannels();
      console.log("updated user channels");
    }
  }, [loggedInUser, update]);

  //get selected DMed
  useEffect(() => {
    if (messenger) {
      if (JSON.stringify(messenger).includes("@")) {
        mesObj = usersList.find((obj) => obj.uid === messenger);
        setMessengerObject(mesObj);
      } else {
        mesObj = userChannels.data.find((obj) => obj.name === messenger);
        setMessengerObject(mesObj);
      }
    }
  }, [messenger, update]);

  //get messages of DMed
  useEffect(() => {
    if (messengerObject) {
      axiosGetMessengerMessages();
      console.log("updated messenger messages");
    }
  }, [messengerObject, update]);

  return (
    <>
      {(isOpen || isOpenChannel || isOpenChannelMembers) && (
        <PopUp updateMe={updateMeWhenMessageIsSent} />
      )}
      <div className={styles.contain}>
        <div className={styles.topbar}>
          <TopBar />
        </div>
        <div className={styles.sidebar}>
          <SideBar update={update} />
        </div>
        <div className={styles.messagehistory}>
          {}
          <MessageHistory update={update} />
        </div>
        <div className={styles.textarea}>
          <Textarea updateMe={updateMeWhenMessageIsSent} />
        </div>
      </div>
    </>
  );
}

export default SlackPage;
