import React, { useState } from "react";
import styles from "./Channels.module.scss";

function Channels() {
  const channels = ["Avion", "Lasal", "Ateneo"];
  const [channelsArray, SetChannelsArray] = useState([...channels]);

  return (
    <>
      <div className={styles.contain}>
        <ul className={styles.list}>
          {channelsArray.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Channels;
