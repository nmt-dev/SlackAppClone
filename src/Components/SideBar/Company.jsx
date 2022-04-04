import React from "react";
import styles from "./Company.module.scss";

function Company() {
  return (
    <div className={styles.contain}>
      <h1 className={styles.textcompany}>Any Company</h1>
      <i id={styles.write} class="las la-comment-dots"></i>
    </div>
  );
}

export default Company;
