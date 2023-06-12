import React, { useState } from "react";
import axios from 'axios';

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  updateUserProfile: (displayName, photoUrl) => {},
});

export const AuthContextProvider = (props) => {
  const firstToken = localStorage.getItem("token");
  const [token, setToken] = useState(firstToken);

  const userIsLoggedIn = !!token;

  const loginHandler = (tkn) => {
    setToken(tkn);
    localStorage.setItem("token", tkn);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("email");
    localStorage.removeItem("token");
  };

  const updateUserProfileHandler = async (displayName, photoUrl) => {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=[API_KEY]`,
        {
          idToken: token,
          displayName: displayName,
          photoUrl: photoUrl,
          returnSecureToken: true,
        }
      );

      // Handle the response
      // Update necessary values in the context and local storage
      // For example:
      setToken(response.data.idToken);
      localStorage.setItem("token", response.data.idToken);

    } catch (error) {
      console.log(error);
      // Handle the error
    }
  };

  const authContextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    updateUserProfile: updateUserProfileHandler,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
