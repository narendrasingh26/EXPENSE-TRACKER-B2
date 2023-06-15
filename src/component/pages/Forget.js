import React, { useRef,useContext } from "react";
import classes from "./Login.module.css";
import AuthContext from "../store/auth-context";

const Forget = () => {
    const authCtx=useContext(AuthContext);

    const emailRef=useRef();

   const fPasswordHandler= async (e)=>{
    e.preventDefault();
    
     const enteredEmail=emailRef.current.value;

     let url='https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCA46gocHDViaISYg1lCBrbs8uhf59zHk4'

     sendData(url,enteredEmail).then((result)=>{
        console.log('result',result)
        authCtx.login(result.idToken);
        emailRef.current.value=""
     }).catch((error) => {
        console.log(error);
      });

    }
    const sendData = async (url, email) => {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            requestType:"PASSWORD_RESET",
            email: email,
            
            // returnSecureToken: true,
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
    <div>
      <section className={classes.auth}>
        <h2>FORGET PASSWORD</h2>
        <form onSubmit={fPasswordHandler}>
          <div className={classes.control}>
            <label htmlFor="email" style={{ marginLeft: "" }}>
              Entered the email with which you have registered
            </label>
            <input type="email" id="email" ref={emailRef}/>
          </div>
          <div className={classes.actions}>
            <button type="submit">Send Link</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Forget;
