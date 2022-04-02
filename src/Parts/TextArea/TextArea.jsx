import React from "react";
import styles from "../TextArea/TextArea.module.scss";

const sendmessage = () => {
  alert("message sent");
};

// function auto_grow(element) {
//   element.style.height = "15px";
//   element.style.height = element.scrollHeight + "px";
// }
function TextArea() {
  return (
    <>
      <div className={styles.contain}>
        <form className={styles.formtextarea}>
          <textarea
            //onInput={auto_grow}
            placeholder="Message {Selected}"
            className={styles.textarea}
          ></textarea>
          <div tabIndex="0" className={styles.sendbutton}>
            <i class="las la-paper-plane"></i>
          </div>
        </form>
      </div>
    </>
  );
}

export default TextArea;
