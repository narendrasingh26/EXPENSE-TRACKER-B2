import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../store/auth-context';

const Home = () => {
  const authCtx = useContext(AuthContext);

  const handleEmailVerification = () => {
    authCtx.sendEmailVerification();
    console.log('sendEmailVerification',authCtx.sendEmailVerification())
  };

  return (
    <div>
      <h1>Welcome to Expense Tracker</h1>
      
        <>
          <div>
            {authCtx.isLoggedIn && (<span>Your profile is incomplete</span>)}
            <Link to='/profile'>
              <span>Complete now</span>
            </Link>
          </div>
          <div>
            {!authCtx.emailVerificationSent ? (
              <button onClick={handleEmailVerification}>
                Send Email Verification
              </button>
            ) : (
              <span>Email verification link has been sent. Check your email.</span>
            )}
          </div>
        </>
      
    </div>
  )
}

export default Home
