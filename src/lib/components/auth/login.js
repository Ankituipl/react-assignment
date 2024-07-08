import React from 'react'
import LoginForm from './login-form'
import Logo from '../../assets/img/logo.svg'

export default function Login() {
  return (
    <section className="login-wrapper">
            <div className="login-form">
                <a><img src={Logo} /></a>
            </div>
    </section>
  )
}
