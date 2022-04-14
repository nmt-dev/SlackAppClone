import { createContext } from "react";

export const LoggedInUserContext = createContext({
  loggedInUser: "",
  setLoggedInUser: () => {},
});
