import React from "react";
import Input from "../General/Input";
import styles from "./SearchBar.module.scss";

function SearchBar() {
  return (
    <div className={styles.contain}>
      <Input
        type={"text"}
        className={styles.searchbar}
        placeholder={"Search {Company}"}
      />
      <div tabIndex="0" className={styles.searchbutton}>
        <i id={styles.i} class="las la-search"></i>
      </div>
    </div>
  );
}

export default SearchBar;
