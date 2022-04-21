import React, { useState } from "react";
import styles from "../TextArea/TextArea.module.scss";
import Btn from "../../Components/General/Button";
import { useContext } from "react";
import { LoggedInUserContext } from "../../Context/LoggedInUserContext";
import { MessengerMessagesContext } from "../../Context/MessagesContext";
import API from "../../Utils/API";

function TextArea({ updateMe }) {
  const { userHeaders } = useContext(LoggedInUserContext);
  const { messenger, messengerObject } = useContext(MessengerMessagesContext);
  const [textBody, setTextBody] = useState();

  const sendmessage = (e) => {
    e.preventDefault();
    switch (JSON.stringify(messenger).includes("@")) {
      case true:
        API.post(
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
        updateMe();
        break;
      case false:
        API.post(
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
        updateMe();
        break;
    }
    setTextBody("");
  };

  return (
    <>
      <div className={styles.contain}>
        <form onSubmit={sendmessage} className={styles.formtextarea}>
          <textarea
            //onInput={auto_grow}
            placeholder={`Message ${messenger}`}
            className={styles.textarea}
            value={textBody}
            onChange={(e) => setTextBody(e.target.value)}
            autoComplete="off"
            required={true}
          ></textarea>
          <Btn className={styles.button} type="submit" content={"Send"} />
        </form>
      </div>
    </>
  );
}

export default TextArea;
