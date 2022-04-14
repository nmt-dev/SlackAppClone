import { createContext } from "react";

export const OpennerContext = createContext({
  isOpen: false,
  setIsOpen: () => {},
  isOpenChannel: false,
  setIsOpenChannel: () => {},
});
