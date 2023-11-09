import React from 'react'
import logo from '../../assets/logo.png'
import { useContextAPI } from '../../context/Context'

const Login = () => {

  const { signInWithGoogle,loginUser } = useContextAPI()
  
  return (
    <div className="login">
      <img src={logo} className="login-logo" />
      <button 
        className="login-btn"
        onClick={signInWithGoogle}
      >
         Login Now!
      </button>
    </div>
  )
}

export default Login