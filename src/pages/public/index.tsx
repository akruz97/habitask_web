import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './Login';
import { SignUpPage } from './SignUp';


export const PublicRoutes = () => {
    return (
        <Routes>
            <Route path='/' index element={<Navigate to='/login' replace />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignUpPage />} />
           
        </Routes>
    );
};