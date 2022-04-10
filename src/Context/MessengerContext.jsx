import { createContext } from "react";

export const MessengerContext = createContext({
  messenger: "",
  setMessenger: () => {},
});
