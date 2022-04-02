import React from "react";
import Channels from "../../Components/SideBar/Channels";
import styles from "../SideBar/Sidebar.module.scss";

function SideBar() {
  return (
    <>
      <div className={styles.main}>
        <Channels />
      </div>
    </>
  );
}

export default SideBar;
