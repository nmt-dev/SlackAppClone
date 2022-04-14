import React, { useState } from "react";
import Btn from "../General/Button";
import styles from "./Channels.module.scss";
import { ChannelsContext } from "../../Context/ChannelsContext";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

function Channels() {
  const { userHeaders, setUserHeaders } = useContext(UserContext);
  const { userChannels, setUserChannels } = useContext(ChannelsContext);

  return (
    <>
      <div className={styles.contain}>
        <ul className={styles.list}>
          {userChannels.errors && <li>{userChannels.errors}</li>}
          {!userChannels.errors &&
            userChannels.map((obj, i) => (
              <li className={styles.channellist} key={i}>
                <p className={styles.itemchannel}>{obj.name}</p>
                <Btn
                  className={styles.button}
                  content={<i class="las la-times"></i>} //add member popup
                />
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default Channels;
