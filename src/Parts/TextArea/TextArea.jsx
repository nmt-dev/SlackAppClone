import React, { useState } from "react";
import styles from "../TextArea/TextArea.module.scss";
import Btn from "../../Components/General/Button";
import API from "../../Utils/API";
import { useContext } from "react";
import { LoggedInUserContext } from "../../Context/LoggedInUserContext";
import { MessengerMessagesContext } from "../../Context/MessagesContext";

function TextArea({ updateMe }) {
  const { userHeaders } = useContext(LoggedInUserContext);
  const { messenger, messengerObject } = useContext(MessengerMessagesContext);
  const [textBody, setTextBody] = useState();

  const axiosSendMessage = async () => {
    switch (JSON.stringify(messenger).includes("@")) {
      case true:
        const MessageSent = await API.post(
          "/messages",
          {
            receiver_id: messengerObject.id,
            receiver_class: "User",
            body: textBody,
          },
          {
            headers: userHeaders,
          }
        ).catch((err) => {
          console.log(`send message error ${err}`);
        });
        console.log(MessageSent);
        updateMe();
        break;
      case false:
        const channelMessage = await API.post(
          "/messages",
          {
            receiver_id: messengerObject.id,
            receiver_class: "Channel",
            body: textBody,
          },
          { headers: userHeaders }
        ).catch((err) => {
          console.log(`send message error ${err}`);
        });
        console.log(channelMessage);
        updateMe();

        break;
    }
  };

  const sendmessage = (e) => {
    e.preventDefault();
    axiosSendMessage();
    setTextBody("");
  };

  return (
    <>
      <div className={styles.contain}>
        <form onSubmit={sendmessage} className={styles.formtextarea}>
          <textarea
            //onInput={auto_grow}
            placeholder="Message {Selected}"
            className={styles.textarea}
            value={textBody}
            onChange={(e) => setTextBody(e.target.value)}
            autoComplete="off"
            required={true}
          ></textarea>
          <Btn
            className={styles.button}
            type="submit"
            content={<i id={styles.i} class="las la-paper-plane"></i>}
          />
        </form>
      </div>
    </>
  );
}

export default TextArea;
