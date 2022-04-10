import React, { useState } from "react";
import Btn from "../General/Button";
import styles from "../PopUp/PopUp.module.scss";
import { useContext } from "react";
import { OpennerContext } from "../../Context/OpennerContext";
import Input from "../General/Input";
import UserListGenerator from "../../Utils/UserListGenerator";
import { UsersContext } from "../../Context/UsersContext";
import { MessengerContext } from "../../Context/MessengerContext";
import { MessengerObjectContext } from "../../Context/MessengerObjectContext";

function PopUp() {
  const { isOpen, setIsOpen } = useContext(OpennerContext);
  const { usersList, setUsersList } = useContext(UsersContext);
  const { messenger, setMessenger } = useContext(MessengerContext);

  const [chosenUser, setChosenUser] = useState();

  function togglePop() {
    setIsOpen(!isOpen);
    setMessenger(chosenUser);
  }

  function closePopUp() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className={styles.contain}>
        <div className={styles.box}>
          <h2 className={styles.label}>Send To:</h2>
          <form className={styles.pmform} onSubmit={togglePop}>
            <Input
              list="userlist"
              className={styles.datalistinputfield}
              onChange={(e) => setChosenUser(e.target.value)}
              autoComplete="off"
              required={true}
            />
            <datalist id="userlist">
              <UserListGenerator usersArray={usersList} />
            </datalist>
            <Btn className={styles.button} content={"Send"} type={"submit"} />
          </form>
          <i
            id={styles.close}
            onClick={closePopUp}
            class="las la-times-circle"
          ></i>
        </div>
      </div>
    </>
  );
}

export default PopUp;
