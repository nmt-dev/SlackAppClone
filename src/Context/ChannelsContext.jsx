import { createContext } from "react";

export const ChannelsContext = createContext({
  userChannels: [],
  setUserChannels: () => {},
  addThisChannel: "",
  setAddThisChannel: () => {},
  chosenChannel: "",
  setChosenChannel: () => {},
  channelMembers: [],
  setChannelMembers: () => {},
  displayChannelMembers: [],
  setDisplayChannelMembers: () => {},
});
