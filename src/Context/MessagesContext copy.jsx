import { createContext } from "react";

export const MessengerMessagesContext = createContext({
  messengerMessages: [],
  setMessengerMessages: () => {},
});
