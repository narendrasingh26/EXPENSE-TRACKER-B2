import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Home = () => {
  return (
    <div>
        <h1>Welcom to Expense tracker</h1>
        <div>
          <span>Your profile is incomplete</span>
          <Link to='/profile'>
          <span>Complete now</span>
          </Link>
        </div>
    </div>
  )
}

export default Home