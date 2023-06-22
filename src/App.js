import React from "react";
import { Route } from "react-router-dom";

import Home from "./component/pages/Home";
import Login from "./component/pages/Login";
import Updateprofile from "./component/pages/Updateprofile";
import CNavbar from "./component/NavBar";
import Forget from "./component/pages/Forget";
import AddExpense from "./component/Mainpage";

function App() {
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
