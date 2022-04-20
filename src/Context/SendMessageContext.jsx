import { createContext } from "react";

export const UpdateContext = createContext({
  sendMessageUpdate: false,
  setSendMessageUpdate: () => {},
});
