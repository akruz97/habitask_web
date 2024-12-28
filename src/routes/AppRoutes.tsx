import React from 'react'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import { HomePage } from '../pages/protected/Home'
import { LoginPage } from '../pages/public/Login'
import { PrivateRoutes } from '../pages/protected'
import { PublicRoutes } from '../pages/public'

type statusAuth = 'checking' | 'authenticated' | 'no-authenticated'

export const AppRoutes = () => {

    const status: statusAuth = 'no-authenticated'
    return (
        <BrowserRouter>
            <Routes>
               {
                    status == "authenticated" ? 
                    <Route path='/*' element={<PrivateRoutes />} /> : 
                    <Route path='/*' element={<PublicRoutes />} />
               }
            </Routes>
        </BrowserRouter>
    )
}