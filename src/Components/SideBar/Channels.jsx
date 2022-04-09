import React, { useState } from "react";
import Btn from "../General/Button";
import styles from "./Channels.module.scss";
import { ChannelsContext } from "../../Context/ChannelsContext";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

function Channels() {
  const channels = ["Avion", "Lasal", "Ateneo"];
  const [channelsArray, SetChannelsArray] = useState([...channels]);

  const { userHeaders, setUserHeaders } = useContext(UserContext);
  // const { userChannels, setUserChannels } = useContext(ChannelsContext);

  return (
    <>
      <div className={styles.contain}>
        <ul className={styles.list}>
          {channelsArray.map((item, i) => (
            <li className={styles.channellist} key={i}>
              <p className={styles.itemchannel}>{item}</p>
              <Btn
                className={styles.button}
                content={<i class="las la-times"></i>}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Channels;
