import React, { useEffect } from "react";
import { Route } from "react-router-dom";

import Home from "./component/pages/Home";
import Login from "./component/pages/Login";
import Updateprofile from "./component/pages/Updateprofile";
import CNavbar from "./component/NavBar";
import Forget from "./component/pages/Forget";
import AddExpense from "./component/Mainpage";
import { useDispatch } from "react-redux";
import { login } from "./authSlice";

function App() {
  const dispatch=useDispatch()

  useEffect(()=>{
    const tkn=
    localStorage.getItem("token");
    dispatch(login(tkn));
    // eslint-disable-next-line 
  },[])
  return (
    <div className="App">
      <CNavbar />

      <Route path="/main">
        <AddExpense />
      </Route>

      <Route path="/forget">
        <Forget />
      </Route>

      <Route path="/profile">
        <Updateprofile />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/home">
        <Home />
      </Route>
    </div>
  );
}

export default App;
