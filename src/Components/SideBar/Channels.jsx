import React from "react";
import Btn from "../General/Button";
import styles from "./Channels.module.scss";
import { ChannelsContext } from "../../Context/ChannelsContext";
import { useContext } from "react";

import { MessengerMessagesContext } from "../../Context/MessagesContext";

function Channels() {
  const { userChannels, setChosenChannel } = useContext(ChannelsContext);
  const { setMessenger } = useContext(MessengerMessagesContext);

  const foundChannelFunction = (e) => {
    console.log(e.target.innerText);
    let chosen = userChannels.data.find((obj) => {
      return obj.name === e.target.innerText;
    });
    setChosenChannel(chosen.id);
    setMessenger(chosen.name);
  };

  return (
    <>
      <div className={styles.contain}>
        <ul className={styles.list}>
          {userChannels.errors && <li>{userChannels.errors}</li>}
          {userChannels.data &&
            userChannels.data.map((obj, i) => (
              <li className={styles.channellist} key={i}>
                <p
                  className={styles.itemchannel}
                  onClick={(e) => foundChannelFunction(e)}
                >
                  {obj.name}
                </p>
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
