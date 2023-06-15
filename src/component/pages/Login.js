import { useState, useRef, useContext } from "react";
// import {Link} from 'react-router-dom'
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

import classes from "./Login.module.css";
import AuthContext from "../store/auth-context";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Login = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef("");

  const [isLogin, setIsLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const signupHandler = async (event) => {
    event.preventDefault();

    const emailEntered = emailInputRef.current.value;
    const passwordEntered = passwordInputRef.current.value;
    const confirmPasswordEntered = confirmPasswordInputRef.current.value;
    const emailRegEx = emailEntered.replace(/[^a-zA-Z0-9 ]/g, "");
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCA46gocHDViaISYg1lCBrbs8uhf59zHk4";

    sendData(url, emailEntered, passwordEntered, confirmPasswordEntered)
      .then((result) => {
        console.log("result", result);
        authCtx.login(result.idToken);

        localStorage.setItem("email", emailRegEx);
        localStorage.setItem("token", result.idToken);

        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
        confirmPasswordInputRef.current.value = "";
        console.log("User successfully signed up");
        //   history.push("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginHandler = async (event) => {
    event.preventDefault();

    const emailEntered = emailInputRef.current.value;
    const passwordEntered = passwordInputRef.current.value;
    const emailRegEx = emailEntered.replace(/[^a-zA-Z0-9 ]/g, "");
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCA46gocHDViaISYg1lCBrbs8uhf59zHk4";

    sendData(url, emailEntered, passwordEntered)
      .then((result) => {
        console.log("result", result);
        authCtx.login(result.idToken);

        localStorage.setItem("email", emailRegEx);
        localStorage.setItem("token", result.idToken);

        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
        history.push("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendData = async (url, email, password, confirmpassword) => {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        confirmpassword: confirmpassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    let errorMessage = "Authentication Faild !!";
    if (data && data.error && data.error.message) {
      errorMessage = data.error.message;
      alert(errorMessage);
    }
    throw new Error(errorMessage);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={isLogin ? loginHandler : signupHandler}>
        <div className={classes.control}>
          <label htmlFor="email" style={{ marginLeft: "-18rem" }}>
            Your Email
          </label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor="password" style={{ marginLeft: "-16rem" }}>
            Your Password
          </label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>

        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="confirmpassword" style={{ marginLeft: "-16rem" }}>
              confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              required
              ref={confirmPasswordInputRef}
            />
          </div>
        )}
          <Link to='/forget'>Forget Password?</Link>
        <div className={classes.actions}>
          
          {isLogin && <button>Login</button>}
          {!isLogin && <button>Signup</button>}

          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Have an account ? Login"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
