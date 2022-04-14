import React, { useState } from "react";
import Btn from "../General/Button";
import styles from "./Channels.module.scss";
import { ChannelsContext } from "../../Context/ChannelsContext";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import API from "../../Utils/API";
import { useEffect } from "react";
import { MessengerMessagesContext } from "../../Context/MessagesContext copy";
import { MessengerContext } from "../../Context/MessengerContext";
function Channels() {
  const { userHeaders, setUserHeaders } = useContext(UserContext);
  const {
    userChannels,
    setUserChannels,
    chosenChannel,
    setChosenChannel,
    selectedChannel,
    setSelectedChannel,
  } = useContext(ChannelsContext);
  const { messengerMessages, setmessengerMessages } = useContext(
    MessengerMessagesContext
  );
  const { messenger, setMessenger } = useContext(MessengerContext);

  const [foundChannel, setFoundChannel] = useState();

  const axiosGetChannelMessages = async (chosen) => {
    const channelMessages = await API.get(
      `messages?receiver_id=${chosen.id}&receiver_class=Channel`,
      { headers: userHeaders }
    ).catch((err) => {
      console.log(`retrieve message error ${err}`);
    });
    if (channelMessages.status === 200) {
      setmessengerMessages(channelMessages.data.data);
    }
  };
  //get channel messages
  useEffect(() => {
    axiosGetChannelMessages();
  }, chosenChannel);

  const foundChannelFunction = (e) => {
    console.log(e.target.innerText);
    let chosen = userChannels.data.find((obj) => {
      return obj.name === e.target.innerText;
    });
    setChosenChannel(chosen.id);
    setMessenger(chosen.name);
    axiosGetChannelMessages(chosen);
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
