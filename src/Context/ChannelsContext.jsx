import { createContext } from "react";

export const ChannelsContext = createContext({
  userChannels: [],
  setUserChannels: () => {},
  addThisChannel: "",
  setAddThisChannel: () => {},
  chosenChannel: "",
  setChosenChannel: () => {},
  selectedChannel: "",
  setSelectedChannel: () => {},
  channelMembers: [],
  setChannelMembers: () => {},
  displayChannelMembers: [],
  setDisplayChannelMembers: () => {},
});
