import React from "react";
import Channels from "../../Components/SideBar/Channels";
import styles from "../SideBar/Sidebar.module.scss";

function SideBar() {
  return (
    <>
      <div className={styles.main}>
        <p className={styles.headers}>Channels</p>
        <Channels />
        <p className={styles.headers}>Direct Message</p>
      </div>
    </>
  );
}

export default SideBar;
