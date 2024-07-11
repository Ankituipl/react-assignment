import React, { useState } from 'react'
import Logo from '../../assets/img/logo.svg'
import LoginForm from './login-form'
import translation from '../../utils/utility/translation.json';


export default function Login() {
    const [selectedLanguage, setSelectedLanguage] = useState('en'); 

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
    }
    console.log(selectedLanguage)
    
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
                            <LoginForm onLanguageChange={handleLanguageChange} />
                        </div>
                    </div>
                </div>
            </div>

        </section>
        <footer>{translation[selectedLanguage].copyrights}</footer>
    </>
    )
}
