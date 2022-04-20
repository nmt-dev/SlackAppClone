import LandingPage from "./Pages/LandingPage/LandingPage";
import SignUp from "./Components/Signup/Signup";
import SlackPage from "./Pages/SlackPage/SlackPage";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";
import { Route, Routes } from "react-router-dom";
import { ChannelsContext } from "./Context/ChannelsContext";
import { OpennerContext } from "./Context/OpennerContext";
import { LoggedInUserContext } from "./Context/LoggedInUserContext";
import { MessengerMessagesContext } from "./Context/MessagesContext";
import { UpdateContext } from "./Context/SendMessageContext";
import { useState } from "react";
import UserLogin from "./Components/Login/Login";
import Success from "./Components/Success";

function App() {
  const [auth, setAuth] = useState(null);
  /////loggedinusercontext
  //loggedinuser
  const [loggedInUser, setLoggedInUser] = useState();
  const [userHeaders, setUserHeaders] = useState();
  const [usersList, setUsersList] = useState([]);
  const myloggedIn = {
    loggedInUser,
    setLoggedInUser,
    userHeaders,
    setUserHeaders,
    usersList,
    setUsersList,
  };

  //popup isopen
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenChannel, setIsOpenChannel] = useState(false);
  const [isOpenChannelMembers, setIsOpenChannelMembers] = useState(false);
  const opener = {
    isOpen,
    setIsOpen,
    isOpenChannel,
    setIsOpenChannel,
    isOpenChannelMembers,
    setIsOpenChannelMembers,
  };

  //messenger messages
  const [messengerMessages, setMessengerMessages] = useState();
  const [messenger, setMessenger] = useState();
  const [messengerObject, setMessengerObject] = useState();
  const messages = {
    messengerMessages,
    setMessengerMessages,
    messenger,
    setMessenger,
    messengerObject,
    setMessengerObject,
  };

  //userslist
  const [userChannels, setUserChannels] = useState([]);
  const [addThisChannel, setAddThisChannel] = useState();
  const [chosenChannel, setChosenChannel] = useState();
  const [channelMembers, setChannelMembers] = useState();
  const [displayChannelMembers, setDisplayChannelMembers] = useState();
  const myChannels = {
    userChannels,
    setUserChannels,
    addThisChannel,
    setAddThisChannel,
    chosenChannel,
    setChosenChannel,
    channelMembers,
    setChannelMembers,
    displayChannelMembers,
    setDisplayChannelMembers,
  };

  //update
  const [sendMessageUpdate, setSendMessageUpdate] = useState();
  const myUpdate = { sendMessageUpdate, setSendMessageUpdate };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute auth={auth}>
              <LandingPage />
            </PublicRoute>
          }
        />
        <Route
          path="/SignUp"
          element={
            <PublicRoute auth={auth}>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path="/LogIn"
          element={
            <PublicRoute auth={auth}>
              <LoggedInUserContext.Provider value={myloggedIn}>
                <UserLogin auth={auth} setAuth={setAuth} />
              </LoggedInUserContext.Provider>
            </PublicRoute>
          }
        />

        <Route
          path="/SlackPage"
          element={
            <PrivateRoute auth={auth} setAuth={setAuth}>
              <LoggedInUserContext.Provider value={myloggedIn}>
                <ChannelsContext.Provider value={myChannels}>
                  <MessengerMessagesContext.Provider value={messages}>
                    <OpennerContext.Provider value={opener}>
                      <UpdateContext.Provider value={myUpdate}>
                        <SlackPage setAuth={setAuth} />
                      </UpdateContext.Provider>
                    </OpennerContext.Provider>
                  </MessengerMessagesContext.Provider>
                </ChannelsContext.Provider>
              </LoggedInUserContext.Provider>
            </PrivateRoute>
          }
        />

        <Route
          path="*"
          element={
            <Success
              content={"Nothing on this page. Error 404"}
              redirect={"Redirecting to Landing Page"}
              page={""}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
