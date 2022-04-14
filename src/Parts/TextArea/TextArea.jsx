import React, { useState } from "react";
import styles from "../TextArea/TextArea.module.scss";
import Btn from "../../Components/General/Button";
import API from "../../Utils/API";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { MessengerObjectContext } from "../../Context/MessengerObjectContext";

function TextArea({ updateMe }) {
  const { userHeaders, setUserHeaders } = useContext(UserContext);
  const { messengerObject, setMessengerObject } = useContext(
    MessengerObjectContext
  );

  const [textBody, setTextBody] = useState();

  const axiosSendMessage = async () => {
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
      console.log(`retrieve message error ${err}`);
    });
    console.log(MessageSent);
  };

  const sendmessage = (e) => {
    e.preventDefault();
    axiosSendMessage();
    alert("message sent");
    setTextBody("");
    updateMe();
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
