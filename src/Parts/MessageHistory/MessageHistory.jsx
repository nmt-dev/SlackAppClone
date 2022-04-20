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
import { UpdateContext } from "../../Context/SendMessageContext";

function MessageHistory({ update }) {
  const { userHeaders } = useContext(LoggedInUserContext);
  const {
    userChannels,
    setUserChannels,
    chosenChannel,
    selectedChannel,
    channelMembers,
    setChannelMembers,
  } = useContext(ChannelsContext);
  const { sendMessageUpdate, setSendMessageUpdate } = useContext(UpdateContext);

  const {
    messenger,
    messengerMessages,
    setMessengerMessages,
    messengerObject,
  } = useContext(MessengerMessagesContext);

  const axiosGetChannelMessages = async (chosen) => {
    if (!JSON.stringify(messenger).includes("@")) {
      const channelMessages = await API.get(
        `messages?receiver_id=${chosen}&receiver_class=Channel`,
        { headers: userHeaders }
      ).catch((err) => {
        console.log(`retrieve message error ${err}`);
      });
      if (channelMessages.status === 200) {
        setMessengerMessages(channelMessages.data.data);
        console.log(channelMessages.data.data);
      }
    }
  };
  //get channel messages
  useEffect(() => {
    if (messengerObject) {
      axiosGetChannelMessages(chosenChannel);
    }
  }, [chosenChannel, sendMessageUpdate, update]);

  const axiosGetMessengerMessages = async () => {
    if (JSON.stringify(messenger).includes("@")) {
      const getMessengerMessages = await API.get(
        `/messages?receiver_id=${messengerObject.id}&receiver_class=User`,
        { headers: userHeaders }
      ).catch((err) => {
        console.log(`retrieve message error ${err}`);
      });
      if (getMessengerMessages.status === 200) {
        setMessengerMessages(getMessengerMessages.data.data);
        console.log(getMessengerMessages.data.data);
      }
    }
    console.log("messenger is a user");
  };
  //get messages of DMed
  useEffect(() => {
    if (messengerObject) {
      axiosGetMessengerMessages();
      console.log("updated messenger messages");
    }
  }, [messengerObject, sendMessageUpdate, update]);

  function scrollDown() {
    var elem = document.getElementById("data");
    elem.scrollTop = elem.scrollHeight;
  }

  useEffect(() => {
    scrollDown();
  }, [messengerMessages]);
  return (
    <>
      <Kausap />
      <div id="data" className={styles.messagesContainer}>
        {messengerMessages &&
          messengerMessages.map((messages) => {
            return (
              <Message
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
