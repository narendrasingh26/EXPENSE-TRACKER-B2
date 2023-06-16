import React from 'react';
import { Route} from 'react-router-dom';
// import { useContext } from 'react';
// import AuthContext from './component/store/auth-context';
import Home from './component/pages/Home';
import Login from './component/pages/Login';
import Updateprofile from './component/pages/Updateprofile';
import CNavbar from './component/NavBar';
import Forget from './component/pages/Forget';
import AddExpense from './component/Mainpage';


function App() {
  // const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <CNavbar/>
      <Route path='/main'>
      <AddExpense/>
      </Route>
      
      <Route path='/forget'>
        <Forget/>
      </Route>
      
      {/* <Switch> */}
      <Route path='/profile'>
      <Updateprofile/>
      </Route>
      
       <Route path='/login'>
        <Login/>
       </Route>
       {/* {authCtx.isLoggedIn && <Home/>} */}
       <Route path='/home'>
        <Home/>
       </Route>
       
      {/* </Switch> */}
    </div>
  );
}

export default App;
