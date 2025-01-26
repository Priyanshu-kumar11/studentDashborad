import React from 'react'
import LoginForm from '../../componets/Auth/LoginForm'
import { Outlet } from 'react-router-dom';

const LoginPage = () => {
  return (
    <>
      <LoginForm/>
      <div className="content-container">
        <Outlet />
      </div>
    </>
  )
}

export default LoginPage;