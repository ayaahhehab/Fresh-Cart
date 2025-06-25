import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export let UserContext = createContext();

export default function UserContextProvider(props) {
  const [userToken, setUserToken] = useState(localStorage.getItem('userToken'));
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userToken) {
      const savedUser = localStorage.getItem('userData');
      if (savedUser) {
        setUserData(JSON.parse(savedUser)); // use the saved user info
      } else {
        const decoded = jwtDecode(userToken);
        setUserData(decoded); // fallback if userData not found
      }
    }
  }, [userToken]);

  return (
    <UserContext.Provider value={{ userToken, setUserToken, setUserData, userData }}>
      {props.children}
    </UserContext.Provider>
  );
}
