import { createContext } from "react";

export const ChannelsContext = createContext({
  userChannels: [],
  setUserChannels: () => {},
});
