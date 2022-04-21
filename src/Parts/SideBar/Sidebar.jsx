import React from "react";
import Btn from "../../Components/General/Button";
import Channels from "../../Components/SideBar/Channels";
import Company from "../../Components/SideBar/Company";
import styles from "../SideBar/Sidebar.module.scss";
import { useContext } from "react";
import { OpennerContext } from "../../Context/OpennerContext";

function SideBar({ update }) {
  const { setIsOpen, setIsOpenChannel } = useContext(OpennerContext);

  function togglePop() {
    console.log("toggle open");
    setIsOpen(true);
    console.log("add messenger open");
  }
  function togglePopChannels() {
    console.log("add channels open");
    setIsOpenChannel(true);
  }

  return (
    <>
      <div className={styles.main}>
        <Company />
        <div className={styles.channelheader}>
          <i id={styles.drop} class="las la-caret-down"></i>
          <p className={styles.textheader}>Channels</p>
          <Btn
            onClick={togglePopChannels}
            className={styles.button}
            content={<i class="las la-plus"></i>} //add channels
          />
        </div>
        <Channels update={update} />
        <div className={styles.dmheader}>
          <i id={styles.drop} class="las la-caret-down"></i>
          <p className={styles.textheader}>Direct Messages</p>
          <Btn
            onClick={togglePop}
            className={styles.button}
            content={<i id={styles.write} class="las la-comment-dots"></i>}
          />
        </div>
      </div>
    </>
  );
}

export default SideBar;
