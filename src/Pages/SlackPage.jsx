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
import { FilteredMessagesContext } from "../Context/FilteredMessagesContext";

function SlackPage() {
  const { userHeaders, setUserHeaders } = useContext(UserContext);
  const { isOpen, setIsOpen, isOpenChannel, setIsOpenChannel } =
    useContext(OpennerContext);
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
  const { userChannels, setUserChannels } = useContext(ChannelsContext);

  const [update, setUpdate] = useState(null); //1
  const [directMessages, setDirectMessages] = useState([]); //2
  const [DMs, setDMs] = useState();

  // const sortMessages = () => {
  //   setDirectMessages(
  //     filteredMessages.sort(function (a, b) {
  //       return a.id - b.id;
  //     })
  //   );
  // };

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
      setUserChannels(getChannels.data.data);
      console.log(getChannels.data.data);
    }
  };

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
    const getMessengerMessages = await API.get(
      `/messages?receiver_id=${messengerObject.id}&receiver_class=User`,
      { headers: userHeaders }
    ).catch((err) => {
      console.log(`retrieve message error ${err}`);
    });
    if (getMessengerMessages.status === 200) {
      setmessengerMessages(getMessengerMessages.data.data);
    }
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
      setTimeout(() => {
        axiosGetUserChannels();
        console.log("updated user channels");
      }, 500);
    }
  }, [loggedInUser, update]);

  //get selected DMed
  useEffect(() => {
    if (messenger) {
      mesObj = usersList.find((obj) => obj.uid === messenger);
      setMessengerObject(mesObj);
    }
  }, [messenger]);

  //get messages of DMed
  useEffect(() => {
    if (messengerObject) {
      axiosGetMessengerMessages();
      console.log("updated messenger messages");
    }
  }, [messengerObject, update]);

  return (
    <>
      {(isOpen || isOpenChannel) && (
        <PopUp updateMe={updateMeWhenMessageIsSent} />
      )}
      <div className={styles.contain}>
        <div className={styles.topbar}>
          <TopBar />
        </div>
        <div className={styles.sidebar}>
          <SideBar />
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
