import React from "react";
import Btn from "../../Components/General/Button";
import Channels from "../../Components/SideBar/Channels";
import Company from "../../Components/SideBar/Company";
import styles from "../SideBar/Sidebar.module.scss";
import { useContext } from "react";
import { OpennerContext } from "../../Context/OpennerContext";
import { UserContext } from "../../Context/UserContext";

function SideBar() {
  const { isOpen, setIsOpen } = useContext(OpennerContext);

  function togglePop() {
    console.log("toggle open");
    setIsOpen(!isOpen);
    console.log(isOpen);
  }
  return (
    <>
      <div className={styles.main}>
        <Company />
        <div className={styles.channelheader}>
          <i id={styles.drop} class="las la-caret-down"></i>
          <p className={styles.textheader}>Channels</p>
          <Btn
            className={styles.button}
            content={<i class="las la-plus"></i>}
          />
        </div>
        <Channels />
        <div className={styles.dmheader}>
          <i id={styles.drop} class="las la-caret-down"></i>
          <p className={styles.textheader}>Direct Messages</p>
          <Btn
            onClick={togglePop}
            className={styles.button}
            content={<i class="las la-plus"></i>}
          />
        </div>
      </div>
    </>
  );
}

export default SideBar;
