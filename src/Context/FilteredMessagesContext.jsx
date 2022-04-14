import { createContext } from "react";

export const FilteredMessagesContext = createContext({
  filteredMessages: [],
  setFilteredMessages: () => {},
});
