import React, { useEffect } from "react";
import Btn from "../General/Button";
import styles from "./Channels.module.scss";
import { ChannelsContext } from "../../Context/ChannelsContext";
import { useContext } from "react";
import { MessengerMessagesContext } from "../../Context/MessagesContext";
import { LoggedInUserContext } from "../../Context/LoggedInUserContext";
import API from "../../Utils/API";

function Channels({ update }) {
  const { userChannels, setUserChannels, setChosenChannel, setChannelMembers } =
    useContext(ChannelsContext);
  const { messengerObject, setMessenger, messenger } = useContext(
    MessengerMessagesContext
  );
  const { loggedInUser, userHeaders } = useContext(LoggedInUserContext);

  const foundChannelFunction = (e) => {
    console.log(e.target.innerText);
    let chosen = userChannels.data.find((obj) => {
      return obj.name === e.target.innerText;
    });
    setChosenChannel(chosen.id);
    setMessenger(chosen.name);
  };
  //get channel details
  useEffect(() => {
    if (messengerObject) {
      API.get(`/channels/${messengerObject.id}`, {
        headers: userHeaders,
      })
        .then((response) => {
          setChannelMembers(response.data.data.channel_members);
        })
        .catch((err) => {
          console.log(`getchanneldetails ${err}`);
        });
    }
  }, [messengerObject, update]);

  //get userchannels
  useEffect(() => {
    if (loggedInUser) {
      API.get("/channels", {
        headers: userHeaders,
      })
        .then((response) => {
          setUserChannels(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loggedInUser, update, messenger]);

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
