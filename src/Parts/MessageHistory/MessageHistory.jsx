import React, { useEffect } from "react";
import Message from "../../Components/MainPage/Message";
import Kausap from "../../Components/MainPage/Interlocutor";
import styles from "./MessageHistory.module.scss";
import { useContext } from "react";
import { MessengerMessagesContext } from "../../Context/MessagesContext";
import { LoggedInUserContext } from "../../Context/LoggedInUserContext";
import nameFormatter from "../../Utils/Nameformatter";
import API from "../../Utils/API";
import { ChannelsContext } from "../../Context/ChannelsContext";
import AutoScrollDown from "../../Utils/AutoScrollDown";

function MessageHistory({ update }) {
  const { userHeaders } = useContext(LoggedInUserContext);
  const { chosenChannel } = useContext(ChannelsContext);

  const {
    messenger,
    messengerMessages,
    setMessengerMessages,
    messengerObject,
  } = useContext(MessengerMessagesContext);

  const axiosGetMessengerMessages = async (chosen) => {
    switch (JSON.stringify(messenger).includes("@")) {
      case true:
        const getMessengerMessages = await API.get(
          `/messages?receiver_id=${messengerObject.id}&receiver_class=User`,
          { headers: userHeaders }
        ).catch((err) => {
          console.log(err);
        });
        if (getMessengerMessages.status === 200) {
          setMessengerMessages(getMessengerMessages.data.data);
        }
        break;

      case false:
        const channelMessages = await API.get(
          `messages?receiver_id=${chosen}&receiver_class=Channel`,
          { headers: userHeaders }
        ).catch((err) => {
          console.log(err);
        });
        if (channelMessages.status === 200) {
          setMessengerMessages(channelMessages.data.data);
        }
        break;
    }
  };

  //get messsages
  useEffect(() => {
    if (messengerObject) {
      axiosGetMessengerMessages(chosenChannel);
    }
  }, [messengerObject, update]);

  //autoscrolldown
  useEffect(() => {
    AutoScrollDown();
  }, [messengerMessages]);

  return (
    <>
      <Kausap />
      <div id="data" className={styles.messagesContainer}>
        {messengerMessages &&
          messengerMessages.map((messages, i) => {
            return (
              <Message
                key={i}
                message={messages.body}
                sender={nameFormatter(messages.sender.uid)}
                time={messages.created_at}
              />
            );
          })}
      </div>
    </>
  );
}

export default MessageHistory;
