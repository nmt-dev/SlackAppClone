import React, { useEffect, useContext } from "react";
import Message from "../../Components/MainPage/Message";
import Kausap from "../../Components/MainPage/Interlocutor";
import styles from "./MessageHistory.module.scss";
import { MessengerMessagesContext } from "../../Context/MessagesContext";
import { LoggedInUserContext } from "../../Context/LoggedInUserContext";

import { ChannelsContext } from "../../Context/ChannelsContext";
import AutoScrollDown from "../../Utils/AutoScrollDown";
import nameFormatter from "../../Utils/Nameformatter";
import API from "../../Utils/API";
function MessageHistory({ update }) {
  const { userHeaders } = useContext(LoggedInUserContext);
  const { chosenChannel } = useContext(ChannelsContext);
  const {
    messenger,
    messengerMessages,
    messengerObject,
    setMessengerMessages,
  } = useContext(MessengerMessagesContext);

  //get messsages
  useEffect(() => {
    setTimeout(() => {
      if (messengerObject) {
        switch (JSON.stringify(messenger).includes("@")) {
          case true:
            API.get(
              `/messages?receiver_id=${messengerObject.id}&receiver_class=User`,
              { headers: userHeaders }
            )
              .then((response) => {
                setMessengerMessages(response.data.data);
              })
              .catch((err) => {
                console.log(err);
              });
            break;
          case false:
            API.get(
              `messages?receiver_id=${chosenChannel}&receiver_class=Channel`,
              {
                headers: userHeaders,
              }
            )
              .then((response) => {
                setMessengerMessages(response.data.data);
              })
              .catch((err) => {
                console.log(err);
              });
            break;
        }
      }
    }, 500);
  }, [messengerObject, update]);

  //autoscrolldown
  useEffect(() => {
    AutoScrollDown();
  }, [messengerMessages]);

  return (
    <>
      <Kausap update={update} />
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
