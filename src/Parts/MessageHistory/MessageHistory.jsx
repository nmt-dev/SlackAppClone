import React, { useEffect } from "react";
import Message from "../../Components/MainPage/Message";
import Kausap from "../../Components/MainPage/Interlocutor";
import styles from "./MessageHistory.module.scss";
import { useContext } from "react";
import { MessagesContext } from "../../Context/MessagesContext";
import { MessengerMessagesContext } from "../../Context/MessagesContext copy";
import { LoggedInUserContext } from "../../Context/LoggedInUserContext";
import { MessengerObjectContext } from "../../Context/MessengerObjectContext";
import nameFormatter from "../../Utils/Nameformatter";
import { toBeInTheDocument } from "@testing-library/jest-dom/dist/matchers";
function MessageHistory() {
  const { userMessages } = useContext(MessagesContext);
  const { messengerMessages } = useContext(MessengerMessagesContext);
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);
  const { messengerObject, setMessengerObject } = useContext(
    MessengerObjectContext
  );
  return (
    <>
      <Kausap />
      <div className={styles.messagesContainer}>
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
