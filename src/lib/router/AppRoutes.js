import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/auth/login';


const AppRoutes = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path={'/'} element={<Login />} />
                </Routes>
            </Router>
        </div>
    )
}

export default AppRoutes;
