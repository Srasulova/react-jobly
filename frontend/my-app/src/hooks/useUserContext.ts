import { createContext, useContext } from "react";
import { UserContextType } from "../types"; // Adjust the path if needed

// Create the UserContext
const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      "useUserContext must be used within a UserContext.Provider"
    );
  }
  return context;
};

export { UserContext };
