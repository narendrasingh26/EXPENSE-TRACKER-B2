// // // import React, { useState } from "react";
// // // import axios from 'axios';

// // // const AuthContext = React.createContext({
// // //   token: "",
// // //   isLoggedIn: false,
// // //   login: (token) => {},
// // //   logout: () => {},
// // //   updateUserProfile: (displayName, photoUrl) => {},
// // // });

// // // export const AuthContextProvider = (props) => {
// // //   const firstToken = localStorage.getItem("token");
// // //   const [token, setToken] = useState(firstToken);

// // //   const userIsLoggedIn = !!token;

// // //   const loginHandler = (tkn) => {
// // //     setToken(tkn);
// // //     localStorage.setItem("token", tkn);
// // //   };

// // //   const logoutHandler = () => {
// // //     setToken(null);
// // //     localStorage.removeItem("email");
// // //     localStorage.removeItem("token");
// // //   };

// // //   const updateUserProfileHandler = async (displayName, photoUrl) => {
// // //     try {
// // //       const response = await axios.post(
// // //         `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCA46gocHDViaISYg1lCBrbs8uhf59zHk4`,
// // //         {
// // //           idToken: token,
// // //           displayName: displayName,
// // //           photoUrl: photoUrl,
// // //           returnSecureToken: true,
// // //         }
// // //       );

// // //       // Handle the response
// // //       // Update necessary values in the context and local storage
// // //       // For example:
// // //       setToken(response.data.idToken);
// // //       localStorage.setItem("token", response.data.idToken);

// // //     } catch (error) {
// // //       console.log(error);
// // //       // Handle the error
// // //     }
// // //   };

// // //   const authContextValue = {
// // //     token: token,
// // //     isLoggedIn: userIsLoggedIn,
// // //     login: loginHandler,
// // //     logout: logoutHandler,
// // //     updateUserProfile: updateUserProfileHandler,
// // //   };

// // //   return (
// // //     <AuthContext.Provider value={authContextValue}>
// // //       {props.children}
// // //     </AuthContext.Provider>
// // //   );
// // // };

// // // export default AuthContext;







// // import React, { useState, useEffect } from "react";
// // import axios from 'axios';

// // const AuthContext = React.createContext({
// //   token: "",
// //   isLoggedIn: false,
// //   login: (token) => {},
// //   logout: () => {},
// //   updateUserProfile: (displayName, photoUrl) => {},
// //   userData: null,
// // });

// // export const AuthContextProvider = (props) => {
// //   const firstToken = localStorage.getItem("token");
// //   const [token, setToken] = useState(firstToken);
// //   const [userData, setUserData] = useState(null);

// //   const userIsLoggedIn = !!token;

// //   useEffect(() => {
// //     if (token) {
// //       getUserProfile();
// //     }
// //   }, [token]);

// //   const loginHandler = (tkn) => {
// //     setToken(tkn);
// //     localStorage.setItem("token", tkn);
// //   };

// //   const logoutHandler = () => {
// //     setToken(null);
// //     setUserData(null);
// //     localStorage.removeItem("email");
// //     localStorage.removeItem("token");
// //   };

// //   const getUserProfile = async () => {
// //     try {
// //       const response = await axios.post(
// //         `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[API_KEY]`,
// //         {
// //           idToken: token,
// //         }
// //       );

// //       const user = response.data.users[0];
// //       setUserData(user);
// //     } catch (error) {
// //       console.log(error);
// //       // Handle the error
// //     }
// //   };

// //   const updateUserProfileHandler = async (displayName, photoUrl) => {
// //     try {
// //       const response = await axios.post(
// //         `https://identitytoolkit.googleapis.com/v1/accounts:update?key=[API_KEY]`,
// //         {
// //           idToken: token,
// //           displayName: displayName,
// //           photoUrl: photoUrl,
// //           returnSecureToken: true,
// //         }
// //       );

// //       // Handle the response and update necessary values in the context and local storage
// //       setToken(response.data.idToken);
// //       localStorage.setItem("token", response.data.idToken);

// //       // Update the user data with the new profile data
// //       const updatedUserData = { ...userData };
// //       updatedUserData.displayName = displayName;
// //       updatedUserData.photoUrl = photoUrl;
// //       setUserData(updatedUserData);

// //     } catch (error) {
// //       console.log(error);
// //       // Handle the error
// //     }
// //   };

// //   const authContextValue = {
// //     token: token,
// //     isLoggedIn: userIsLoggedIn,
// //     login: loginHandler,
// //     logout: logoutHandler,
// //     updateUserProfile: updateUserProfileHandler,
// //     userData: userData,
// //   };

// //   return (
// //     <AuthContext.Provider value={authContextValue}>
// //       {props.children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export default AuthContext;




// import React, { useState, useEffect, useCallback } from "react";
// import axios from 'axios';

// const AuthContext = React.createContext({
//   token: "",
//   isLoggedIn: false,
//   login: (token) => {},
//   logout: () => {},
//   updateUserProfile: (displayName, photoUrl) => {},
// });

