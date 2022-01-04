import { createContext, useContext, useState } from "react";

export const userContext = createContext({
  user: null,
  logIn: () => {},
  logOut: () => {},
});

const USER = { username: "Guest", isGuestUser: true };

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(USER);
  function logIn({ username, password }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "abhishek" && password === "abhishek") {
          setUser({ username, isGuestUser: false });
          resolve("Authenticated");
        } else {
          reject("Username or password is incorrect");
        }
      }, 1000);
    });
  }
  function logOut() {
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser(USER);
        resolve("Logged out successfully");
      }, 1000);
    });
  }
  return (
    <userContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </userContext.Provider>
  );
}

export function useUserContext() {
  const { user, logIn, logOut } = useContext(userContext);

  return { user, logIn, logOut };
}
