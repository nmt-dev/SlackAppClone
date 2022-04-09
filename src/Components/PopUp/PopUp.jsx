import React, { useState } from "react";
import Btn from "../General/Button";
import styles from "../PopUp/PopUp.module.scss";
import { useContext } from "react";
import { OpennerContext } from "../../Context/OpennerContext";
import Input from "../General/Input";
import UserListGenerator from "../../Utils/UserListGenerator";
import { UsersContext } from "../../Context/UsersContext";

function PopUp() {
  const [usersArray, setUsersArray] = useState(["user1", "user2"]);
  const { isOpen, setIsOpen } = useContext(OpennerContext);
  const { usersList, setUsersList } = useContext(UsersContext);
  function togglePop() {
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
              //value
              //onChange
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
            onClick={togglePop}
            class="las la-times-circle"
          ></i>
        </div>
      </div>
    </>
  );
}

export default PopUp;
