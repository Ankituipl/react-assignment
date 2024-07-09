import React from 'react'
import Logo from '../../assets/img/logo.svg'
import LoginForm from './login-form'

export default function Login() {
    return (<>
        <section className="login-wrapper">
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 col-lg-6 m-auto'>
                        <div className="login-form">
                            <div className='text-center'>
                                <a href='https://noventiq.com' className='navbrand'>
                                    <img src={Logo} className='logo' data-testid="logo" />
                                </a>
                            </div>
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>

        </section>
        <footer>Copyright 2024 Noventiq | Powered by Noventiq</footer>
    </>
    )
}