// export const AuthContextProvider = (props) => {
//   const firstToken = localStorage.getItem("token");
//   const [token, setToken] = useState(firstToken);
//   const [userProfile, setUserProfile] = useState(null);

//   const userIsLoggedIn = !!token;

//   const loginHandler = (tkn) => {
//     setToken(tkn);
//     localStorage.setItem("token", tkn);
//   };

//   const logoutHandler = () => {
//     setToken(null);
//     localStorage.removeItem("email");
//     localStorage.removeItem("token");
//   };

//   const getUserProfile = useCallback(async () => {
//     try {
//       const response = await axios.post(
//         `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[API_KEY]`,
//         {
//           idToken: token
//         }
//       );

//       // Handle the response and extract the user profile data
//       const userProfileData = response.data.users[0];
//       setUserProfile(userProfileData);

//     } catch (error) {
//       console.log(error);
//       // Handle the error
//     }
//   }, [token]);

//   useEffect(() => {
//     if (token) {
//       getUserProfile();
//     }
//   }, [token, getUserProfile]);

//   const updateUserProfileHandler = async (displayName, photoUrl) => {
//     try {
//       const response = await axios.post(
//         `https://identitytoolkit.googleapis.com/v1/accounts:update?key=[API_KEY]`,
//         {
//           idToken: token,
//           displayName: displayName,
//           photoUrl: photoUrl,
//           returnSecureToken: true,
//         }
//       );

//       // Handle the response
//       // Update necessary values in the context and local storage
//       setToken(response.data.idToken);
//       localStorage.setItem("token", response.data.idToken);
//       // Update the user profile data
//       const updatedUserProfile = {
//         ...userProfile,
//         displayName: displayName,
//         photoUrl: photoUrl
//       };
//       setUserProfile(updatedUserProfile);

//     } catch (error) {
//       console.log(error);
//       // Handle the error
//     }
//   };

//   const authContextValue = {
//     token: token,
//     isLoggedIn: userIsLoggedIn,
//     userProfile: userProfile,
//     login: loginHandler,
//     logout: logoutHandler,
//     updateUserProfile: updateUserProfileHandler,
//   };

//   return (
//     <AuthContext.Provider value={authContextValue}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;













import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';


const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  updateUserProfile: (displayName, photoUrl) => {},
  sendEmailVerification: () => {},
  emailVerificationSent: false,
  userProfile: null,
});

export const AuthContextProvider = (props) => {
  const firstToken = localStorage.getItem("token");
  const [token, setToken] = useState(firstToken);
  const [userProfile, setUserProfile] = useState(null);
  // eslint-disable-next-line
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);

  const userIsLoggedIn = !!token;

  const loginHandler = (tkn) => {
    setToken(tkn);
    localStorage.setItem("token", tkn);
    getUserProfile(); 
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("email");
    localStorage.removeItem("token");
  };

  const getUserProfile = useCallback(async () => {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCA46gocHDViaISYg1lCBrbs8uhf59zHk4`,
        {
          idToken: token
        }
      );

      // Handle the response and extract the user profile data
      const userProfileData = response.data.users[0];
      console.log("User Profile Data:", userProfileData); 
      setUserProfile(userProfileData);

    } catch (error) {
      console.log(error);
      // Handle the error
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      getUserProfile();
    }
  }, [token, getUserProfile]);

  const updateUserProfileHandler = async (displayName, photoUrl) => {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCA46gocHDViaISYg1lCBrbs8uhf59zHk4`,
        {
          idToken: token,
          displayName: displayName,
          photoUrl: photoUrl,
          returnSecureToken: true,
        }
      );

      // Handle the response
      // Update necessary values in the context and local storage
      setToken(response.data.idToken);
      localStorage.setItem("token", response.data.idToken);
      // Update the user profile data
      const updatedUserProfile = {
        ...userProfile,
        displayName: displayName,
        photoUrl: photoUrl
      };
      setUserProfile(updatedUserProfile);

    } catch (error) {
      console.log(error);
      // Handle the error
    }
  };

  const sendEmailVerification = async () => {
    try {
      await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCA46gocHDViaISYg1lCBrbs8uhf59zHk4`,
        {
          requestType: "VERIFY_EMAIL",
          idToken: token
        }
      );
      setEmailVerificationSent(true);
      console.log(sendEmailVerification)
    } catch (error) {
      console.log(error);
      // Handle the error
    }
  };

  const authContextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    userProfile: userProfile,
    login: loginHandler,
    logout: logoutHandler,
    updateUserProfile: updateUserProfileHandler,
    sendEmailVerification: sendEmailVerification
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
    // <AuthContext.Provider value={authContextValue}>
    //   {emailVerificationSent ? (
    //     <div>Email verification sent!</div>
    //   ) : (
    //     props.children
        
    //   )}
    // </AuthContext.Provider>
  );
};

export default AuthContext;



