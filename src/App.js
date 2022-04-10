import LandingPage from "../src/Pages/LandingPage";
import SignUp from "./Components/Signup/Signup";
import SlackPage from "./Pages/SlackPage";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";

import { Route, Routes, Navigate } from "react-router-dom";
import UserLogin from "./Components/Login/Login";
import { useState } from "react";
import Success from "./Components/Success";
import { UserContext } from "./Context/UserContext";
import { ChannelsContext } from "./Context/ChannelsContext";
import { OpennerContext } from "./Context/OpennerContext";
import { UsersContext } from "./Context/UsersContext";
import { MessengerContext } from "./Context/MessengerContext";
import { LoggedInUserContext } from "./Context/LoggedInUserContext";
import { MessagesContext } from "./Context/MessagesContext";
import { MessengerObjectContext } from "./Context/MessengerObjectContext";

function App() {
  const [auth, setAuth] = useState(null);

  //signin headers
  const [userHeaders, setUserHeaders] = useState();
  const value = { userHeaders, setUserHeaders };

  //popup isopen
  const [isOpen, setIsOpen] = useState(false);
  const opener = { isOpen, setIsOpen };

  //userslist
  const [usersList, setUsersList] = useState([]);
  const usersListprops = { usersList, setUsersList };

  //messenger
  const [messenger, setMessenger] = useState();
  const myMessenger = { messenger, setMessenger };

  //loggedinuser
  const [loggedIn, setLoggedIn] = useState();
  const myloggedIn = { loggedIn, setLoggedIn };

  //recieved messages
  const [userMessages, setUserMessages] = useState();
  const Message = { userMessages, setUserMessages };

  //messenger object
  const [messengerObject, setMessengerObject] = useState();
  const mObject = { messengerObject, setMessengerObject };

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
                <UserContext.Provider value={value}>
                  <UserLogin auth={auth} setAuth={setAuth} />
                </UserContext.Provider>
              </LoggedInUserContext.Provider>
            </PublicRoute>
          }
        />

        <Route
          path="/SlackPage"
          element={
            <PrivateRoute auth={auth}>
              <LoggedInUserContext.Provider value={myloggedIn}>
                <MessengerObjectContext.Provider value={mObject}>
                  <MessengerContext.Provider value={myMessenger}>
                    <OpennerContext.Provider value={opener}>
                      <UserContext.Provider value={value}>
                        <UsersContext.Provider value={usersListprops}>
                          <MessagesContext.Provider value={Message}>
                            <SlackPage />
                          </MessagesContext.Provider>
                        </UsersContext.Provider>
                      </UserContext.Provider>
                    </OpennerContext.Provider>
                  </MessengerContext.Provider>
                </MessengerObjectContext.Provider>
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
