import { Children, createContext, useReducer } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(init, userReducer);
  return <UserContext.Provider>{children}</UserContext.Provider>;
};
