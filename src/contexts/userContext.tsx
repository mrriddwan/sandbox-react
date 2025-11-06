import { createContext, useContext } from "react";
import { initialUserContext, type IUserContextValue } from "./types";

export const UserContext = createContext<IUserContextValue>({
  userContext: initialUserContext,
  setUserContext: () => {},
  isLoading: false,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const useUserContext = () => useContext(UserContext);