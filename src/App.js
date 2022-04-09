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
              <UserContext.Provider value={value}>
                <UserLogin auth={auth} setAuth={setAuth} />
              </UserContext.Provider>
            </PublicRoute>
          }
        />

        <Route
          path="/SlackPage"
          element={
            <PrivateRoute auth={auth}>
              <OpennerContext.Provider value={opener}>
                <UserContext.Provider value={value}>
                  <UsersContext.Provider value={usersListprops}>
                    <SlackPage />
                  </UsersContext.Provider>
                </UserContext.Provider>
              </OpennerContext.Provider>
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
