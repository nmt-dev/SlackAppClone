import React, { useState } from "react";
import Btn from "../General/Button";
import styles from "../PopUp/PopUp.module.scss";
import { useContext } from "react";
import { OpennerContext } from "../../Context/OpennerContext";
import Input from "../General/Input";
import UserListGenerator from "../../Utils/UserListGenerator";
import { UsersContext } from "../../Context/UsersContext";
import { MessengerContext } from "../../Context/MessengerContext";
import { MessengerObjectContext } from "../../Context/MessengerObjectContext";
import { ChannelsContext } from "../../Context/ChannelsContext";
import API from "../../Utils/API";
import { UserContext } from "../../Context/UserContext";

function PopUp({ updateMe }) {
  const { isOpen, setIsOpen, isOpenChannel, setIsOpenChannel } =
    useContext(OpennerContext);
  const { usersList, setUsersList } = useContext(UsersContext);
  const { messenger, setMessenger } = useContext(MessengerContext);
  const { addThisChannel, setAddThisChannel } = useContext(ChannelsContext);
  const [chosenUser, setChosenUser] = useState();
  const [channelName, setChannelName] = useState();
  const [channelMembers, setChannelMembers] = useState([{ user_ids: "" }]);
  const { userHeaders, setUSerHeaders } = useContext(UserContext);

  function addChannelMembers() {
    setChannelMembers([...channelMembers, { user_ids: "" }]);
    console.log("add input");
  }

  const axiosCreateChannel = async () => {
    const createThisChannel = await API.post(
      "/channels",
      {
        name: channelName,
        user_ids: [...channelMembers].values(),
      },
      { headers: userHeaders }
    ).catch((err) => {
      console.log(`add channel error ${err}`);
    });
    updateMe();
  };

  // const axiosGetMessengerMessages = async () => {
  //   const getMessengerMessages = await API.get(
  //     `/messages?receiver_id=${messengerObject.id}&receiver_class=User`,
  //     { headers: userHeaders }
  //   ).catch((err) => {
  //     console.log(`retrieve message error ${err}`);
  //   });
  //   if (getMessengerMessages.status === 200) {
  //     setmessengerMessages(getMessengerMessages.data.data);
  //   }
  // };

  function togglePop(e) {
    e.preventDefault();
    setIsOpen(false);
    setMessenger(chosenUser);
    updateMe();
    // alert("kausap set");
  }

  function togglePopChannels(e) {
    e.preventDefault();
    axiosCreateChannel();
    setTimeout(() => {
      setIsOpenChannel(false);
    }, 3000);
  }

  function handleChannelNameChange() {
    setAddThisChannel(channelName);
    console.log(channelName);
  }

  function closePopUp() {
    setIsOpen(false);
    setIsOpenChannel(false);
  }

  function handleChange(i, e) {
    let newChannelMembers = [...channelMembers];
    newChannelMembers[i][e.target.name] = e.target.value;
    setChannelMembers(newChannelMembers);
  }

  function handleBlur(i, e) {
    let userEmails = usersList.map((a) => a.uid);
    let onDataList = userEmails.find((email) => email == e.target.value);
    if (onDataList !== undefined) {
      let newChannelMembers = [...channelMembers];
      newChannelMembers[i][e.target.name] = onDataList;
      setChannelMembers(newChannelMembers);
    } else {
      alert("email not found");
      e.target.value = "";
      let newChannelMembers = [...channelMembers];
      newChannelMembers[i][e.target.name] = "";
    }
  }

  return (
    <>
      <div className={styles.contain}>
        <div className={styles.box}>
          {isOpenChannel && (
            <>
              <form className={styles.pmform} onSubmit={togglePopChannels}>
                <div className={styles.channelform}>
                  <h2 className={styles.label}>Channel Name:</h2>
                  <Input
                    className={styles.datalistinputfield}
                    onChange={(e) => setChannelName(e.target.value)}
                    autoComplete="off"
                    required={true}
                    onBlur={handleChannelNameChange}
                  />
                  <h2 className={styles.label}>Members:</h2>
                  <Btn
                    className={styles.button}
                    content={"Add"}
                    onClick={() => addChannelMembers()}
                    type="button"
                  />
                </div>
                {channelMembers.map((element, index) => (
                  <>
                    <Input
                      key={index}
                      name="user_ids"
                      list="userlist"
                      className={styles.datalistinputfield}
                      value={element.user_ids || ""}
                      onChange={(e) => handleChange(index, e)}
                      onBlur={(e) => handleBlur(index, e)}
                      autoComplete="off"
                      required={true}
                    />
                    <datalist id="userlist">
                      <UserListGenerator usersArray={usersList} />
                    </datalist>
                  </>
                ))}

                <Btn
                  className={styles.button}
                  content={"Add Channel"}
                  type={"submit"}
                />
              </form>
            </>
          )}
          {isOpen && (
            <>
              <h2 className={styles.label}>Send To:</h2>
              <form className={styles.pmform} onSubmit={togglePop}>
                <Input
                  list="userlist"
                  className={styles.datalistinputfield}
                  onChange={(e) => setChosenUser(e.target.value)}
                  autoComplete="off"
                  required={true}
                />
                <datalist id="userlist">
                  <UserListGenerator usersArray={usersList} />
                </datalist>
                <Btn
                  className={styles.button}
                  content={"Submit"}
                  type={"submit"}
                />
              </form>
            </>
          )}
          <i
            id={styles.close}
            onClick={closePopUp}
            class="las la-times-circle"
          ></i>
        </div>
      </div>
    </>
  );
}

export default PopUp;
