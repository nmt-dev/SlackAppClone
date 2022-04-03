import React from "react";
import styles from "./Company.module.scss";

function Company() {
  return (
    <div className={styles.contain}>
      <h1 className={styles.textcompany}>Any Company</h1>
      <i id={styles.write} class="lab la-rocketchat"></i>
    </div>
  );
}

export default Company;
