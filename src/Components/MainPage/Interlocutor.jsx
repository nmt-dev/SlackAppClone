import React from "react";
import styles from "./Interlocutor.module.scss";
import Img from "../General/Img";
import profilepic from "../../Assets/Images/profilepic.png";
import { MessengerContext } from "../../Context/MessengerContext";
import { useContext } from "react";
import nameFormatter from "../../Utils/Nameformatter";
import { MessengerMessagesContext } from "../../Context/MessagesContext copy";
import { MessengerObjectContext } from "../../Context/MessengerObjectContext";
import { ChannelsContext } from "../../Context/ChannelsContext";
import { UsersContext } from "../../Context/UsersContext";
import PopUp from "../PopUp/PopUp";
import { OpennerContext } from "../../Context/OpennerContext";
function Kausap() {
  const { messenger, setmessenger } = useContext(MessengerContext);
  const { messengerObject } = useContext(MessengerObjectContext);
  const {
    channelMembers,
    setChannelMembers,
    displayChannelMembers,
    setDisplayChannelMembers,
  } = useContext(ChannelsContext);
  const { usersList } = useContext(UsersContext);
  const { setIsOpenChannelMembers } = useContext(OpennerContext);
  function handleClick() {
    alert(channelMembers);
  }

  function funcdisplayChannelMembers() {
    let newwww = channelMembers.map((obj) => obj.user_id);
    let membersEmails = usersList
      .filter((obj) => newwww.includes(obj.id))
      .map((obj) => obj.email)
      .map(nameFormatter);
    console.log(membersEmails);
    setIsOpenChannelMembers(true);
    console.log("add members open");
    setDisplayChannelMembers(membersEmails);
  }
  return (
    <>
      <div className={styles.contain}>
        <div className={styles.imgname}>
          <Img link={profilepic} logocontainerclassname={styles.imgcontain} />
          {messenger && (
            <h1 className={styles.textkausap}>{nameFormatter(messenger)}</h1>
          )}
        </div>
        {messengerObject && (
          <div className={styles.logoscont}>
            {messengerObject.name && (
              <i
                onClick={funcdisplayChannelMembers}
                id={styles.members}
                class="las la-users"
              ></i>
            )}
            <i id={styles.call} class="las la-phone"></i>
          </div>
        )}
      </div>
    </>
  );
}

export default Kausap;
