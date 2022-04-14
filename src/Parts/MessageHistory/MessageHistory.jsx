import React, { useEffect } from "react";
import Message from "../../Components/MainPage/Message";
import Kausap from "../../Components/MainPage/Interlocutor";
import styles from "./MessageHistory.module.scss";
import { useContext } from "react";
import { MessagesContext } from "../../Context/MessagesContext";
import { MessengerMessagesContext } from "../../Context/MessagesContext copy";
import { FilteredMessagesContext } from "../../Context/FilteredMessagesContext";
import { LoggedInUserContext } from "../../Context/LoggedInUserContext";
import { MessengerObjectContext } from "../../Context/MessengerObjectContext";
import nameFormatter from "../../Utils/Nameformatter";
import { toBeInTheDocument } from "@testing-library/jest-dom/dist/matchers";
function MessageHistory({ update }) {
  const { userMessages } = useContext(MessagesContext);
  const { messengerMessages } = useContext(MessengerMessagesContext);
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);
  const { messengerObject, setMessengerObject } = useContext(
    MessengerObjectContext
  );
  const { filteredMessages, setFilteredMessages } = useContext(
    FilteredMessagesContext
  );

  useEffect(() => {
    if (messengerMessages) {
      FilteredMessages();
      console.log("filtered messages");
    }
  }, [messengerMessages, update]);

  const FilteredMessages = () => {
    if (messengerMessages.length !== 0) {
      setFilteredMessages(
        [...userMessages, ...messengerMessages].filter((messages) => {
          return (
            (messages.sender.id === loggedInUser.id &&
              messages.receiver.id === messengerObject.id) ||
            (messages.sender.id === messengerObject.id &&
              messages.receiver.id === loggedInUser.id)
          );
        })
      );
    }
    if (messengerMessages.length === 0) {
      setFilteredMessages([]);
    }
  };

  return (
    <>
      <Kausap />
      <div className={styles.messagesContainer}>
        {messengerMessages &&
          filteredMessages.map((messages) => {
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
