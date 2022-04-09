import { createContext } from "react";

export const UserContext = createContext({
  userHeaders: "",
  setUserHeaders: () => {},
});
