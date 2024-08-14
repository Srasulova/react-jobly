// Define the User type based on API response
export interface User {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_admin: boolean;
}

// Define the DecodedToken type based on the JWT structure
export interface DecodedToken {
  username: string;
}

// Define the context type
export interface UserContextType {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}
