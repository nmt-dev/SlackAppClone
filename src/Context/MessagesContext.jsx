import { createContext } from "react";

export const MessagesContext = createContext({
  userMessages: [],
  setUserMessages: () => {},
});
