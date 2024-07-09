import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import formValidator from '../../hooks/validators';
import validate from '../../utils/validator/validateInfo';
const detectBrowserLanguage = () => {
    const supportedLanguages = ['en', 'hi', 'ta'];
    const defaultLanguage = 'en';
    const browserLanguage = navigator.language.slice(0, 2);
    return supportedLanguages.includes(browserLanguage) ? browserLanguage : defaultLanguage;
};
const translations = {
    en: {
        email: 'Email',
        password: 'Password',
        language: 'Language',
        selectLanguage: 'Select language',
        forgot: 'Forgot password?',
        english: 'English',
        hindi: 'Hindi',
        tamil: 'Tamil',
        remember: 'Remember me',
        login: 'Login'
    },
    hi: {
        email: 'ईमेल',
        password: 'पासवर्ड',
        language: 'भाषा',
        selectLanguage: 'भाषा चुनें',
        forgot: 'पासवर्ड भूल गए?',
        english: 'अंग्रेज़ी',
        hindi: 'हिन्दी',
        tamil: 'तमिल',
        remember: 'मुझे याद करो',
        login: 'लॉगिन'
    },
    ta: {
        email: 'மின்னஞ்சல்',
        password: 'கடவுச்சொல்',
        language: 'மொழி',
        selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
        forgot: 'கடவுச்சொல்லை மறந்துவிட்டீர்களா?',
        english: 'ஆங்கிலம்',
        hindi: 'ஹிந்தி',
        tamil: 'தமிழ்',
        remember: 'என்னை நினைவில் கொள்க',
        login: 'உள்நுழைய'
    }
};
const LoginForm = () => {
    const initialValues = { email: '', password: '', language: detectBrowserLanguage(), remindme: false };
    const [uiLanguage, setUiLanguage] = useState(initialValues.language);
    const [showPassword, setShowPassword] = useState(false);

    const formHandler = () => {
        if (values.remindme) {
            localStorage.setItem('user', values.email);
            localStorage.setItem('password', values.password);
        } else {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
        }
        console.log('Form submitted successfully', values);
    }
    const { handleChange, values, errors, handleSubmit, handleCustomChange } = formValidator(validate, initialValues, formHandler);

    useEffect(() => {
        setUiLanguage(values.language);
        const storedUsername = localStorage.getItem('user');
        const storedPassword = localStorage.getItem('password');
        if (storedUsername && storedPassword) {
            handleCustomChange('email', storedUsername);
            handleCustomChange('password', storedPassword);
            handleCustomChange('remindme', true);
        }
    }, [values.language]);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form className='form-inline' onSubmit={handleSubmit}>
            <div className='login-box'>
                <div className="mb-3 row">
                    <label htmlFor="email" className="col-sm-3 col-form-label">{translations[uiLanguage].email}:</label>
                    <div className="col-sm-9">
                        <div className="input-group form-group">
                            <span className="input-group-text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                                </svg>
                            </span>
                            <input type="email" name='email' id='email' className="form-control" placeholder="email@example.com" value={values.email} onChange={handleChange} />
                        </div>
                        {errors.email && <p className='error' data-testid="error">{errors.email}</p>}
                    </div>
                </div>
                <div className="mb-1 row">
                    <label htmlFor="password" className="col-sm-3 col-form-label">{translations[uiLanguage].password}:</label>
                    <div className="col-sm-9">
                        <div className="input-group form-group">
                            <span className="input-group-text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
                                </svg>
                            </span>
                            <input type={showPassword ? "text" : "password"} name='password' className="form-control" placeholder="****" value={values.password}
                                onChange={handleChange} />
                            <button type='button' className='btn show-password' onClick={toggleShowPassword}>
                                {showPassword ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                        <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                    </svg>

                                }
                            </button>
                        </div>
                        {errors.password && <p className='error'>{errors.password}</p>}

                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-sm-9 offset-sm-3">
                        <Link to={"/forgot-password"} className="textLink forgot-pass">{translations[uiLanguage].forgot}</Link>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="language" className="col-sm-3 col-form-label">{translations[uiLanguage].language}:</label>
                    <div className="col-sm-9">
                        <select
                            className='form-select'
                            name='language'
                            value={values.language}
                            onChange={handleChange}
                            required
                        >
                            <option value='en'>English ({translations[uiLanguage].english})</option>
                            <option value='hi'>हिन्दी ({translations[uiLanguage].hindi})</option>
                            <option value='ta'>தமிழ் ({translations[uiLanguage].tamil})</option>
                        </select>
                    </div>
                </div>
                <div>
                </div>
                <div className="mb-3 row">
                    <div className="col-sm-9 offset-sm-3">
                        <div className="switchcheck">
                            <input type="checkbox" className="dn" id="remindme" name='remindme' checked={values.remindme} onChange={handleChange} />
                            <label for="remindme" className="toggle">
                                <span className="toggle__handler"></span>
                            </label>
                            <i className="check-lebel">{translations[uiLanguage].remember}</i>
                        </div>
                    </div>
                </div>
            </div>
            <div className='text-center'>
                <button type="submit" className="btn login-btn">{translations[uiLanguage].login}</button>
            </div>
        </form>
    )
}

export default LoginForm
