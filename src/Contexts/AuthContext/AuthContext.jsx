import { jwtDecode } from "jwt-decode";
import { Children, createContext, useEffect, useState } from "react";

export let AuthContext = createContext();

export function AuthContextProvider({ children }) {

  let [loginData, setLoginData] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? jwtDecode(token) : null;
  });

  let getLoginData = () => {
    let encodedData = localStorage.getItem('token');
    let decodedData = jwtDecode(encodedData);
    setLoginData(decodedData);
  }

  useEffect(() => {
    if (localStorage.getItem('token'))
      getLoginData();
  }, [])

  const logout = () => {
    localStorage.removeItem('token');
    setLoginData(null);
    <Navigate to='/login' />
  }

  return <AuthContext.Provider value={{ loginData, getLoginData, logout }}>{children}</AuthContext.Provider>
}